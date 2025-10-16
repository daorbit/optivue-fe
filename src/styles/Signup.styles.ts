import { styled, Container, Paper, Button, Typography, Box, Alert } from '@mui/material';

export const SignupContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)`,
  padding: theme.spacing(2),
}));

export const SignupWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: 450,
}));

export const SignupPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[10],
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, #4caf50, #2e7d32)`,
    borderRadius: `${theme.shape.borderRadius * 2}px ${theme.shape.borderRadius * 2}px 0 0`,
  },
}));

export const SignupTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  color: '#2e7d32',
  fontSize: '2rem',
  position: 'relative',
}));

export const StyledAlert = styled(Alert)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
}));

export const SignupForm = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

export const StyledTextField = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiTextField-root': {
    width: '100%',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.3s ease',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4caf50',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 2,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
}));

export const SignupButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  background: `linear-gradient(45deg, #4caf50 30%, #2e7d32 90%)`,
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)`,
    boxShadow: theme.shadows[8],
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    background: theme.palette.grey[400],
    color: theme.palette.grey[600],
  },
}));

export const LoginLink = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2),
  '& .MuiTypography-root': {
    color: theme.palette.text.secondary,
    '& a': {
      color: '#4caf50',
      textDecoration: 'none',
      fontWeight: 600,
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#2e7d32',
        textDecoration: 'underline',
      },
    },
  },
}));