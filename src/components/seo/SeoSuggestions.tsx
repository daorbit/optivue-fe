import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from "@mui/material";
import { AlertTriangle, CheckCircle, XCircle, ChevronDown } from "lucide-react";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  score: number;
  displayValue?: string;
  category?: string;
  fixSuggestions?: string[];
  humanReadableAdvice?: string;
}

interface SeoSuggestionsProps {
  suggestions: Suggestion[];
  strategy?: "desktop" | "mobile" | "aggregated";
}

const getCategoryColor = (category?: string) => {
  switch (category) {
    case "performance":
      return "error";
    case "accessibility":
      return "warning";
    case "best-practices":
      return "info";
    case "seo":
      return "success";
    default:
      return "default";
  }
};

const getScoreIcon = (score: number) => {
  if (score >= 90) return <CheckCircle size={20} color="#4caf50" />;
  if (score >= 50) return <AlertTriangle size={20} color="#ff9800" />;
  return <XCircle size={20} color="#f44336" />;
};

const SeoSuggestions: React.FC<SeoSuggestionsProps> = ({
  suggestions,
  strategy = "mobile",
}) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No suggestions available for {strategy} analysis.
      </Alert>
    );
  }

  // Group suggestions by category
  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    const category = suggestion.category || "other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(suggestion);
    return acc;
  }, {} as Record<string, Suggestion[]>);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        SEO Improvement Suggestions ({strategy})
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Based on Google PageSpeed Insights analysis. Focus on high-impact items first.
      </Typography>

      {Object.entries(groupedSuggestions).map(([category, categorySuggestions]) => (
        <Accordion key={category} defaultExpanded={category === "performance"}>
          <AccordionSummary expandIcon={<ChevronDown size={20} />}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Chip
                label={`${category} (${categorySuggestions.length})`}
                color={getCategoryColor(category)}
                size="small"
              />
              <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
                {category.replace("-", " ")} Issues
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {categorySuggestions.map((suggestion, index) => (
                <ListItem key={suggestion.id || index} sx={{ px: 0, py: 1 }}>
                  <Card
                    variant="outlined"
                    sx={{
                      width: "100%",
                      borderLeft: 4,
                      borderLeftColor: suggestion.score >= 90 ? "success.main" : "warning.main",
                    }}
                  >
                    <CardContent sx={{ pb: "16px !important" }}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}>
                        {getScoreIcon(suggestion.score)}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {suggestion.title}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                            <Chip
                              label={`Score: ${suggestion.score}`}
                              size="small"
                              color={suggestion.score >= 90 ? "success" : suggestion.score >= 50 ? "warning" : "error"}
                            />
                            {suggestion.displayValue && (
                              <Typography variant="body2" color="text.secondary">
                                {suggestion.displayValue}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {suggestion.description || suggestion.humanReadableAdvice}
                      </Typography>

                      {suggestion.fixSuggestions && suggestion.fixSuggestions.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                            Quick Fixes:
                          </Typography>
                          <List dense>
                            {suggestion.fixSuggestions.map((fix, fixIndex) => (
                              <ListItem key={fixIndex} sx={{ px: 0, py: 0.5 }}>
                                <ListItemText
                                  primary={
                                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                      • {fix}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default SeoSuggestions;