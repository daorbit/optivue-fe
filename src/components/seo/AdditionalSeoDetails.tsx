import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Box,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';

interface AdditionalSeoDetailsProps {
  analysis: any;
}

const AdditionalSeoDetails = ({ analysis }: AdditionalSeoDetailsProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ChevronDown />}>
        <Typography variant="h6">Additional SEO Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>Heading Structure</Typography>
            <List dense>
              {analysis.headingStructure?.map((heading: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`H${heading.level}: ${heading.count} ${heading.texts ? `(${heading.texts.slice(0, 3).join(', ')}${heading.texts.length > 3 ? '...' : ''})` : ''}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>Schema Types</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {analysis.schemaTypes.map((type: string, index: number) => (
                <Chip key={index} label={type} size="small" />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>Top Keywords</Typography>
            <List dense>
              {analysis.keywordDensity.slice(0, 10).map((keyword: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={`${keyword.word}: ${keyword.count} (${keyword.density})`} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>Images</Typography>
            <List dense>
              {analysis.images.slice(0, 5).map((image: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${image.src.split('/').pop()}`}
                    secondary={`Alt: ${image.alt || 'None'} | Has Alt: ${image.hasAlt ? 'Yes' : 'No'}`}
                  />
                </ListItem>
              ))}
              {analysis.images.length > 5 && (
                <ListItem>
                  <ListItemText primary={`... and ${analysis.images.length - 5} more images`} />
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdditionalSeoDetails;