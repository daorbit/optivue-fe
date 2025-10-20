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
      <Box sx={{ 
        maxHeight: 500, 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '0px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#a8a8a8',
        },
        '&:hover::-webkit-scrollbar': {
          width: '6px',
        }
      }}>
        {(analysis.schemas || analysis.content?.schemas)?.map((schema: any, index: number) => (
          <Accordion 
            key={index} 
            sx={{ 
              mb: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }
            }}
          >
            <AccordionSummary 
              expandIcon={<ChevronDown size={20} />}
              sx={{
                backgroundColor: '#f8f9fa',
                borderRadius: 2,
                '&.Mui-expanded': {
                  backgroundColor: '#667eea',
                  color: 'white',
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    color: 'white',
                  }
                },
                '&:hover': {
                  backgroundColor: '#f0f2f5',
                }
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                Schema {index + 1}: {schema['@type'] || schema.type || 'Unknown Type'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#fafbfc', borderTop: '1px solid #e0e0e0' }}>
              <pre style={{ 
                fontSize: '0.85em', 
                whiteSpace: 'pre-wrap', 
                backgroundColor: '#ffffff', 
                padding: '12px', 
                borderRadius: '6px',
                border: '1px solid #e0e0e0',
                margin: 0,
                overflow: 'auto'
              }}>
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