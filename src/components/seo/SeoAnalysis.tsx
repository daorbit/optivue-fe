import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { analyzeSeo, clearAnalysis } from "../../store/slices/seoSlice";
import { RootState } from "../../store";
import UrlInputSection from "./UrlInputSection.tsx";
import KeyMetrics from "./KeyMetrics.tsx";
import MetaTagsSection from "./MetaTagsSection.tsx";
import TechnicalSeoSection from "./TechnicalSeoSection.tsx";
import AdditionalSeoDetails from "./AdditionalSeoDetails.tsx";
import WebsitePreview from "./WebsitePreview.tsx";
import { TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const SeoAnalysis = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { analysis, loading, error } = useSelector(
    (state: RootState) => state.seo
  );

  const handleAnalyze = () => {
    if (url.trim()) {
      dispatch(analyzeSeo(url.trim()) as any);
    }
  };

  const handleClear = () => {
    setUrl("");
    dispatch(clearAnalysis());
  };

  // Calculate overall SEO score (simplified)
  const getOverallScore = () => {
    if (!analysis) return 0;
    let score = 0;
    if (analysis.meta?.title) score += 20;
    if (analysis.meta?.description) score += 15;
    if (analysis.content?.h1Count > 0) score += 15;
    if (analysis.content?.keywordDensity?.length > 0) score += 10;
    if (analysis.technical?.hasHttps) score += 15;
    if (analysis.technical?.hasMobileViewport) score += 10;
    if (analysis.content?.images?.every(img => img.hasAlt)) score += 15;
    return Math.min(score, 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "error";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle size={20} />;
    if (score >= 60) return <AlertTriangle size={20} />;
    return <XCircle size={20} />;
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 6,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              SEO Analysis Tool
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                maxWidth: 600,
                mx: 'auto',
                fontWeight: 400
              }}
            >
              Comprehensive SEO analysis to optimize your website's search engine performance
            </Typography>
          </Box>

          <UrlInputSection
            url={url}
            setUrl={setUrl}
            onAnalyze={handleAnalyze}
            onClear={handleClear}
            loading={loading}
            error={error}
          />
        </Container>
      </Box>

      <Box  >
        {loading && (
          <Card sx={{ mb: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ py: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp size={24} style={{ marginRight: 12, color: '#667eea' }} />
                <Typography variant="h6">Analyzing your website...</Typography>
              </Box>
              <LinearProgress sx={{ height: 8, borderRadius: 4 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                This may take a few moments. We're checking meta tags, content quality, technical SEO, and more.
              </Typography>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Analysis Failed
            </Typography>
            {error}
          </Alert>
        )}

        {analysis && !loading && (
          <Box>
            {/* Results Header */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  Analysis Results
                </Typography>
                <Chip
                  icon={getScoreIcon(getOverallScore())}
                  label={`Overall Score: ${getOverallScore()}/100`}
                  color={getScoreColor(getOverallScore())}
                  sx={{
                    fontSize: '1rem',
                    py: 1,
                    px: 2,
                    fontWeight: 600
                  }}
                />
              </Box>
              <Typography variant="body1" color="text.secondary">
                Analysis completed for: <strong>{analysis.url}</strong>
              </Typography>
            </Box>

            {/* Quick Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={3}>
                <Card sx={{
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                  <CardContent sx={{ py: 3 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {analysis.content?.h1Count || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      H1 Tags
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                  <CardContent sx={{ py: 3 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {analysis.content?.wordCount || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Words
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                  <CardContent sx={{ py: 3 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {analysis.content?.images?.length || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Images
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                  <CardContent sx={{ py: 3 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {analysis.content?.internalLinks || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Internal Links
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Main Content Layout */}
            <Grid container spacing={4}>
              {/* Left Side - Analysis Sections */}
              <Grid item xs={12} lg={6}>
                <Stack spacing={3}>
                  <KeyMetrics analysis={analysis} />
                  <MetaTagsSection analysis={analysis} />
                  <TechnicalSeoSection analysis={analysis} />
                  <AdditionalSeoDetails analysis={analysis} />
                </Stack>
              </Grid>

              {/* Right Side - Website Preview */}
              <Grid item xs={12} lg={6}>
                <Box sx={{ position: 'sticky', top: 24 }}>
                  <WebsitePreview url={analysis.url} />
                </Box>
              </Grid>
            </Grid>

            {/* Action Footer */}
            <Box sx={{
              mt: 6,
              p: 4,
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Ready to improve your SEO?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Use these insights to optimize your website and improve your search rankings.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => window.location.reload()}
                  sx={{
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                >
                  Analyze Another URL
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleClear}
                  sx={{
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                >
                  Clear Results
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SeoAnalysis;
