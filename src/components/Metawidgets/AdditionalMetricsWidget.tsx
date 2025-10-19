import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { Target, TrendingUp, BarChart3 } from "lucide-react";

interface AdditionalMetricsWidgetProps {
  ctr: number;
  cpc: number;
  cpm: number;
  currency: string;
  formatCurrencyWithConversion: (amount: string, currency: string) => string;
}

const AdditionalMetricsWidget: React.FC<AdditionalMetricsWidgetProps> = ({
  ctr,
  cpc,
  cpm,
  currency,
  formatCurrencyWithConversion,
}) => {
  const metrics = [
    {
      icon: Target,
      label: "CTR",
      value: `${ctr.toFixed(2)}%`,
      description: "Click-through rate",
    },
    {
      icon: TrendingUp,
      label: "CPC",
      value: formatCurrencyWithConversion(cpc.toString(), currency),
      description: "Cost per click",
    },
    {
      icon: BarChart3,
      label: "CPM",
      value: formatCurrencyWithConversion(cpm.toString(), currency),
      description: "Cost per 1,000 impressions",
    },
  ];

  return (
    <Box mt={3}>
      <Typography
        variant="h6"
        fontWeight="600"
        mb={2}
        sx={{ color: "#2b3a36", fontSize: "1.1rem" }}
      >
        Advanced Metrics
      </Typography>
      <Grid container spacing={2}>
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  border: "1px solid rgba(15,123,118,0.1)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                  height: "100%",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" mb={1.5}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: "#0f7b76",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1.5,
                      }}
                    >
                      <IconComponent size={18} color="#fff" />
                    </Box>
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      sx={{ color: "#2b3a36", fontSize: "0.9rem" }}
                    >
                      {metric.label}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{
                      mb: 0.5,
                      fontSize: "1.25rem",
                      color: "#2b3a36",
                    }}
                  >
                    {metric.value}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#2b3a36",
                      opacity: 0.7,
                      fontSize: "0.8rem",
                    }}
                  >
                    {metric.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AdditionalMetricsWidget;
