import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Skeleton,
} from '@mui/material';
import { Users, Eye, MousePointer, DollarSign } from 'lucide-react';

interface PerformanceMetricsWidgetProps {
  totals: {
    impressions: number;
    clicks: number;
    spend: number;
    reach: number;
  };
  currency: string;
  formatNumber: (num: string) => string;
  formatCurrencyWithConversion: (amount: string, currency: string) => string;
  loading?: boolean;
}

const PerformanceMetricsWidget: React.FC<PerformanceMetricsWidgetProps> = ({
  totals,
  currency,
  formatNumber,
  formatCurrencyWithConversion,
  loading = false,
}) => {
  if (loading) {
    return (
      <Box>
        <Skeleton variant="text" width={180} height={28} sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  border: '1px solid rgba(15,123,118,0.1)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Skeleton variant="circular" width={32} height={32} />
                  </Box>
                  <Skeleton variant="text" width={80} height={32} sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" width={60} height={16} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const metrics = [
    {
      icon: Users,
      label: 'Reach',
      value: formatNumber(totals.reach.toString()),
      color: '#0f7b76',
      bgColor: '#E8FEDF',
    },
    {
      icon: Eye,
      label: 'Impressions',
      value: formatNumber(totals.impressions.toString()),
      color: '#0f7b76',
      bgColor: '#E8FEDF',
    },
    {
      icon: MousePointer,
      label: 'Clicks',
      value: formatNumber(totals.clicks.toString()),
      color: '#0f7b76',
      bgColor: '#E8FEDF',
    },
    {
      icon: DollarSign,
      label: 'Spend',
      value: formatCurrencyWithConversion(totals.spend.toString(), currency),
      color: '#0f7b76',
      bgColor: '#E8FEDF',
    },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight="600" mb={2} sx={{ color: '#2b3a36', fontSize: '1.1rem' }}>
        Performance Metrics
      </Typography>
      <Grid container spacing={2}>
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  border: '1px solid rgba(15,123,118,0.1)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                  },
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: '#0f7b76',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent size={18} color="white" />
                    </Box>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{
                      color: '#2b3a36',
                      mb: 0.5,
                      fontSize: '1.25rem',
                    }}
                  >
                    {metric.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#2b3a36',
                      fontWeight: 500,
                      opacity: 0.8,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {metric.label}
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

export default PerformanceMetricsWidget;