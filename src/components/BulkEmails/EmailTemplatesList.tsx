import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { FileText, Sparkles } from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
}

interface EmailTemplatesListProps {
  templates: EmailTemplate[];
  selectedTemplate: EmailTemplate | null;
  onTemplateSelect: (templateId: string) => void;
}

const EmailTemplatesList: React.FC<EmailTemplatesListProps> = ({
  templates,
  selectedTemplate,
  onTemplateSelect,
}) => {
  return (
    <Paper
      sx={{
        p: 3,
        height: "fit-content",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        border: "1px solid #e1e5e9",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <FileText size={24} color="#1976d2" />
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 600, color: "#1976d2" }}>
          Email Templates
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {Array.isArray(templates) && templates.map((template) => (
          <Card
            key={template.id}
            sx={{
              cursor: "pointer",
              border: selectedTemplate?.id === template.id
                ? "2px solid #1976d2"
                : "1px solid #e0e0e0",
              backgroundColor: selectedTemplate?.id === template.id ? "#e3f2fd" : "white",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 3,
                transform: "translateY(-2px)",
                borderColor: "#1976d2"
              }
            }}
            onClick={() => onTemplateSelect(template.id)}
          >
            <CardContent sx={{ pb: 2, pt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Sparkles size={16} color="#1976d2" />
                <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 600, color: "#1976d2" }}>
                  {template.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {template.subject}
              </Typography>
              <Chip
                label="Template"
                size="small"
                sx={{
                  backgroundColor: "#e8f5e8",
                  color: "#2e7d32",
                  fontSize: "0.7rem"
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {(!templates || templates.length === 0) && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <FileText size={48} color="#bdbdbd" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            No templates available
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default EmailTemplatesList;