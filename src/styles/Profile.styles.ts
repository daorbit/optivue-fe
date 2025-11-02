import { styled, Box, Button, Avatar, Tabs, Tab, TextField, Card, Paper } from '@mui/material';

export const ProfileContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(3, 2),
}));

export const ProfileHeaderCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2f855a 0%, #38a169 100%)',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  position: 'relative',
  marginBottom: theme.spacing(4),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  }
}));

export const StatsCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  border: '1px solid #e0e0e0',
  overflow: 'hidden',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
  }
}));

export const ProfileTabs = styled(Tabs)(() => ({
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    minHeight: 64,
    fontSize: '1rem',
    color: 'rgba(0,0,0,0.7)',
    '&.Mui-selected': {
      color: '#2f855a',
    }
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#2f855a',
    height: 3,
    borderRadius: '3px 3px 0 0'
  },
  '& .MuiTab-iconWrapper': {
    marginBottom: '0 !important',
  }
}));

export const ProfileTab = styled(Tab)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
}));

export const ProfileAvatar = styled(Avatar)(() => ({
  width: 100,
  height: 100,
  backgroundColor: 'rgba(255,255,255,0.2)',
  fontSize: '2.5rem',
  border: '4px solid rgba(255,255,255,0.3)',
  position: 'relative',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2f855a',
  color: '#fff',
  textTransform: 'none',
  padding: theme.spacing(1, 3),
  borderRadius: theme.spacing(1),
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#38a169',
  },
  '&:disabled': {
    backgroundColor: 'rgba(0,0,0,0.12)',
  }
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: '#fff',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#fafafa',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
    },
    '&.Mui-disabled': {
      backgroundColor: '#f8f9fa',
    }
  }
}));

export const AppCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  border: '1px solid #e0e0e0',
  position: 'relative',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: '#2f855a',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(47, 133, 90, 0.1)',
  }
}));

export const GlassMorphismButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,0.15)',
  color: 'white',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  border: '1px solid rgba(255,255,255,0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.25)',
    transform: 'translateY(-1px)',
  }
}));

export const StatusIndicator = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#4caf50',
  display: 'inline-block',
  marginRight: theme.spacing(1),
}));

export const IconContainer = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: theme.spacing(1.5),
  backgroundColor: '#e8f5e8',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
}));

export const PreferenceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  border: '1px solid #e0e0e0',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: '#2f855a',
    boxShadow: '0 4px 12px rgba(47, 133, 90, 0.1)',
  }
}));

export const FloatingActionCard = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  zIndex: 1000,
  background: 'white',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  border: '1px solid rgba(0,0,0,0.05)',
}));
