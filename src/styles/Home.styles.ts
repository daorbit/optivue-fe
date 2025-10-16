import { styled, Typography, Box } from '@mui/material';

export const HomeContainer = styled(Box)(() => ({
  padding: '24px',
  width: '100%',
  textAlign: 'center',
}));

export const HomeTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#2e7d32',
  marginBottom: theme.spacing(3),
  fontSize: '2.5rem',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 60,
    height: 4,
    background: `linear-gradient(90deg, #4caf50, #66bb6a)`,
    borderRadius: 2,
  },
}));

export const HomeDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  marginTop: theme.spacing(4),
}));