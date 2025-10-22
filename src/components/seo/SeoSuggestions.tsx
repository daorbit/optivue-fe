import React from "react";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Divider,
} from "@mui/material";
import {
  CheckCircle,
  ChevronDown,
  Zap,
  Eye,
  Shield,
  Search,
  Lightbulb,
} from "lucide-react";

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

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case "performance":
      return <Zap size={20} color="#ff6b35" />;
    case "accessibility":
      return <Eye size={20} color="#4caf50" />;
    case "best-practices":
      return <Shield size={20} color="#2196f3" />;
    case "seo":
      return <Search size={20} color="#9c27b0" />;
    default:
      return <Lightbulb size={20} color="#ff9800" />;
  }
};

const getCategoryColor = (category?: string) => {
  switch (category) {
    case "performance":
      return "#ff6b35";
    case "accessibility":
      return "#4caf50";
    case "best-practices":
      return "#2196f3";
    case "seo":
      return "#9c27b0";
    default:
      return "#ff9800";
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "#4caf50";
  if (score >= 50) return "#ff9800";
  return "#f44336";
};

const getScoreLabel = (score: number) => {
  if (score >= 90) return "Good";
  if (score >= 50) return "Needs Work";
  return "Poor";
};

const SeoSuggestions: React.FC<SeoSuggestionsProps> = ({
  suggestions,
  strategy = "mobile",
}) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <Alert
        severity="success"
        sx={{
          mt: 3,
          borderRadius: 2,
          "& .MuiAlert-icon": { color: "#4caf50" },
        }}
        icon={<CheckCircle size={20} />}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Great job! No major issues found for {strategy} analysis.
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          Your website is performing well in this category.
        </Typography>
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

  const totalSuggestions = suggestions.length;
  const criticalIssues = suggestions.filter((s) => s.score < 50).length;
  const needsWorkIssues = suggestions.filter(
    (s) => s.score >= 50 && s.score < 90
  ).length;

  return (
    <Box sx={{ mt: 3 }}>
      {/* Header with Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, color: "#1a1a1a" }}
        >
          SEO Improvement Suggestions
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <Chip
            label={`${totalSuggestions} Issues Found`}
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#666",
              fontWeight: 500,
            }}
          />
          {criticalIssues > 0 && (
            <Chip
              label={`${criticalIssues} Critical`}
              sx={{
                backgroundColor: "#ffebee",
                color: "#d32f2f",
                fontWeight: 500,
              }}
            />
          )}
          {needsWorkIssues > 0 && (
            <Chip
              label={`${needsWorkIssues} Needs Work`}
              sx={{
                backgroundColor: "#fff3e0",
                color: "#f57c00",
                fontWeight: 500,
              }}
            />
          )}
        </Box>

        <Typography variant="body2" color="text.secondary">
          Focus on high-impact items first. These suggestions are based on
          Google PageSpeed Insights analysis for {strategy}.
        </Typography>
      </Box>

      {/* Suggestions by Category */}
      {Object.entries(groupedSuggestions).map(
        ([category, categorySuggestions]) => (
          <Card
            key={category}
            sx={{
              mb: 2,
              borderRadius: 2,
              border: `1px solid ${getCategoryColor(category)}20`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              overflow: "visible",
            }}
          >
            <Accordion
              defaultExpanded={category === "performance"}
              sx={{ boxShadow: "none", "&:before": { display: "none" } }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown size={20} />}
                sx={{
                  backgroundColor: `${getCategoryColor(category)}08`,
                  borderRadius: 2,
                  minHeight: 64,
                  "&:hover": {
                    backgroundColor: `${getCategoryColor(category)}12`,
                  },
                  "& .MuiAccordionSummary-content": { alignItems: "center" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  {getCategoryIcon(category)}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, textTransform: "capitalize" }}
                    >
                      {category.replace("-", " ")} ({categorySuggestions.length}
                      )
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category === "performance" &&
                        "Speed and loading optimizations"}
                      {category === "accessibility" &&
                        "User accessibility improvements"}
                      {category === "best-practices" &&
                        "Web development best practices"}
                      {category === "seo" && "Search engine optimization"}
                      {category === "other" && "General recommendations"}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 0 }}>
                <List sx={{ py: 0 }}>
                  {categorySuggestions.map((suggestion, index) => (
                    <Box key={suggestion.id || index}>
                      <ListItem
                        sx={{
                          px: 3,
                          py: 2,
                          flexDirection: "column",
                          alignItems: "stretch",
                        }}
                      >
                        {/* Suggestion Header */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2,
                            mb: 2,
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: getScoreColor(suggestion.score),
                              mt: 1,
                              flexShrink: 0,
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}
                            >
                              {suggestion.title}
                            </Typography>

                            {/* Score and Impact */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 1,
                              }}
                            >
                              <Chip
                                label={`${suggestion.score}/100`}
                                size="small"
                                sx={{
                                  backgroundColor: `${getScoreColor(
                                    suggestion.score
                                  )}15`,
                                  color: getScoreColor(suggestion.score),
                                  fontWeight: 600,
                                  fontSize: "0.75rem",
                                }}
                              />
                              <Chip
                                label={getScoreLabel(suggestion.score)}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: getScoreColor(suggestion.score),
                                  color: getScoreColor(suggestion.score),
                                  fontSize: "0.75rem",
                                }}
                              />
                              {suggestion.displayValue && (
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#666", fontWeight: 500 }}
                                >
                                  {suggestion.displayValue}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Box>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#555",
                            lineHeight: 1.6,
                            mb: suggestion.fixSuggestions?.length ? 2 : 0,
                            pl: 2.5,
                          }}
                        >
                          {suggestion.description ||
                            suggestion.humanReadableAdvice}
                        </Typography>

                        {/* Fix Suggestions */}
                        {suggestion.fixSuggestions &&
                          suggestion.fixSuggestions.length > 0 && (
                            <Box sx={{ pl: 2.5 }}>
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 600, mb: 1, color: "#333" }}
                              >
                                💡 Quick Fixes:
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 0.5,
                                }}
                              >
                                {suggestion.fixSuggestions.map(
                                  (fix, fixIndex) => (
                                    <Box
                                      key={fixIndex}
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 1,
                                      }}
                                    >
                                      <Typography
                                        variant="body2"
                                        sx={{ color: "#666", mt: -0.2 }}
                                      >
                                        •
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{ color: "#555", lineHeight: 1.4 }}
                                      >
                                        {fix}
                                      </Typography>
                                    </Box>
                                  )
                                )}
                              </Box>
                            </Box>
                          )}
                      </ListItem>

                      {/* Divider between suggestions */}
                      {index < categorySuggestions.length - 1 && (
                        <Divider sx={{ mx: 3, opacity: 0.3 }} />
                      )}
                    </Box>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Card>
        )
      )}
    </Box>
  );
};

export default SeoSuggestions;