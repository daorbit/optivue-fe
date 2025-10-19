import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Search, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { analyzeSeo, clearAnalysis } from '../store/slices/seoSlice';
import { RootState } from '../store';

const SeoAnalysis = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const { analysis, loading, error } = useSelector((state: RootState) => state.seo);

  const handleAnalyze = () => {
    if (url.trim()) {
      dispatch(analyzeSeo(url.trim()) as any);
    }
  };

  const handleClear = () => {
    setUrl('');
    dispatch(clearAnalysis());
  };

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

  const formatMetric = (metric: any) => {
    if (!metric || !metric.displayValue) return 'N/A';
    return metric.displayValue;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        SEO Analysis Tool
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Enter a URL to analyze its SEO performance, meta tags, and technical aspects.
      </Typography>

      {/* URL Input Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Enter URL to analyze"
                variant="outlined"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAnalyze}
                disabled={loading || !url.trim()}
                startIcon={<Search />}
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClear}
                disabled={loading}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Analyzing URL...
            </Typography>
            <LinearProgress />
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results Section */}
      {analysis && !loading && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Analysis Results for: {analysis.url}
          </Typography>

          {/* Performance Scores */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Scores
              </Typography>
              {analysis.performance.note ? (
                <Alert severity="info">{analysis.performance.note}</Alert>
              ) : analysis.performance.error ? (
                <Alert severity="warning">{analysis.performance.error}</Alert>
              ) : (
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
              )}
            </CardContent>
          </Card>

          {/* Key Metrics */}
          {!analysis.performance.error && !analysis.performance.note && (
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
          )}

          {/* Meta Tags */}
          <Accordion defaultExpanded>
            <AccordionSummary  >
              <Typography variant="h6">Meta Tags & Content</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Title</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {analysis.meta.title || 'No title tag found'}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>Description</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {analysis.meta.description || 'No meta description found'}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>Keywords</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {analysis.meta.keywords || 'No meta keywords found'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Content Statistics</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary={`H1 Tags: ${analysis.content.h1Count}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`H2 Tags: ${analysis.content.h2Count}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`H3 Tags: ${analysis.content.h3Count}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Images: ${analysis.content.imgCount}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Links: ${analysis.content.linkCount}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Word Count: ${analysis.content.wordCount}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Has Schema Markup: ${analysis.content.hasSchema ? 'Yes' : 'No'}`} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Technical SEO */}
          <Accordion>
            <AccordionSummary  >
              <Typography variant="h6">Technical SEO</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>HTTP Status & Security</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary={`Status Code: ${analysis.technical.statusCode}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`HTTPS: ${analysis.technical.hasHttps ? 'Yes' : 'No'}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Content Type: ${analysis.technical.contentType}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Server: ${analysis.technical.server || 'Not specified'}`} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Mobile & Social</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary={`Mobile Viewport: ${analysis.technical.hasMobileViewport ? 'Yes' : 'No'}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Favicon: ${analysis.technical.hasFavicon ? 'Yes' : 'No'}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Open Graph: ${analysis.technical.hasOpenGraph ? 'Yes' : 'No'}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Twitter Cards: ${analysis.technical.hasTwitterCards ? 'Yes' : 'No'}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Structured Data: ${analysis.technical.hasStructuredData ? 'Yes' : 'No'}`} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" gutterBottom>Image Optimization</Typography>
                  <Typography variant="body2">
                    Images with alt text: {analysis.technical.imageAltCount} / {analysis.technical.totalImages}
                    {analysis.technical.missingAltImages > 0 && (
                      <Chip
                        size="small"
                        color="warning"
                        label={`${analysis.technical.missingAltImages} missing alt text`}
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Box>
  );
};

export default SeoAnalysis;