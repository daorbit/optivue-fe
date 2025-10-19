import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Alert,
} from '@mui/material';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

interface PerformanceScoresProps {
  analysis: any;
}

const PerformanceScores = ({ analysis }: PerformanceScoresProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle size={16} />;
    if (score >= 50) return <AlertTriangle size={16} />;
    return <X size={16} />;
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Performance Scores
        </Typography>
        {analysis.performance.note ? (
          <Alert severity="info">{analysis.performance.note}</Alert>
        ) : analysis.performance.error ? (
          <Alert severity="warning">{analysis.performance.error}</Alert>
        ) : analysis.performance.overallScore !== undefined ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <Typography variant="h4" color={`${getScoreColor(analysis.performance.overallScore)}.main`}>
                  {Math.round(analysis.performance.overallScore)}
                </Typography>
                <Typography variant="body2">Overall Score</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box textAlign="center">
                <Chip
                  icon={getScoreIcon(analysis.performance.scores.performance)}
                  label={`${Math.round(analysis.performance.scores.performance)}`}
                  color={getScoreColor(analysis.performance.scores.performance)}
                  variant="outlined"
                />
                <Typography variant="body2" sx={{ mt: 1 }}>Performance</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box textAlign="center">
                <Chip
                  icon={getScoreIcon(analysis.performance.scores.accessibility)}
                  label={`${Math.round(analysis.performance.scores.accessibility)}`}
                  color={getScoreColor(analysis.performance.scores.accessibility)}
                  variant="outlined"
                />
                <Typography variant="body2" sx={{ mt: 1 }}>Accessibility</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Chip
                  icon={getScoreIcon(analysis.performance.scores.bestPractices)}
                  label={`${Math.round(analysis.performance.scores.bestPractices)}`}
                  color={getScoreColor(analysis.performance.scores.bestPractices)}
                  variant="outlined"
                />
                <Typography variant="body2" sx={{ mt: 1 }}>Best Practices</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box textAlign="center">
                <Chip
                  icon={getScoreIcon(analysis.performance.scores.seo)}
                  label={`${Math.round(analysis.performance.scores.seo)}`}
                  color={getScoreColor(analysis.performance.scores.seo)}
                  variant="outlined"
                />
                <Typography variant="body2" sx={{ mt: 1 }}>SEO</Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Typography>No performance data available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceScores;