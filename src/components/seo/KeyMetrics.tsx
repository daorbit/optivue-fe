import {
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';

interface KeyMetricsProps {
  analysis: any;
}

const KeyMetrics = ({ analysis }: KeyMetricsProps) => {
  const formatMetric = (metric: any) => {
    if (!metric) return 'N/A';
    if (typeof metric === 'string' || typeof metric === 'number') return String(metric);
    if (metric.displayValue) return metric.displayValue;
    return 'N/A';
  };

  // Backend may return metrics at performance.metrics OR under performance.desktop.metrics / performance.mobile.metrics
  const metrics =
    analysis.performance?.metrics ||
    analysis.performance?.desktop?.metrics ||
    analysis.performance?.mobile?.metrics ||
    null;

  if (analysis.performance?.error || analysis.performance?.note || !metrics) {
    return null;
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Key Performance Metrics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">First Contentful Paint</Typography>
            <Typography variant="h6">{formatMetric(metrics.firstContentfulPaint)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">Speed Index</Typography>
            <Typography variant="h6">{formatMetric(metrics.speedIndex)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">Largest Contentful Paint</Typography>
            <Typography variant="h6">{formatMetric(metrics.largestContentfulPaint)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">Time to Interactive</Typography>
            <Typography variant="h6">{formatMetric(metrics.interactive)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">Total Blocking Time</Typography>
            <Typography variant="h6">{formatMetric(metrics.totalBlockingTime)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">Cumulative Layout Shift</Typography>
            <Typography variant="h6">{formatMetric(metrics.cumulativeLayoutShift)}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default KeyMetrics;