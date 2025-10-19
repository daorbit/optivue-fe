import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { Target, TrendingUp, BarChart3 } from 'lucide-react';

interface AdditionalMetricsWidgetProps {
  ctr: number;
  cpc: number;
  cpm: number;
  currency: string;
  formatCurrencyWithConversion: (amount: string, currency: string) => string;
}

const AdditionalMetricsWidget: React.FC<AdditionalMetricsWidgetProps> = ({
  ctr,
  cpc,
  cpm,
  currency,
  formatCurrencyWithConversion,
}) => {
  const metrics = [
    {
      icon: Target,
      label: 'CTR',
      value: `${ctr.toFixed(2)}%`,
      description: 'Click-through rate',
      color: '#6366f1',
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: TrendingUp,
      label: 'CPC',
      value: formatCurrencyWithConversion(cpc.toString(), currency),
      description: 'Cost per click',
      color: '#10b981',
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: BarChart3,
      label: 'CPM',
      value: formatCurrencyWithConversion(cpm.toString(), currency),
      description: 'Cost per 1,000 impressions',
      color: '#f59e0b',
      bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight="bold" mb={3} sx={{ color: '#1f2937' }}>
        Advanced Metrics
      </Typography>
      <Grid container spacing={3}>
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: metric.bgColor,
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    transform: 'translate(30px, -30px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <IconComponent size={24} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {metric.label}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                      mb: 1,
                      fontSize: '2.5rem',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {metric.value}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      fontSize: '0.9rem',
                    }}
                  >
                    {metric.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AdditionalMetricsWidget;