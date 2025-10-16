import { styled, Box, Button } from '@mui/material';

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  backgroundColor: '#f6f8f8',
  height: '100vh',
  padding: theme.spacing(2.5),
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'none',
  position: 'relative',
  borderRight: '1px solid rgba(0,0,0,0.04)',
}));

export const NavigationList = styled('nav')(({ theme }) => ({
  flex: 1,
  marginTop: theme.spacing(1),
  '& .nav-item': {
    marginBottom: theme.spacing(1),
    borderRadius: 10,
    transition: 'all 0.15s ease',
    color: '#2b3a36',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 1.5),
    textDecoration: 'none',
  },
  '& .nav-item .MuiListItemIcon-root': {
    minWidth: 38,
    color: '#0f7b76',
  },
  '& .nav-item .MuiListItemText-root': {
    color: '#2b3a36',
    fontWeight: 500,
  },
  '& .nav-item.active': {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 0 rgba(15,123,118,0.06)',
    borderLeft: '4px solid #0f7b76',
    paddingLeft: theme.spacing(1.5),
  },
  '& .logout-item': {
    color: '#d32f2f',
    '& .MuiListItemIcon-root': {
      color: '#d32f2f',
    },
    '& .MuiListItemText-root': {
      color: '#d32f2f',
    },
    '&:hover': {
      backgroundColor: 'rgba(211,47,47,0.04)',
    },
  },
}));

export const LogoutSection = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  paddingTop: theme.spacing(3),
}));

export const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#d32f2f',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 1.5),
  fontWeight: 600,
  textTransform: 'none',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(211,47,47,0.04)',
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
    color: '#d32f2f',
  },
}));