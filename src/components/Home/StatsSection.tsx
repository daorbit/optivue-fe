import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Users, TrendingUp, DollarSign, Activity, LucideIcon } from 'lucide-react';

const StatsGridContainer = styled(Grid)(() => ({
  marginBottom: 32,
}));

const StatCard = styled(Card)(() => ({
  borderRadius: 12,
  // border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  transition: 'all 0.18s ease',
  '&:hover': {
    boxShadow: '0 6px 18px rgba(16,24,40,0.08)',
  },
}));

const StatCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const StatIcon = styled(Box)<{ color: string }>(({ color }) => ({
  width: 48,
  height: 48,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color,
  marginBottom: 16,
}));

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  iconColor: string;
}

interface StatsSectionProps {
  stats?: StatItem[];
}

const StatsSection: React.FC<StatsSectionProps> = ({
  stats = [
    ({
      icon: Users,
      label: 'Total Reach',
      value: '2.4M',
      color: '#dbeafe',
      iconColor: '#3b82f6',
    } as StatItem),
    ({
      icon: TrendingUp,
      label: 'Conversion Rate',
      value: '3.2%',
      // use theme primary for conversion highlight; background will be derived in render
      color: '',
      iconColor: '',
    } as StatItem),
    {
      icon: DollarSign,
      label: 'Total Spend',
      value: '$12.5K',
      color: '#fef3c7',
      iconColor: '#f59e0b',
    },
    {
      icon: Activity,
      label: 'Active Campaigns',
      value: '24',
      color: '#fce7f3',
      iconColor: '#ec4899',
    },
  ]
}) => {
  const theme = useTheme();
  return (
    <StatsGridContainer container spacing={3}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
         const bgColor = stat.color || (index === 1 ? alpha(theme.palette.primary.main, 0.15) : theme.palette.grey[50]);
        const iconClr = stat.iconColor || (index === 1 ? theme.palette.primary.main : theme.palette.text.primary);
        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard>
              <StatCardContent>
                <StatIcon color={bgColor}>
                  <IconComponent size={24} color={iconClr} />
                </StatIcon>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCardContent>
            </StatCard>
          </Grid>
        );
      })}
    </StatsGridContainer>
  );
};

export default StatsSection;