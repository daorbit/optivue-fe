import { Card, CardContent, Box, Typography, LinearProgress } from "@mui/material";
import { TrendingUp } from "lucide-react";

const SeoLoadingState = () => {
  return (
    <Card sx={{ mb: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUp size={24} style={{ marginRight: 12, color: '#66bb6a' }} />
          <Typography variant="h6">Analyzing your website...</Typography>
        </Box>
        <LinearProgress sx={{ height: 8, borderRadius: 4 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This may take a few moments. We're checking meta tags, content quality, technical SEO, and more.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SeoLoadingState;