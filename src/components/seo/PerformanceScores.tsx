import { useEffect } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { showInfoToast, showWarningToast } from "../../utils/toast";

interface PerformanceScoresProps {
  analysis: any;
  selectedStrategy?: "desktop" | "mobile";
}

const PerformanceScores = ({
  analysis,
  selectedStrategy,
}: PerformanceScoresProps) => {
  const getGaugeColor = (
    score: number | null | undefined,
    fallback = "#9e9e9e"
  ) => {
    if (score === null || score === undefined || Number.isNaN(score))
      return fallback;
    if (score >= 90) return "#66bb6a";
    if (score >= 50) return "#f6c24c";
    return "#ff4d4f";
  };

  const toNumber = (v: any): number | null => {
    if (v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  // Show toasts for analysis notes and errors
  useEffect(() => {
    if (analysis?.performance?.note) {
      showInfoToast(`Performance Note: ${analysis.performance.note}`);
    }
    if (analysis?.performance?.error) {
      showWarningToast(`Performance Warning: ${analysis.performance.error}`);
    }
  }, [analysis?.performance?.note, analysis?.performance?.error]);

  // Prefer strategy-specific scores when a strategy is provided, otherwise fall back to top-level shapes
  const strategyScores = selectedStrategy
    ? analysis?.performance?.[selectedStrategy]?.scores
    : undefined;
  const scores =
    strategyScores || analysis?.performance?.scores || analysis?.scores || {};

  const getCategoryValue = (key: string) => {
    if (selectedStrategy) {
      const strat = analysis?.performance?.[selectedStrategy];
      const val = strat?.scores?.[key] ?? strat?.[key] ?? scores?.[key];
      return toNumber(val ?? null);
    }
    return toNumber(scores?.[key] ?? null);
  };

  const categories = [
    { key: "performance", label: "Performance" },
    { key: "accessibility", label: "Accessibility" },
    { key: "bestPractices", label: "Best Practices" },
    { key: "seo", label: "SEO" },
  ];

  const values = categories.map((c) => ({
    value: getCategoryValue(c.key),
  }));

  const overallNum = toNumber(
    selectedStrategy
      ? analysis?.performance?.[selectedStrategy]?.score
      : analysis?.performance?.score ?? analysis?.score
  );

  const hasData = overallNum !== null || values.some((v) => v.value !== null);

  if (!hasData) {
    return (
      <Card sx={{ mb: 3, boxShadow: "none" }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            No performance scores available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 3, boxShadow: "none" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Performance Scores
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Gauge
                width={200}
                height={200}
                value={overallNum ?? 0}
                startAngle={-110}
                endAngle={110}
                sx={{
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                    transform: "translate(0px, 0px)",
                  },
                }}
                text={({
                  value,
                  valueMax,
                }: {
                  value: number;
                  valueMax: number;
                }) => `${value} / ${valueMax}`}
              />
            </Box>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              Overall Score
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {categories.map((category, index) => {
                const value = values[index]?.value;
                return (
                  <Box
                    key={category.key}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: getGaugeColor(value),
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {category.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {value !== null ? `${value}` : "N/A"}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PerformanceScores;
