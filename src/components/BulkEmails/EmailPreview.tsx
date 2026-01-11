import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  TextField,
} from "@mui/material";
import { Eye, Code, Play } from "lucide-react";

interface EmailPreviewProps {
  htmlContent: string;
  onHtmlContentChange?: (html: string) => void;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  htmlContent,
  onHtmlContentChange,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editableHtml, setEditableHtml] = useState(htmlContent);

  const handleTabChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleRunCode = () => {
    if (onHtmlContentChange) {
      onHtmlContentChange(editableHtml);
    }
  };

  // Update editable HTML when htmlContent prop changes
  React.useEffect(() => {
    setEditableHtml(htmlContent);
  }, [htmlContent]);

  return (
    <Paper
      sx={{
        height: "700px", // Fixed height for the entire component
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        border: "1px solid #e9ecef",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, backgroundColor: "#f8f9fa", borderBottom: "1px solid #e9ecef" }}>
 
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            minHeight: "36px",
            "& .MuiTab-root": {
              minHeight: "36px",
              textTransform: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#6c757d",
              "&.Mui-selected": {
                color: "#1976d2",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#1976d2",
            },
          }}
        >
          <Tab
            icon={<Eye size={16} />}
            label="Preview"
            iconPosition="start"
            sx={{ minHeight: "36px" }}
          />
          <Tab
            icon={<Code size={16} />}
            label="HTML Code"
            iconPosition="start"
            sx={{ minHeight: "36px" }}
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ p: 0, flex: 1, overflow: "hidden" }}>
        {activeTab === 0 && (
          /* Visual Preview Tab */
          <Box
            sx={{
              height: "100%",
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
              mx: 3,
              mt: 3,
              mb: 3,
              borderRadius: "8px",
              overflow: "auto",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            {htmlContent ? (
              <iframe
                srcDoc={htmlContent}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  backgroundColor: "#ffffff",
                }}
                title="Email Preview"
              />
            ) : (
              <Box sx={{ textAlign: "center", py: 12, px: 4 }}>
                <Eye size={64} color="#bdbdbd" />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
                  No Preview Available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select a template from the left to see the live preview here
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          /* HTML Code Tab */
          <Box
            sx={{
              height: "500px", // Fixed height for VS Code-like editor
              backgroundColor: "#1e1e1e",
              border: "1px solid #3e3e42",
              mx: 3,
              mt: 3,
              mb: 3,
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Run Button */}
            <Box sx={{ p: 2, backgroundColor: "#252526", borderBottom: "1px solid #3e3e42" }}>
              <Button
                variant="contained"
                startIcon={<Play size={16} />}
                onClick={handleRunCode}
                sx={{
                  backgroundColor: "#0e70c0",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: "3px",
                  padding: "6px 12px",
                  minHeight: "28px",
                  "&:hover": {
                    backgroundColor: "#1177d1",
                  },
                  "&:active": {
                    backgroundColor: "#0e639c",
                  },
                }}
              >
                Run Code
              </Button>
            </Box>

            {/* Editable HTML Textarea */}
            <Box sx={{
              flex: 1,
              p: 0,
              overflow: "hidden",
              backgroundColor: "#1e1e1e",
              "& textarea": {
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#2d2d30",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#3e3e42",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#4e4e52",
                },
              }
            }}>
              <textarea
                value={editableHtml}
                onChange={(e) => setEditableHtml(e.target.value)}
                placeholder="<div>Enter your HTML code here...</div>"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#1e1e1e",
                  color: "#d4d4d4",
                  fontFamily: "'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  border: "none",
                  outline: "none",
                  padding: "16px",
                  resize: "none",
                  overflow: "auto",
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* Footer */}
      {htmlContent && (
        <Box sx={{ p: 2, backgroundColor: "#f8f9fa", borderTop: "1px solid #e9ecef", textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            💡 {activeTab === 0 ? "Preview updates in real-time as you edit your email content" : "View and copy the raw HTML code for your email"}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default EmailPreview;