import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
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
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{analysis.h1Count || analysis.content?.h1Count || 0}</Typography>
                  <Typography variant="caption">H1 Tags</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{analysis.h2Count || analysis.content?.h2Count || 0}</Typography>
                  <Typography variant="caption">H2 Tags</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{analysis.h3Count || analysis.content?.h3Count || 0}</Typography>
                  <Typography variant="caption">H3 Tags</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{analysis.imgCount || analysis.content?.imgCount || 0}</Typography>
                  <Typography variant="caption">Images</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{analysis.linkCount || analysis.content?.linkCount || 0}</Typography>
                  <Typography variant="caption">Links</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{analysis.wordCount || analysis.content?.wordCount || 0}</Typography>
                  <Typography variant="caption">Words</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{Math.round(analysis.readabilityScore || analysis.content?.readabilityScore || 0)}</Typography>
                  <Typography variant="caption">Readability</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{analysis.contentQuality || analysis.content?.contentQuality || 0}%</Typography>
                  <Typography variant="caption">Quality</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>Link Analysis</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{analysis.internalLinks || analysis.content?.internalLinks || 0}</Typography>
                  <Typography variant="caption">Internal Links</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{analysis.externalLinks || analysis.content?.externalLinks || 0}</Typography>
                  <Typography variant="caption">External Links</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="h6" color={analysis.hasSchema || analysis.content?.hasSchema ? 'success.main' : 'error.main'}>
                    {analysis.hasSchema || analysis.content?.hasSchema ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="caption">Has Schema</Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Schema Types</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(analysis.schemaTypes || analysis.content?.schemaTypes)?.map((type: string, index: number) => (
                <Chip key={index} label={type} size="small" color="primary" variant="outlined" />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>Heading Structure</Typography>
            <Grid container spacing={1}>
              {(analysis.headingStructure || analysis.content?.headingStructure)?.map((heading: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: 'grey.50' }}>
                    <Typography variant="h6" sx={{ color: `h${heading.level}`.replace('h', 'primary') }}>
                      H{heading.level}
                    </Typography>
                    <Typography variant="body2">
                      Count: {heading.count}
                    </Typography>
                    {heading.texts && heading.texts.length > 0 && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                        Sample texts: {heading.texts.slice(0, 2).join(', ')}{heading.texts.length > 2 ? '...' : ''}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>Top Keywords</Typography>
            <Grid container spacing={1}>
              {(analysis.keywordDensity || analysis.content?.keywordDensity)?.slice(0, 20)?.map((keyword: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: 'grey.50' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {index + 1}. {keyword.word}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Count: {keyword.count} | Density: {keyword.density}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>All Images ({(analysis.images || analysis.content?.images)?.length || 0})</Typography>
            <Grid container spacing={2}>
              {(analysis.images || analysis.content?.images)?.map((image: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Box sx={{ textAlign: 'center', p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <img
                      src={image.src}
                      alt={image.alt || 'No alt text'}
                      style={{ maxWidth: '100%', maxHeight: 120, objectFit: 'contain', borderRadius: 4 }}
                    />
                    <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: 'bold' }}>
                      {image.src.split('/').pop()}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Alt: {image.alt || 'None'}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Size: {image.width || '?'}x{image.height || '?'}
                    </Typography>
                    <Typography variant="caption" display="block" color={image.hasAlt ? 'success.main' : 'error.main'}>
                      Has Alt: {image.hasAlt ? 'Yes' : 'No'}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>All Meta Tags</Typography>
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
              {analysis.meta?.allMetaTags?.map((meta: any, index: number) => {
                let tagString = '<meta';
                if (meta.charset) {
                  tagString += ` charset="${meta.charset}"`;
                }
                if (meta.name) {
                  tagString += ` name="${meta.name}"`;
                }
                if (meta.property) {
                  tagString += ` property="${meta.property}"`;
                }
                if (meta.httpEquiv) {
                  tagString += ` http-equiv="${meta.httpEquiv}"`;
                }
                if (meta.content) {
                  tagString += ` content="${meta.content}"`;
                }
                tagString += ' />';
                return (
                  <Box key={index} sx={{ mb: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="body2" component="code" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {tagString}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>All Schemas ({(analysis.schemas || analysis.content?.schemas)?.length || 0})</Typography>
            <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
              {(analysis.schemas || analysis.content?.schemas)?.map((schema: any, index: number) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ChevronDown />}>
                    <Typography variant="subtitle2">
                      Schema {index + 1}: {schema['@type'] || schema.type || 'Unknown Type'}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <pre style={{ fontSize: '0.8em', whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                      {JSON.stringify(schema, null, 2)}
                    </pre>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdditionalSeoDetails;