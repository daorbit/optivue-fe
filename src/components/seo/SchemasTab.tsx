import { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Collapse,
} from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SchemasTabProps {
  analysis: any;
}

const SchemasTab = ({ analysis }: SchemasTabProps) => {
  const [expandedSchemas, setExpandedSchemas] = useState<Set<number>>(new Set());

  const toggleSchema = (index: number) => {
    const newExpanded = new Set(expandedSchemas);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSchemas(newExpanded);
  };

  return (
     <Box sx={{ 
        maxHeight: 900, 
        overflow: 'auto',
        paddingRight: '6px', // Reserve space for scrollbar
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
      <Typography variant="h6" gutterBottom>All Schemas ({(analysis.schemas || analysis.content?.schemas)?.length || 0})</Typography>
      <Box  >
        {(analysis.schemas || analysis.content?.schemas)?.map((schema: any, index: number) => (
          <Card 
            key={index} 
            sx={{ 
              mb: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textTransform:"none"
              }
              
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                  Schema {index + 1}: {schema['@type'] || schema.type || 'Unknown Type'}
                </Typography>
                <Button
                  size="small"
                  onClick={() => toggleSchema(index)}
                  endIcon={expandedSchemas.has(index) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  sx={{
                    textTransform: 'none',
                    minWidth: 'auto',
                    px: 1,
                    py: 0.5,
                    fontSize: '0.8rem'
                  }}
                >
                  {expandedSchemas.has(index) ? 'Hide' : 'Show'} Details
                </Button>
              </Box>
              <Collapse in={expandedSchemas.has(index)}>
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
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SchemasTab;