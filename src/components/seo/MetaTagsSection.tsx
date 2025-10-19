import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';

interface MetaTagsSectionProps {
  analysis: any;
}

const MetaTagsSection = ({ analysis }: MetaTagsSectionProps) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ChevronDown />}>
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
              <ListItem>
                <ListItemText primary={`Content Quality: ${analysis.contentQuality}/100`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`External Links: ${analysis.externalLinks}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Internal Links: ${analysis.internalLinks}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Readability Score: ${analysis.readabilityScore}`} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default MetaTagsSection;