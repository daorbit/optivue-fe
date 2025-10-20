import {
  Typography,
  Box,
} from '@mui/material';

interface MetaTagsTabProps {
  analysis: any;
}

const MetaTagsTab = ({ analysis }: MetaTagsTabProps) => {
  return (
    <div>
      <Box sx={{ 
        maxHeight: 600, 
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
            <Box key={index} sx={{ mb: 1, p: 1, border: '1px solid #43e97b', borderRadius: 1 }}>
              <Typography variant="body2" component="code" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                {tagString}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default MetaTagsTab;