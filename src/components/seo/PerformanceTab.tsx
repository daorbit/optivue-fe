// React import not required with the new JSX transform
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Button,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// removed Recharts line chart — charts are no longer rendered here
// Gauge rendering moved into PerformanceScores
import PerformanceScores from "./PerformanceScores";
import SeoSuggestions from "./SeoSuggestions";
import AiSuggestions from "./AiSuggestions";
import { getAiSuggestions } from "../../store/slices/seoSlice";
import { RootState } from "../../store";

interface PerformanceTabProps {
  analysis: any;
}

const metricKeys = [
  { key: "firstContentfulPaint", label: "FCP" },
  { key: "speedIndex", label: "Speed Index" },
  { key: "largestContentfulPaint", label: "LCP" },
  { key: "interactive", label: "TTI" },
  { key: "totalBlockingTime", label: "TBT" },
  { key: "cumulativeLayoutShift", label: "CLS" },
];

const PerformanceTab = ({ analysis }: PerformanceTabProps) => {
  const dispatch = useDispatch();
  const { aiSuggestions, aiLoading, aiError } = useSelector(
    (state: RootState) => state.seo
  );
  const perf = analysis.performance || {};
  const aiSuggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aiLoading && aiSuggestions && aiSuggestions.length > 0 && aiSuggestionsRef.current) {
      setTimeout(() => {
        aiSuggestionsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [aiLoading, aiSuggestions]);

  const desktopAvailable = !!perf.desktop;
  const mobileAvailable = !!perf.mobile;
  const defaultStrategy: "desktop" | "mobile" = desktopAvailable
    ? "desktop"
    : mobileAvailable
    ? "mobile"
    : "desktop";
  const [strategy, setStrategy] = useState<"desktop" | "mobile">(
    defaultStrategy
  );

  const desktop = perf.desktop || null;
  const mobile = perf.mobile || null;

  const parseScore = (value: any) => {
    if (value === null || value === undefined) return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  };

  const handleGetAiSuggestions = () => {
    const currentSuggestions =
      strategy === "desktop" ? desktop?.suggestions : mobile?.suggestions;

    if (currentSuggestions && currentSuggestions.length > 0) {
      dispatch(getAiSuggestions(currentSuggestions) as any);
    }
  };

  const desktopOverall = desktop
    ? parseScore(desktop.overallScore)
    : parseScore(perf.overallScore);
  const mobileOverall = mobile ? parseScore(mobile.overallScore) : null;

  // Gauge rendering moved into PerformanceScores

  // Helper to safely extract raw metric entries from multiple possible shapes
  const getRawMetric = (source: any, key: string) => {
    if (!source) return null;
    // Most modern shape: source.metrics[key]
    if (source.metrics && source.metrics[key] !== undefined)
      return source.metrics[key];
    // Older or alternate shapes: source[key] may be the metric object or numeric value
    if (source[key] !== undefined) return source[key];
    return null;
  };

  const extractScore = (raw: any) => {
    if (raw === null || raw === undefined) return null;
    if (typeof raw === "number") return parseScore(raw);
    if (typeof raw === "object") {
      if (raw.score !== undefined && raw.score !== null)
        return parseScore(raw.score);
      if (raw.value !== undefined && raw.value !== null)
        return parseScore(raw.value);
      return null;
    }
    // fallback attempt to coerce
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  };

  const data = metricKeys.map((m) => {
    // Prefer the desktop/mobile-specific value if present, otherwise fall back to performance-level metrics
    const desktopRaw = desktop
      ? getRawMetric(desktop, m.key)
      : getRawMetric(perf, m.key);
    const mobileRaw = mobile
      ? getRawMetric(mobile, m.key)
      : getRawMetric(perf, m.key);

    const desktopScore = extractScore(desktopRaw);
    const mobileScore = extractScore(mobileRaw);

    const desktopDisplay =
      desktopRaw?.displayValue ??
      (desktopScore !== null ? String(desktopScore) : "N/A");
    const mobileDisplay =
      mobileRaw?.displayValue ??
      (mobileScore !== null ? String(mobileScore) : "N/A");

    return {
      name: m.label,
      desktop: desktopScore,
      mobile: mobileScore,
      desktopDisplay,
      mobileDisplay,
    };
  });

  // metrics list preserved below; charting moved to PerformanceScores

  return (
    <Box>
      <Card sx={{ boxShadow: "none" }}>
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h6" gutterBottom>
            Performance Analysis
          </Typography>

          {perf.note ? (
            <Typography color="text.secondary">{perf.note}</Typography>
          ) : perf.error ? (
            <Typography color="warning.main">{perf.error}</Typography>
          ) : (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    mb: 1,
                  }}
                >
                  {desktopAvailable && (
                    <Chip
                      label={desktopOverall !== null ? `Desktop` : "Desktop"}
                      color={strategy === "desktop" ? "primary" : "default"}
                      onClick={() => setStrategy("desktop")}
                      clickable
                    />
                  )}

                  {mobileAvailable && (
                    <Chip
                      label={mobileOverall !== null ? `Mobile` : "Mobile"}
                      color={strategy === "mobile" ? "primary" : "default"}
                      onClick={() => setStrategy("mobile")}
                      clickable
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Category gauges (Performance / Accessibility / Best Practices / SEO) */}
      <Box sx={{ mb: 3 }}>
        <PerformanceScores analysis={analysis} selectedStrategy={strategy} />
      </Box>

      {/* Simple metric list */}
      <Grid container spacing={2}>
        {data.map((d) => (
          <Grid item xs={12} sm={6} md={4} key={d.name}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {d.name}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Desktop
                </Typography>
                <Typography variant="body2">{d.desktopDisplay}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Mobile
                </Typography>
                <Typography variant="body2">{d.mobileDisplay}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetAiSuggestions}
          disabled={aiLoading}
          sx={{ minWidth: 200, borderRadius: "6px", float: "right" }}
        >
          {aiLoading ? "Get AI Suggestions..." : "Get AI Suggestions"}
        </Button>
      </Box>

      {aiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {aiError}
        </Alert>
      )}

      {(strategy === "desktop"
        ? desktop?.suggestions
        : mobile?.suggestions) && (
        <SeoSuggestions
          suggestions={
            strategy === "desktop" ? desktop.suggestions : mobile.suggestions
          }
          strategy={strategy}
        />
      )}

      {/* AI Suggestions Display */}
      {aiSuggestions && aiSuggestions.length > 0 && (
        <Box ref={aiSuggestionsRef} sx={{ mt: 3 }}>
          <AiSuggestions suggestions={aiSuggestions} strategy={strategy} />
        </Box>
      )}
    </Box>
  );
};

export default PerformanceTab;
