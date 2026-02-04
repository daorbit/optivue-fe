import { Box, Typography, Card, CardContent, Stack, Chip, Alert } from "@mui/material";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

interface SiteFilesTabProps {
  siteFiles: any;
  url: string;
}

const SiteFilesTab = ({ siteFiles, url }: SiteFilesTabProps) => {
  if (!siteFiles) {
    return (
      <Alert severity="info" sx={{ mb: 2 }}>
        Site files data will be available after analysis completes.
      </Alert>
    );
  }

  const renderFileStatus = (fileName: string, fileData: any) => (
    <Card key={fileName} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {fileName === 'robotsTxt' ? 'Robots.txt' : 'Sitemap'}
          </Typography>
          <Chip
            icon={fileData.present ? <CheckCircle size={16} /> : <X size={16} />}
            label={fileData.present ? 'Present' : 'Missing'}
            color={fileData.present ? 'success' : 'error'}
            variant="outlined"
          />
        </Box>

        {fileData.present ? (
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              URL: <a href={fileData.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
                {fileData.url}
              </a>
            </Typography>
            {fileName === 'sitemap' && fileData.urls && fileData.urls.length > 0 && (
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Sitemap URLs:
                </Typography>
                {fileData.urls.map((sitemapUrl: string, index: number) => (
                  <Typography key={index} variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                    • <a href={sitemapUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
                      {sitemapUrl}
                    </a>
                  </Typography>
                ))}
              </Box>
            )}
          </Stack>
        ) : (
          <Alert severity="warning" icon={<AlertTriangle size={16} />}>
            <Typography variant="body2">
              {fileName === 'robotsTxt'
                ? 'Robots.txt file is missing. This file helps search engines understand which pages to crawl.'
                : 'No sitemap found. A sitemap helps search engines discover and index your pages more efficiently.'
              }
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Site Files Check
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Checking essential SEO files for: {url}
      </Typography>

      {siteFiles.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {siteFiles.error}
        </Alert>
      )}

      <Stack spacing={2}>
        {renderFileStatus('robotsTxt', siteFiles.robotsTxt)}
        {renderFileStatus('sitemap', siteFiles.sitemap)}
      </Stack>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>SEO Impact:</strong> Having both robots.txt and sitemap files improves your site's crawlability and indexability by search engines.
        </Typography>
      </Alert>
    </Box>
  );
};

export default SiteFilesTab;