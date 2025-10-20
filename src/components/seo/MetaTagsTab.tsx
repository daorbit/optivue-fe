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
      <Typography variant="h6" gutterBottom>All Meta Tags</Typography>
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
    </div>
  );
};

export default MetaTagsTab;