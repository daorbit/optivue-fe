import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Skeleton,
} from "@mui/material";
import { Users, Eye, MousePointer, DollarSign } from "lucide-react";

interface PerformanceMetricsWidgetProps {
  totals: {
    impressions: number;
    clicks: number;
    spend: number;
    reach: number;
  };
  currency: string;
  formatNumber: (num: string) => string;
  formatCurrencyWithConversion: (amount: string, currency: string) => string;
  loading?: boolean;
}

const PerformanceMetricsWidget: React.FC<PerformanceMetricsWidgetProps> = ({
  totals,
  currency,
  formatNumber,
  formatCurrencyWithConversion,
  loading = false,
}) => {
  if (loading) {
    return (
      <Box>
        <Skeleton variant="text" width={180} height={28} sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  border: "1px solid rgba(15,123,118,0.1)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                  height: "100%",
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Skeleton variant="circular" width={32} height={32} />
                  </Box>
                  <Skeleton
                    variant="text"
                    width={80}
                    height={32}
                    sx={{ mb: 0.5 }}
                  />
                  <Skeleton variant="text" width={60} height={16} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const metrics = [
    {
      icon: Users,
      label: "Reach",
      value: formatNumber(totals.reach.toString()),
      color: "#1976d2",
      bgColor: "#e3f2fd",
    },
    {
      icon: Eye,
      label: "Impressions",
      value: formatNumber(totals.impressions.toString()),
      color: "#388e3c",
      bgColor: "#e8f5e8",
    },
    {
      icon: MousePointer,
      label: "Clicks",
      value: formatNumber(totals.clicks.toString()),
      color: "#f57c00",
      bgColor: "#fff3e0",
    },
    {
      icon: DollarSign,
      label: "Spend",
      value: formatCurrencyWithConversion(totals.spend.toString(), currency),
      color: "#7b1fa2",
      bgColor: "#f3e5f5",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="600"
        mb={2}
        sx={{ color: "#2b3a36", fontSize: "1rem" }}
      >
        Performance Metrics
      </Typography>
      <Grid container spacing={2}>
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                  },
                  height: "100%",
                }}
              >
                <CardContent
                  sx={{ p: 2, display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: metric.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <IconComponent size={24} color={metric.color} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      sx={{
                        color: "#2b3a36",
                        mb: 0.5,
                      }}
                    >
                      {metric.value}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#2b3a36",
                        fontWeight: 500,
                        opacity: 0.8,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontSize: "12px",
                      }}
                    >
                      {metric.label}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PerformanceMetricsWidget;
