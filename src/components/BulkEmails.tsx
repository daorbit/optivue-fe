import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Mail, Sparkles, Send } from "lucide-react";
import { apiService as api } from "../services/api";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import EmailTemplatesList from "./BulkEmails/EmailTemplatesList";
import EmailPreview from "./BulkEmails/EmailPreview";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
}

const BulkEmails: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [subject, setSubject] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [recipients, setRecipients] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sendModalOpen, setSendModalOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await api.getEmailTemplates();
      if (response.templates) {
        setTemplates(response.templates);
      } else {
        showErrorToast("Failed to load email templates");
      }
    } catch (err) {
      console.error("Error fetching templates:", err);
      showErrorToast("Failed to load email templates");
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setSubject(template.subject);
      setHtmlContent(template.html);
    }
  };

  const handleSendEmail = () => {
    if (!selectedTemplate) {
      showErrorToast("Please select a template first");
      return;
    }
    setSendModalOpen(true);
  };

  const handleConfirmSend = async () => {
    if (!selectedTemplate) {
      showErrorToast("Please select a template first");
      return;
    }

    if (!subject.trim() || !recipients.trim()) {
      showErrorToast("Please fill in all fields");
      return;
    }

    const emailList = recipients
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);
    if (emailList.length === 0) {
      showErrorToast("Please enter at least one recipient email");
      return;
    }

    setLoading(true);

    try {
      const recipientObjects = emailList.map((email) => ({
        email: email,
        name: email.split("@")[0], // Extract name from email
      }));

      await api.sendBulkEmail({
        templateId: selectedTemplate.id,
        subject: subject.trim(),
        recipients: recipientObjects,
        customContent: {}, // Can be extended later for custom placeholders
      });

      showSuccessToast(
        `Bulk email sent successfully to ${emailList.length} recipients!`
      );
      setRecipients("");
      setSubject("");
      setSendModalOpen(false);
    } catch (err: any) {
      showErrorToast(
        err.response?.data?.message || "Failed to send bulk email"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = () => {
    setEditDialogOpen(false);
    showSuccessToast("Template updated successfully!");
    // In a real app, you might want to save custom templates to backend
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}></Box>

      <Grid container spacing={4}>
        {/* Templates List - Left Side */}
        <Grid item xs={12} md={4}>
          <EmailTemplatesList
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
          />
        </Grid>

        {/* Email Preview - Right Side */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Email Preview
            </Typography>
            <Button
              variant="contained"
              startIcon={<Send size={16} />}
              onClick={handleSendEmail}
              disabled={!selectedTemplate}
              sx={{
                background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
                },
                "&:disabled": {
                  background: "#e0e0e0",
                },
              }}
            >
              Send Email
            </Button>
          </Box>
          <EmailPreview
            htmlContent={htmlContent}
            onHtmlContentChange={setHtmlContent}
          />
        </Grid>
      </Grid>

      {/* Edit Template Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e9ecef" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Mail size={20} color="#1976d2" />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
              Edit Template
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ p: 3 }}>
            <TextField
              fullWidth
              label="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{ mb: 3 }}
              variant="outlined"
            />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  HTML Content
                </Typography>
                <Box
                  sx={{
                    "& textarea": {
                      width: "100%",
                      minHeight: "350px",
                      padding: "16px",
                      border: "1px solid #ced4da",
                      borderRadius: "8px",
                      fontFamily: "Monaco, 'Courier New', monospace",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      backgroundColor: "#f8f9fa",
                      resize: "vertical",
                      outline: "none",
                      "&:focus": {
                        borderColor: "#1976d2",
                        boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                      },
                    },
                  }}
                >
                  <textarea
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    placeholder="<div>Start writing your email...</div>"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <EmailPreview
                  htmlContent={htmlContent}
                  onHtmlContentChange={setHtmlContent}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            backgroundColor: "#f8f9fa",
            borderTop: "1px solid #e9ecef",
          }}
        >
          <Button
            onClick={() => setEditDialogOpen(false)}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveTemplate}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Send Email Modal */}
      <Dialog
        open={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Send size={20} />
            Send Bulk Email
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Recipient Emails"
              placeholder="Enter email addresses separated by commas"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              fullWidth
              multiline
              rows={3}
              helperText="Separate multiple emails with commas"
            />
            <TextField
              label="Email Subject"
              placeholder="Enter email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
            />
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Selected Template: {selectedTemplate?.name || "None"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recipients will receive the email with the selected template
                content.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            backgroundColor: "#f8f9fa",
            borderTop: "1px solid #e9ecef",
          }}
        >
          <Button
            onClick={() => setSendModalOpen(false)}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSend}
            variant="contained"
            disabled={loading}
            sx={{
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
              },
            }}
          >
            {loading ? "Sending..." : "Send Email"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BulkEmails;
