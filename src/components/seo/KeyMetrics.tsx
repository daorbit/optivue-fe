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
    if (!metric || !metric.displayValue) return 'N/A';
    return metric.displayValue;
  };

  if (analysis.performance.error || analysis.performance.note || !analysis.performance.metrics) {
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
            <Typography variant="h6">{formatMetric(analysis.performance.metrics.firstContentfulPaint)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">Speed Index</Typography>
            <Typography variant="h6">{formatMetric(analysis.performance.metrics.speedIndex)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">Largest Contentful Paint</Typography>
            <Typography variant="h6">{formatMetric(analysis.performance.metrics.largestContentfulPaint)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">Time to Interactive</Typography>
            <Typography variant="h6">{formatMetric(analysis.performance.metrics.interactive)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">Total Blocking Time</Typography>
            <Typography variant="h6">{formatMetric(analysis.performance.metrics.totalBlockingTime)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">Cumulative Layout Shift</Typography>
            <Typography variant="h6">{formatMetric(analysis.performance.metrics.cumulativeLayoutShift)}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default KeyMetrics;