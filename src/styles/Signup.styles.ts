import { styled, Paper, Button, Typography, Box, Alert } from '@mui/material';

export const SignupContainer = styled(Box)(({ theme }) => ({
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
 fontWeight: 600,
  color: "#111",
  fontSize: "2.25rem",
  textAlign:"center",
  marginBottom: theme.spacing(1),
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
    borderRadius: 8,
    transition: 'all 0.18s ease',
    minHeight: 44,
    border: '1px solid rgba(0,0,0,0.06)',
    backgroundColor: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px',
      fontSize: '0.95rem',
      color: '#222',
      '&::placeholder': {
        color: '#bfbfbf',
        opacity: 1,
      },
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4caf50',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 2,
      borderColor: '#2e7d32',
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
}));

export const SignupButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  height: 44,
  padding: '0 18px',
  borderRadius: theme.shape.borderRadius,
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  background: '#2e7d32',
  color: '#fff',
  boxShadow: '0 2px 6px rgba(46,125,50,0.18)',
  transition: 'all 0.15s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    background: '#276027',
    boxShadow: '0 6px 18px rgba(39,96,39,0.12)',
    transform: 'translateY(-1px)',
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