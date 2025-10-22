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
  Divider,
} from "@mui/material";
import {
  ChevronDown,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface AiSuggestion {
  issueIndex: number;
  title: string;
  codeExample?: string;
  explanation: string;
  impact: string;
  priority: string;
  steps: string[];
}

interface AiSuggestionsProps {
  suggestions: AiSuggestion[];
  strategy?: "desktop" | "mobile" | "aggregated";
}

const getPriorityIcon = (priority?: string) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return <AlertTriangle size={20} color="#f44336" />;
    case "medium":
      return <Clock size={20} color="#ff9800" />;
    case "low":
      return <CheckCircle size={20} color="#4caf50" />;
    default:
      return <Lightbulb size={20} color="#ff9800" />;
  }
};

const getPriorityColor = (priority?: string) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "#f44336";
    case "medium":
      return "#ff9800";
    case "low":
      return "#4caf50";
    default:
      return "#ff9800";
  }
};

const getImpactColor = (impact?: string) => {
  switch (impact?.toLowerCase()) {
    case "high":
      return "#f44336";
    case "medium":
      return "#ff9800";
    case "low":
      return "#4caf50";
    default:
      return "#666";
  }
};

const AiSuggestions: React.FC<AiSuggestionsProps> = ({
  suggestions,
  strategy = "mobile",
}) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          No AI suggestions available for {strategy} analysis.
        </Typography>
      </Box>
    );
  }

  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    const priority = suggestion.priority || "other";
    if (!acc[priority]) {
      acc[priority] = [];
    }
    acc[priority].push(suggestion);
    return acc;
  }, {} as Record<string, AiSuggestion[]>);

  const totalSuggestions = suggestions.length;
  const highPriority = suggestions.filter(
    (s) => s.priority?.toLowerCase() === "high"
  ).length;
  const mediumPriority = suggestions.filter(
    (s) => s.priority?.toLowerCase() === "medium"
  ).length;
  const lowPriority = suggestions.filter(
    (s) => s.priority?.toLowerCase() === "low"
  ).length;

  return (
    <Box sx={{ mt: 3 ,borderTop: '1px solid #e0e0e0', pt: 3}}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, color: "#1a1a1a" }}
        >
         AI-Powered Optimization Suggestions
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <Chip
            label={`${totalSuggestions} AI Suggestions`}
            sx={{
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              fontWeight: 500,
            }}
          />
          {highPriority > 0 && (
            <Chip
              label={`${highPriority} High Priority`}
              sx={{
                backgroundColor: "#ffebee",
                color: "#d32f2f",
                fontWeight: 500,
              }}
            />
          )}
          {mediumPriority > 0 && (
            <Chip
              label={`${mediumPriority} Medium Priority`}
              sx={{
                backgroundColor: "#fff3e0",
                color: "#f57c00",
                fontWeight: 500,
              }}
            />
          )}
          {lowPriority > 0 && (
            <Chip
              label={`${lowPriority} Low Priority`}
              sx={{
                backgroundColor: "#e8f5e8",
                color: "#2e7d32",
                fontWeight: 500,
              }}
            />
          )}
        </Box>

        <Typography variant="body2" color="text.secondary">
          AI-generated recommendations to improve your website performance for{" "}
          {strategy} devices.
        </Typography>
      </Box>

      {/* Suggestions by Priority */}
      {Object.entries(groupedSuggestions).map(
        ([priority, prioritySuggestions]) => (
          <Card
            key={priority}
            sx={{
              mb: 2,
              borderRadius: 2,
              border: `1px solid ${getPriorityColor(priority)}20`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              overflow: "visible",
            }}
          >
            <Accordion
              defaultExpanded={priority.toLowerCase() === "high"}
              sx={{ boxShadow: "none", "&:before": { display: "none" } }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown size={20} />}
                sx={{
                  backgroundColor: `${getPriorityColor(priority)}15`,
                  borderRadius: 2,
                  minHeight: 64,
                  "&:hover": {
                    backgroundColor: `${getPriorityColor(priority)}25`,
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
                  {getPriorityIcon(priority)}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        textTransform: "capitalize",
                        wordWrap: "break-word",
                      }}
                    >
                      {priority.toLowerCase()} Priority (
                      {prioritySuggestions.length})
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ wordWrap: "break-word" }}
                    >
                      {priority.toLowerCase() === "high" &&
                        "Critical issues that significantly impact performance"}
                      {priority.toLowerCase() === "medium" &&
                        "Important optimizations with moderate impact"}
                      {priority.toLowerCase() === "low" &&
                        "Minor improvements and best practices"}
                      {!["high", "medium", "low"].includes(
                        priority.toLowerCase()
                      ) && "General recommendations"}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 2 }}>
                <List sx={{ py: 0 }}>
                  {prioritySuggestions.map((suggestion, index) => (
                    <Box key={suggestion.issueIndex || index}>
                      <ListItem
                        sx={{
                          px: 1,
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
                            mb: 3,
                            width: "100%",
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                                mb: 1,
                                lineHeight: 1.3,
                                wordWrap: "break-word",
                              }}
                            >
                              {suggestion.title}
                            </Typography>

                            {/* Priority and Impact */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 1,
                              }}
                            >
                              <Chip
                                label={suggestion.priority}
                                size="small"
                                sx={{
                                  backgroundColor: `${getPriorityColor(
                                    suggestion.priority
                                  )}15`,
                                  color: getPriorityColor(suggestion.priority),
                                  fontWeight: 600,
                                  fontSize: "0.75rem",
                                }}
                              />
                              <Chip
                                label={`Impact: ${suggestion.impact}`}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: getImpactColor(
                                    suggestion.impact
                                  ),
                                  color: getImpactColor(suggestion.impact),
                                  fontSize: "0.75rem",
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>

                        {/* Explanation */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.primary",
                            lineHeight: 1.6,
                            mb:
                              suggestion.codeExample || suggestion.steps?.length
                                ? 2
                                : 0,
                            pl: 2.5,
                            wordWrap: "break-word",
                          }}
                        >
                          {suggestion.explanation}
                        </Typography>

                        {/* Code Example */}
                        {suggestion.codeExample && (
                          <Box
                            sx={{
                              pl: 2.5,
                              mb: suggestion.steps?.length ? 2 : 0,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
                            >
                              💻 Code Example:
                            </Typography>
                            <Box
                              sx={{
                                backgroundColor: "#f5f5f5",
                                borderRadius: 1,
                                p: 2,
                                border: "1px solid #e0e0e0",
                                fontFamily: "monospace",
                                fontSize: "0.875rem",
                                overflow: "auto",
                              }}
                            >
                              <pre
                                style={{
                                  margin: 0,
                                  whiteSpace: "pre-wrap",
                                  wordWrap: "break-word",
                                }}
                              >
                                {suggestion.codeExample}
                              </pre>
                            </Box>
                          </Box>
                        )}

                        {/* Implementation Steps */}
                        {suggestion.steps && suggestion.steps.length > 0 && (
                          <Box sx={{ pl: 2.5 }}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
                            >
                              🚀 Implementation Steps:
                            </Typography>
                            <Box
                              component="ol"
                              sx={{
                                m: 0,
                                pl: 2,
                                "& li": {
                                  mb: 0.5,
                                  lineHeight: 1.4,
                                  wordWrap: "break-word",
                                },
                              }}
                            >
                              {suggestion.steps.map((step, stepIndex) => (
                                <li key={stepIndex}>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.primary" }}
                                  >
                                    {step}
                                  </Typography>
                                </li>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </ListItem>

                      {/* Divider between suggestions */}
                      {index < prioritySuggestions.length - 1 && (
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

export default AiSuggestions;
