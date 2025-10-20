import { Card, CardContent, Typography, Grid, Box, Alert } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

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

  return (
    <Card sx={{ mb: 3 ,boxShadow: 'none' }}>
      <CardContent>
       
        {analysis?.performance?.note ? (
          <Alert severity="info">{analysis.performance.note}</Alert>
        ) : analysis?.performance?.error ? (
          <Alert severity="warning">{analysis.performance.error}</Alert>
        ) : (
          (() => {
            // Prefer strategy-specific scores when a strategy is provided, otherwise fall back to top-level shapes
            const strategyScores = selectedStrategy
              ? analysis?.performance?.[selectedStrategy]?.scores
              : undefined;
            const scores =
              strategyScores ||
              analysis?.performance?.scores ||
              analysis?.scores ||
              {};

            const getCategoryValue = (key: string) => {
              if (selectedStrategy) {
                const strat = analysis?.performance?.[selectedStrategy];
                const val =
                  strat?.scores?.[key] ?? strat?.[key] ?? scores?.[key];
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

            // Compute overall value (strategy-first)
            const overallVal = selectedStrategy
              ? analysis?.performance?.[selectedStrategy]?.overallScore ??
                strategyScores?.performance ??
                analysis?.performance?.overallScore ??
                analysis?.scores?.performance ??
                null
              : analysis?.performance?.overallScore ??
                scores.performance ??
                null;
            const overallNum = toNumber(overallVal);

            const values = categories.map((c) => ({
              ...c,
              value: getCategoryValue(c.key),
            }));
            const hasAny =
              overallNum !== null || values.some((v) => v.value !== null);
            if (!hasAny)
              return <Typography>No performance data available</Typography>;

            return (
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={6} md={4}>
                  <Box textAlign="center">
                    <Typography variant="subtitle2" color="text.secondary">
                      Overall
                    </Typography>
                    <Box
                      sx={{
                        width: 180,
                        height: 140,
                        mx: "auto",
                        mt: 1,
                        position: "relative",
                      }}
                    >
                      <Gauge
                        value={overallNum ?? 0}
                        valueMin={0}
                        valueMax={100}
                        startAngle={-110}
                        endAngle={110}
                        width={180}
                        height={140}
                        sx={(theme: any) => ({
                          [`& .${gaugeClasses.valueArc}`]: {
                            fill: getGaugeColor(overallNum),
                          },
                          [`& .${gaugeClasses.referenceArc}`]: {
                            fill: theme.palette.action.disabledBackground,
                          },
                          [`& .${gaugeClasses.valueText}`]: {
                            color: getGaugeColor(overallNum),
                          },
                        })}
                      />
                    </Box>
                  </Box>
                </Grid>

                {values.map((v) => (
                  <Grid item xs={6} sm={6} md={2} key={v.key}>
                    <Box textAlign="center">
                      <Typography variant="subtitle2" color="text.secondary">
                        {v.label}
                      </Typography>
                      <Box
                        sx={{
                          width: 120,
                          height: 100,
                          mx: "auto",
                          mt: 1,
                          position: "relative",
                        }}
                      >
                        <Gauge
                          value={v.value ?? 0}
                          valueMin={0}
                          valueMax={100}
                          startAngle={-110}
                          endAngle={110}
                          width={120}
                          height={100}
                          sx={(theme: any) => ({
                            [`& .${gaugeClasses.valueArc}`]: {
                              fill: getGaugeColor(v.value),
                            },
                            [`& .${gaugeClasses.referenceArc}`]: {
                              fill: theme.palette.action.disabledBackground,
                            },
                            [`& .${gaugeClasses.valueText}`]: {
                              color: getGaugeColor(v.value),
                            },
                          })}
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            );
          })()
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceScores;
