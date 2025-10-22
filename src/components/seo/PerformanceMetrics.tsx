import { Grid, Card, Box, Typography } from "@mui/material";

interface MetricItem {
  name: string;
  desktopDisplay: string;
  mobileDisplay: string;
  desktop?: number | null;
  mobile?: number | null;
}

interface PerformanceMetricsProps {
  data: MetricItem[];
  selectedStrategy?: "desktop" | "mobile";
}

const metricConfig: Record<
  string,
  { good: number; mid: number; max: number; unit: "ms" | "s" | "raw" }
> = {
  FCP: { good: 1000, mid: 2500, max: 4000, unit: "ms" },
  "Speed Index": { good: 1250, mid: 3000, max: 5000, unit: "ms" },
  LCP: { good: 2500, mid: 4000, max: 6000, unit: "ms" },
  TTI: { good: 3000, mid: 5000, max: 8000, unit: "ms" },
  TBT: { good: 200, mid: 600, max: 1000, unit: "ms" },
  CLS: { good: 0.1, mid: 0.25, max: 0.5, unit: "raw" },
};

const clampPercent = (n: number | null | undefined) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return null;
  const v = Number(n);
  if (!Number.isFinite(v)) return null;
  return Math.max(0, Math.min(100, Math.round(v)));
};

const scoreFromMetric = (name: string, raw: number | null | undefined) => {
  if (raw === null || raw === undefined || Number.isNaN(Number(raw))) return null;
  const cfg = metricConfig[name];
  const v = Number(raw);

  if (!cfg) {
    if (v >= 0 && v <= 100) return clampPercent(v);
    if (v > 0 && v <= 10) return clampPercent(v * 100);
    return clampPercent(Math.max(0, Math.min(100, v)));
  }

  if (name === "CLS") {
    const val = v <= 1 ? v : v / 100;
    if (val <= cfg.good) return 100;
    if (val >= cfg.max) return 0;
    if (val <= cfg.mid) {
      const t = (val - cfg.good) / (cfg.mid - cfg.good);
      return clampPercent(100 - t * 50);
    }
    const t = (val - cfg.mid) / (cfg.max - cfg.mid);
    return clampPercent(50 - t * 50);
  }

  // Handle seconds or ms properly
  let millis = v;
  if (cfg.unit === "ms" && v > 0 && v <= 10) millis = v * 1000; // convert seconds-looking values to ms
  if (cfg.unit === "s" && v > 50) millis = v / 1000; // handle ms-looking values in seconds metric

  if (millis <= cfg.good) return 100;
  if (millis >= cfg.max) return 0;
  if (millis <= cfg.mid) {
    const t = (millis - cfg.good) / (cfg.mid - cfg.good);
    return clampPercent(100 - t * 50);
  }
  const t = (millis - cfg.mid) / (cfg.max - cfg.mid);
  return clampPercent(50 - t * 50);
};

const formatLabel = (name: string, raw: number | null | undefined, display: string) => {
  if (display && display !== "N/A" && display.trim() !== "" && display !== String(raw)) return display;
  if (raw === null || raw === undefined || Number.isNaN(Number(raw))) return "N/A";

  const cfg = metricConfig[name];
  const v = Number(raw);

  if (name === "CLS") return v.toFixed(2);
  if (!cfg) return String(v);

  // Handle formatting based on unit
  if (cfg.unit === "ms") {
    const ms = v <= 10 ? v * 1000 : v; // if looks like seconds, convert to ms
    return ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(2)} s`;
  }

  if (cfg.unit === "s") {
    const s = v > 100 ? v / 1000 : v; // if looks like ms, convert to s
    return `${s.toFixed(2)} s`;
  }

  return String(v);
};

const PerformanceMetrics = ({ data, selectedStrategy = "desktop" }: PerformanceMetricsProps) => {
  return (
    <Grid container spacing={2}>
      {data.map((d) => {
        const desktopRaw = d.desktop ?? null;
        const mobileRaw = d.mobile ?? null;

        // Choose which side to render
        const chosenRaw = selectedStrategy === "desktop" ? desktopRaw : mobileRaw;
        const chosenScore = scoreFromMetric(d.name, chosenRaw);
        const chosenLabel = formatLabel(
          d.name,
          chosenRaw,
          selectedStrategy === "desktop" ? d.desktopDisplay : d.mobileDisplay
        );

        return (
          <Grid item xs={12} sm={6} md={4} key={d.name}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {d.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
                <Typography sx={{ width: 56, textAlign: "right", fontWeight: 600, fontSize: "13px" }}>
                  {chosenLabel}
                </Typography>

                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      position: "relative",
                      height: 6,
                      borderRadius: 6,
                      backgroundColor: "#e6e6e6",
                      overflow: "hidden",
                    }}
                    aria-hidden
                  >
                    {/* chosen side bar */}
                    {chosenScore !== null && (
                      <Box
                        sx={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: `${chosenScore}%`,
                          backgroundColor:
                            chosenScore >= 90
                              ? "#16a34a"
                              : chosenScore >= 50
                              ? "#f59e0b"
                              : "#ef4444",
                        }}
                      />
                    )}
                  </Box>
                </Box>

                <Box sx={{ width: 56 }} />
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PerformanceMetrics;
