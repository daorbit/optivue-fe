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
            <Typography variant="subtitle1" gutterBottom>Content Statistics</Typography>
            <List dense>
              <ListItem>
                <ListItemText primary={`H1 Tags: ${analysis.h1Count || analysis.content?.h1Count || 0}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`H2 Tags: ${analysis.h2Count || analysis.content?.h2Count || 0}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`H3 Tags: ${analysis.h3Count || analysis.content?.h3Count || 0}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Images: ${analysis.imgCount || analysis.content?.imgCount || 0}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Links: ${analysis.linkCount || analysis.content?.linkCount || 0}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Word Count: ${analysis.wordCount || analysis.content?.wordCount || 0}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Readability Score: ${analysis.readabilityScore || analysis.content?.readabilityScore || 0}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Content Quality: ${analysis.contentQuality || analysis.content?.contentQuality || 0}%`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Has Schema: ${analysis.hasSchema || analysis.content?.hasSchema ? 'Yes' : 'No'}`} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>Link Analysis</Typography>
            <List dense>
              <ListItem>
                <ListItemText primary={`Internal Links: ${analysis.internalLinks || analysis.content?.internalLinks || 0}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`External Links: ${analysis.externalLinks || analysis.content?.externalLinks || 0}`} />
              </ListItem>
            </List>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Schema Types</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(analysis.schemaTypes || analysis.content?.schemaTypes)?.map((type: string, index: number) => (
                <Chip key={index} label={type} size="small" />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>Heading Structure</Typography>
            <List dense>
              { (analysis.headingStructure || analysis.content?.headingStructure)?.map((heading: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`H${heading.level}: ${heading.count} ${heading.texts ? `(${heading.texts.slice(0, 3).join(', ')}${heading.texts.length > 3 ? '...' : ''})` : ''}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>Top Keywords</Typography>
            <List dense>
              {(analysis.keywordDensity || analysis.content?.keywordDensity)?.slice(0, 10)?.map((keyword: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={`${keyword.word}: ${keyword.count} (${keyword.density})`} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>All Images ({(analysis.images || analysis.content?.images)?.length || 0})</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {(analysis.images || analysis.content?.images)?.map((image: any, index: number) => (
                <Box key={index} sx={{ textAlign: 'center', maxWidth: 200 }}>
                  <img
                    src={image.src}
                    alt={image.alt || 'No alt text'}
                    style={{ maxWidth: '100%', maxHeight: 150, objectFit: 'contain' }}
                  />
                  <Typography variant="caption" display="block">
                    {image.src.split('/').pop()}
                  </Typography>
                  <Typography variant="caption" display="block" color="text.secondary">
                    Alt: {image.alt || 'None'} | Size: {image.width}x{image.height}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>All Meta Tags</Typography>
            <List dense>
              {analysis.meta?.allMetaTags?.map((meta: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${meta.name || meta.property || meta.httpEquiv}: ${meta.content}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>All Schemas</Typography>
            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              {(analysis.schemas || analysis.content?.schemas)?.map((schema: any, index: number) => (
                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Schema {index + 1}: {schema['@type'] || schema.type}</Typography>
                  <pre style={{ fontSize: '0.8em', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(schema, null, 2)}
                  </pre>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdditionalSeoDetails;