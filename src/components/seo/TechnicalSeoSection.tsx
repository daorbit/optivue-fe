import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';

interface TechnicalSeoSectionProps {
  analysis: any;
}

const TechnicalSeoSection = ({ analysis }: TechnicalSeoSectionProps) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>Technical SEO</Typography>
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
    </div>
  );
};

export default TechnicalSeoSection;