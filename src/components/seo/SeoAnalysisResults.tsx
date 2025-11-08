import { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Stack, Button, Tabs, Tab, Switch, FormControlLabel } from "@mui/material";
// import KeyMetrics from "./KeyMetrics";
import MetaTagsSection from "./MetaTagsSection";
import TechnicalSeoSection from "./TechnicalSeoSection";
import AdditionalSeoDetails from "./AdditionalSeoDetails";
import MetaTagsTab from "./MetaTagsTab";
import SchemasTab from "./SchemasTab";
import WebsitePreview from "./WebsitePreview";
import PerformanceTab from "./PerformanceTab";
import SeoAnalysisDockview from "./SeoAnalysisDockview";

interface SeoAnalysisResultsProps {
  analysis: any;
  onClear: () => void;
}

const SeoAnalysisResults = ({ analysis, onClear }: SeoAnalysisResultsProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [useDockView, setUseDockView] = useState(true);

  return (
    <Box>
      {/* Results Header */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Analysis Results
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={useDockView}
                onChange={(e) => setUseDockView(e.target.checked)}
                color="primary"
              />
            }
            label="Dockview Layout"
            sx={{ ml: 2 }}
          />
        </Box>
        
      </Box>

       <Grid container spacing={2} sx={{ mb: 3 }}>
         <Grid item xs={6} md={3}>
          <Card
            role="region"
            aria-label="H1 Tags summary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 3,
              boxShadow: 'none',
              px: 1,
              '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
            }}
          >
            <Box sx={{ width: 8, height: 56, backgroundColor: '#374151', borderRadius: 2, mr: 2 }} />
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {analysis.content?.h1Count || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                H1 Tags
              </Typography>
            </CardContent>
          </Card>
        </Grid>

         <Grid item xs={6} md={3}>
          <Card
            role="region"
            aria-label="Words summary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 3,
              boxShadow: 'none',
              px: 1,
              '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
            }}
          >
            <Box sx={{ width: 8, height: 56, backgroundColor: '#ef4444', borderRadius: 2, mr: 2 }} />
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {analysis.content?.wordCount || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Words
              </Typography>
            </CardContent>
          </Card>
        </Grid>

         <Grid item xs={6} md={3}>
          <Card
            role="region"
            aria-label="Images summary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 3,
              boxShadow: 'none',
              px: 1,
              '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
            }}
          >
            <Box sx={{ width: 8, height: 56, backgroundColor: '#3b82f6', borderRadius: 2, mr: 2 }} />
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {analysis.content?.images?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Images
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Internal links count (green) */}
        <Grid item xs={6} md={3}>
          <Card
            role="region"
            aria-label="Internal Links summary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 3,
              boxShadow: 'none',
              px: 1,
              '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
            }}
          >
            <Box sx={{ width: 8, height: 56, backgroundColor: '#10b981', borderRadius: 2, mr: 2 }} />
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {analysis.content?.internalLinks || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Internal Links
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Conditional Layout: Dockview or Traditional Tabs */}
      {useDockView ? (
        <SeoAnalysisDockview analysis={analysis} />
      ) : (
        <>
          {/* Main Content Layout */}
          <Grid container spacing={4}>
            {/* Left Side - SEO Data Tabs */}
            <Grid item xs={12} lg={9}>
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
                fontSize: '0.95rem',
                minHeight: 48,
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: '#66bb6a',
                  fontWeight: 600,
                },
              },
              '& .MuiTabs-indicator': {
                height: 3,
                backgroundColor: '#66bb6a',
              }
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Performance" />
            <Tab label="Meta Tags & Content" />
            <Tab label="Technical SEO" />
            <Tab label="Additional SEO" />
            <Tab label="Meta Tags" />
            <Tab label="Schemas" />
          </Tabs>

          <Box>
            <Card sx={{ 
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              border: '1px solid #e0e0e0',
              '&:hover': {
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              }
            }}>
              <CardContent sx={{ 
                p: 2,
                overflow: 'auto',
                 '&::-webkit-scrollbar': {
                  width: '0px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'transparent',
                  borderRadius: '3px',
                },
                '&:hover::-webkit-scrollbar': {
                  width: '6px',
                },
                '&:hover::-webkit-scrollbar-thumb': {
                  background: '#c1c1c1',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#a8a8a8',
                }
              }}>
                {tabValue === 0 && <PerformanceTab analysis={analysis} />}
                {tabValue === 1 && (
                  <Stack spacing={3}>
                    {/* <KeyMetrics analysis={analysis} /> */}
                    <MetaTagsSection analysis={analysis} />
                  </Stack>
                )}
                {tabValue === 2 && <TechnicalSeoSection analysis={analysis} />}
                {tabValue === 3 && <AdditionalSeoDetails analysis={analysis} />}
                {tabValue === 4 && <MetaTagsTab analysis={analysis} />}
                {tabValue === 5 && <SchemasTab analysis={analysis} />}
              </CardContent>
            </Card>
          </Box>
        </Grid>

            {/* Right Side - Website Preview */}
            <Grid item xs={12} lg={3}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                <WebsitePreview url={analysis.url} />
              </Box>
            </Grid>
          </Grid>
        </>
      )}

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