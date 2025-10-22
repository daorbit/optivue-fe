import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const WelcomeSectionContainer = styled(Box)(() => ({
  marginBottom: 32,
}));

const WelcomeTitle = styled(Typography)(() => ({
  fontWeight: 700,
  color: '#1e293b',
  marginBottom: 4,
  fontSize: '1.5rem',
  '@media (max-width: 900px)': {
    fontSize: '1.75rem',
  },
}));

const WelcomeSubtitle = styled(Typography)(() => ({
  color: '#64748b',
  fontSize: '0.9rem',
}));

interface WelcomeSectionProps {
  title?: string;
  subtitle?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  title = "Welcome back to OptiVue",
  subtitle = "Here's what's happening with your campaigns and analytics today."
}) => {
  return (
    <WelcomeSectionContainer>
      <WelcomeTitle variant="h5">
        {title}
      </WelcomeTitle>
      <WelcomeSubtitle>
        {subtitle}
      </WelcomeSubtitle>
    </WelcomeSectionContainer>
  );
};

export default WelcomeSection;