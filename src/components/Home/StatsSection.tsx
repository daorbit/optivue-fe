import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Users, TrendingUp, DollarSign, Activity, LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Animations
const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

 

const StatsGridContainer = styled(Grid)(() => ({
  marginBottom: 32,
}));

const StatCard = styled(Card)<{ gradient: string }>(() => ({
  borderRadius: 12,
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  transition: 'all 0.2s ease',
  position: 'relative',
  overflow: 'hidden',
  animation: `${slideInUp} 0.5s ease-out forwards`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
}));

const StatCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  position: 'relative',
  zIndex: 2,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StatHeader = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: 16,
});

const StatIcon = styled(Box)<{ bgColor: string }>(({ bgColor }) => ({
  width: 48,
  height: 48,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: bgColor,
  marginBottom: 12,
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 700,
  color: '#111827',
  marginBottom: theme.spacing(0.5),
  lineHeight: 1,
}));

const StatLabel = styled(Typography)({
  color: '#6b7280',
  fontSize: '0.8rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

const StatChange = styled(Box)<{ isPositive: boolean }>(({ isPositive }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '4px 8px',
  borderRadius: 12,
  backgroundColor: isPositive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
  border: `1px solid ${isPositive ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
}));

const ChangeText = styled(Typography)<{ isPositive: boolean }>(({ isPositive }) => ({
  fontSize: '0.75rem',
  fontWeight: 700,
  color: isPositive ? '#22c55e' : '#ef4444',
}));

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  gradient: string;
  iconBg: string;
  iconColor: string;
}

interface StatsSectionProps {
  stats?: StatItem[];
}

const StatsSection: React.FC<StatsSectionProps> = ({
  stats = [
    {
      icon: Users,
      label: 'Total Reach',
      value: '2.4M',
      change: '+12.5%',
      changeType: 'positive',
      gradient: '#ffffff',
      iconBg: '#f3f4f6',
      iconColor: '#10b981',
    },
    {
      icon: TrendingUp,
      label: 'Conversion Rate',
      value: '3.2%',
      change: '+8.1%',
      changeType: 'positive',
      gradient: '#ffffff',
      iconBg: '#f3f4f6',
      iconColor: '#10b981',
    },
    {
      icon: DollarSign,
      label: 'Total Spend',
      value: '$12.5K',
      change: '-2.4%',
      changeType: 'negative',
      gradient: '#ffffff',
      iconBg: '#f3f4f6',
      iconColor: '#10b981',
    },
    {
      icon: Activity,
      label: 'Active Campaigns',
      value: '24',
      change: '+3',
      changeType: 'positive',
      gradient: '#ffffff',
      iconBg: '#f3f4f6',
      iconColor: '#10b981',
    },
  ]
}) => {
  return (
    <StatsGridContainer container spacing={3}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard
              gradient={stat.gradient}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <StatCardContent>
                <StatHeader>
                  <StatIcon bgColor={stat.iconBg}>
                    <IconComponent size={28} color={stat.iconColor} />
                  </StatIcon>
                  {stat.change && (
                    <StatChange isPositive={stat.changeType === 'positive'}>
                      {stat.changeType === 'positive' ? (
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownRight size={14} />
                      )}
                      <ChangeText isPositive={stat.changeType === 'positive'}>
                        {stat.change}
                      </ChangeText>
                    </StatChange>
                  )}
                </StatHeader>

                <Box>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </Box>
              </StatCardContent>
            </StatCard>
          </Grid>
        );
      })}
    </StatsGridContainer>
  );
};

export default StatsSection;