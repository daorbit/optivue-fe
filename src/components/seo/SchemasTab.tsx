import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';

interface SchemasTabProps {
  analysis: any;
}

const SchemasTab = ({ analysis }: SchemasTabProps) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>All Schemas ({(analysis.schemas || analysis.content?.schemas)?.length || 0})</Typography>
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
    </div>
  );
};

export default SchemasTab;