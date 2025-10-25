import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { TrendingUp, BarChart3, Zap, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

 

// Styled Components
const HeroContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  borderRadius: '12px',
  padding: '32px 24px',
  marginBottom: '24px',
  position: 'relative',
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  animation: `${fadeInUp} 0.6s ease-out`,
  [theme.breakpoints.down('md')]: {
    padding: '24px 20px',
  },
}));

const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 600,
  color: '#111827',
  marginBottom: '8px',
  lineHeight: 1.3,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.375rem',
  },
}));

const WelcomeSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#6b7280',
  marginBottom: '24px',
  fontWeight: 400,
  lineHeight: 1.5,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '8px',
  fontWeight: 500,
  fontSize: '0.9rem',
  textTransform: 'none',
  transition: 'all 0.2s ease',
  boxShadow: '0 1px 3px rgba(16, 185, 129, 0.2)',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
     boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
  },
  '& .MuiButton-endIcon': {
    marginLeft: '6px',
  },
}));

 

const StatsPreview = styled(Card)(() => ({
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  boxShadow: 'none',
}));

const StatItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px',
  '&:not(:last-child)': {
    borderBottom: '1px solid #e5e7eb',
  },
});

const StatValue = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#111827',
});

const StatLabel = styled(Typography)({
  fontSize: '0.75rem',
  color: '#6b7280',
});

interface WelcomeSectionProps {
  title?: string;
  subtitle?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  title,
  subtitle
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getTimeBasedMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Start your day with fresh insights!";
    if (hour < 18) return "Keep optimizing your performance!";
    return "Review today's achievements!";
  };

  return (
    <HeroContainer>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={8}>
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#374151',
                fontWeight: 500,
                marginBottom: '8px',
                fontSize: '1rem'
              }}
            >
              {getGreeting()}, {user?.username || 'User'}! 👋
            </Typography>

            <WelcomeTitle>
              {title || "Welcome to OptiVue"}
            </WelcomeTitle>

            <WelcomeSubtitle>
              {subtitle || getTimeBasedMessage()}
            </WelcomeSubtitle>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Link to="/seo-analysis" style={{ textDecoration: 'none' }}>
                <ActionButton
                  endIcon={<ArrowRight size={16} />}
                >
                  Start SEO Analysis
                </ActionButton>
              </Link>
              <Link to="/facebook-ads" style={{ textDecoration: 'none' }}>
                <ActionButton
                  endIcon={<BarChart3 size={16} />}
                >
                  View Ads Dashboard
                </ActionButton>
              </Link>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsPreview>
            <CardContent sx={{ p: 0 }}>
              <StatItem>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUp size={20} color="#10b981" />
                </Box>
                <Box>
                  <StatValue>Analytics Ready</StatValue>
                  <StatLabel>Your data is up to date</StatLabel>
                </Box>
              </StatItem>

              <StatItem>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={20} color="#10b981" />
                </Box>
                <Box>
                  <StatValue>Campaigns Active</StatValue>
                  <StatLabel>3 running campaigns</StatLabel>
                </Box>
              </StatItem>

              <StatItem>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={20} color="#10b981" />
                </Box>
                <Box>
                  <StatValue>AI Insights</StatValue>
                  <StatLabel>Ready for optimization</StatLabel>
                </Box>
              </StatItem>
            </CardContent>
          </StatsPreview>
        </Grid>
      </Grid>
    </HeroContainer>
  );
};

export default WelcomeSection;