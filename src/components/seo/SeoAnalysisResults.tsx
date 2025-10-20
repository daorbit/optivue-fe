import { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Stack, Button, Tabs, Tab } from "@mui/material";
import KeyMetrics from "./KeyMetrics";
import MetaTagsSection from "./MetaTagsSection";
import TechnicalSeoSection from "./TechnicalSeoSection";
import AdditionalSeoDetails from "./AdditionalSeoDetails";
import MetaTagsTab from "./MetaTagsTab";
import SchemasTab from "./SchemasTab";
import WebsitePreview from "./WebsitePreview";

interface SeoAnalysisResultsProps {
  analysis: any;
  onClear: () => void;
}

const SeoAnalysisResults = ({ analysis, onClear }: SeoAnalysisResultsProps) => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      {/* Results Header */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Analysis Results
          </Typography>
        </Box>
        
      </Box>

      {/* Quick Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}>
          <Card sx={{
            textAlign: 'center',
            backgroundColor: 'white',
            border: '2px solid #667eea',
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }
          }}>
            <CardContent sx={{ py: 2, px: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                {analysis.content?.h1Count || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                H1 Tags
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{
            textAlign: 'center',
            backgroundColor: 'white',
            border: '2px solid #f093fb',
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }
          }}>
            <CardContent sx={{ py: 2, px: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                {analysis.content?.wordCount || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Words
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{
            textAlign: 'center',
            backgroundColor: 'white',
            border: '2px solid #4facfe',
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }
          }}>
            <CardContent sx={{ py: 2, px: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                {analysis.content?.images?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Images
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{
            textAlign: 'center',
            backgroundColor: 'white',
            border: '2px solid #43e97b',
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }
          }}>
            <CardContent sx={{ py: 2, px: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                {analysis.content?.internalLinks || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Internal Links
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Layout */}
      <Grid container spacing={4}>
        {/* Left Side - SEO Data Tabs */}
        <Grid item xs={12} lg={6}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            sx={{
              mb: 3,
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                minHeight: 48,
              },
              '& .MuiTabs-indicator': {
                height: 3,
              }
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Meta Tags & Content" />
            <Tab label="Technical SEO" />
            <Tab label="Additional SEO" />
            <Tab label="Meta Tags" />
            <Tab label="Schemas" />
          </Tabs>

          <Box>
            {tabValue === 0 && (
              <Stack spacing={3}>
                <KeyMetrics analysis={analysis} />
                <MetaTagsSection analysis={analysis} />
              </Stack>
            )}
            {tabValue === 1 && <TechnicalSeoSection analysis={analysis} />}
            {tabValue === 2 && <AdditionalSeoDetails analysis={analysis} />}
            {tabValue === 3 && <MetaTagsTab analysis={analysis} />}
            {tabValue === 4 && <SchemasTab analysis={analysis} />}
          </Box>
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
            onClick={onClear}
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
  );
};

export default SeoAnalysisResults;