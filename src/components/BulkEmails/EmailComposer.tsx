import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
} from "@mui/material";
import { Send, Edit, Users, Mail } from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
}

interface EmailComposerProps {
  templates: EmailTemplate[];
  selectedTemplate: string;
  subject: string;
  htmlContent: string;
  recipients: string;
  loading: boolean;
  onTemplateSelect: (templateId: string) => void;
  onSubjectChange: (subject: string) => void;
  onHtmlContentChange: (content: string) => void;
  onRecipientsChange: (recipients: string) => void;
  onEditTemplate: () => void;
  onSendEmail: () => void;
}

const EmailComposer: React.FC<EmailComposerProps> = ({
  templates,
  selectedTemplate,
  subject,
  htmlContent,
  recipients,
  loading,
  onTemplateSelect,
  onSubjectChange,
  onHtmlContentChange,
  onRecipientsChange,
  onEditTemplate,
  onSendEmail,
}) => {
  const recipientCount = recipients.split(",").filter(email => email.trim()).length;

  return (
    <Paper
      sx={{
        p: 4,
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        border: "1px solid #e9ecef",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Mail size={24} color="#1976d2" />
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 600, color: "#1976d2" }}>
          Compose Email
        </Typography>
      </Box>

      {/* Template Selection */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Select Template</InputLabel>
          <Select
            value={selectedTemplate}
            onChange={(e) => onTemplateSelect(e.target.value)}
            label="Select Template"
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ced4da",
              },
            }}
          >
            {Array.isArray(templates) && templates.map((template) => (
              <MenuItem key={template.id} value={template.id}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      mr: 1,
                      backgroundColor: "#e3f2fd",
                      color: "#1976d2",
                      fontSize: "0.75rem",
                      fontWeight: 600
                    }}
                  >
                    {template.name.charAt(0)}
                  </Avatar>
                  {template.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={onEditTemplate}
          disabled={!selectedTemplate}
          size="small"
          sx={{
            minWidth: "120px",
            borderColor: "#ced4da",
            color: "#495057",
            "&:hover": {
              borderColor: "#1976d2",
              backgroundColor: "#e3f2fd",
            },
          }}
        >
          Edit
        </Button>
      </Box>

      {/* Subject */}
      <TextField
        fullWidth
        label="Email Subject"
        value={subject}
        onChange={(e) => onSubjectChange(e.target.value)}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
          },
        }}
        required
        variant="outlined"
      />

      {/* HTML Content Editor */}
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: "#495057" }}>
        HTML Content
      </Typography>
      <Box
        sx={{
          position: "relative",
          mb: 3,
          "& textarea": {
            width: "100%",
            minHeight: "400px",
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
          onChange={(e) => onHtmlContentChange(e.target.value)}
          placeholder="<div>Start writing your email...</div>"
          required
        />
      </Box>

      {/* Recipients */}
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Recipients (comma-separated emails)"
          value={recipients}
          onChange={(e) => onRecipientsChange(e.target.value)}
          placeholder="john@example.com, jane@example.com, team@company.com"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
            },
          }}
          required
          variant="outlined"
        />

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Users size={16} color="#6c757d" />
          <Typography variant="body2" sx={{ ml: 1, color: "#6c757d" }}>
            Recipients: {recipientCount}
          </Typography>
          {recipientCount > 0 && (
            <Chip
              label={`${recipientCount} recipient${recipientCount > 1 ? 's' : ''}`}
              size="small"
              sx={{
                ml: 2,
                backgroundColor: "#e8f5e8",
                color: "#2e7d32",
                fontWeight: 500,
              }}
            />
          )}
        </Box>
      </Box>

      {/* Send Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<Send />}
          onClick={onSendEmail}
          disabled={loading || !subject.trim() || !htmlContent.trim() || !recipients.trim()}
          size="large"
          sx={{
            minWidth: "200px",
            py: 1.5,
            px: 4,
            background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
              boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
            },
            "&:disabled": {
              background: "#bdbdbd",
              boxShadow: "none",
            },
          }}
        >
          {loading ? "Sending..." : `Send to ${recipientCount} Recipients`}
        </Button>
      </Box>
    </Paper>
  );
};

export default EmailComposer;