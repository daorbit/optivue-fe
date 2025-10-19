import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
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
}

const PerformanceMetricsWidget: React.FC<PerformanceMetricsWidgetProps> = ({
  totals,
  currency,
  formatNumber,
  formatCurrencyWithConversion,
}) => {
  const metrics = [
    {
      icon: Users,
      label: 'Reach',
      value: formatNumber(totals.reach.toString()),
      color: '#6366f1',
      bgColor: 'rgba(99, 102, 241, 0.1)',
    },
    {
      icon: Eye,
      label: 'Impressions',
      value: formatNumber(totals.impressions.toString()),
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      icon: MousePointer,
      label: 'Clicks',
      value: formatNumber(totals.clicks.toString()),
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      icon: DollarSign,
      label: 'Spend',
      value: formatCurrencyWithConversion(totals.spend.toString(), currency),
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
    },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={3} sx={{ color: '#1f2937' }}>
        Performance Metrics
      </Typography>
      <Grid container spacing={3}>
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${metric.bgColor} 0%, rgba(255,255,255,0.9) 100%)`,
                  border: `1px solid ${metric.color}20`,
                  boxShadow: `0 4px 20px ${metric.color}15`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 30px ${metric.color}25`,
                  },
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: metric.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent size={24} color="white" />
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      color: '#1f2937',
                      mb: 1,
                      fontSize: '1.75rem',
                    }}
                  >
                    {metric.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6b7280',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontSize: '0.75rem',
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