import { styled, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(90deg, #4caf50 0%, #2e7d32 100%)`,
  boxShadow: theme.shadows[4],
  position: 'static',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(0, 3),
}));

export const AppTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 700,
  color: theme.palette.common.white,
  fontSize: '1.5rem',
}));

export const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  marginLeft: theme.spacing(1),
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-1px)',
  },
}));

export const MainContent = styled(Box)<{ isAuthenticated?: boolean }>(({ isAuthenticated }) => ({
  flex: 1,
  minHeight: '100vh',
  backgroundColor: '#fafafa',
  marginTop: isAuthenticated ? 0 : 0, // Account for AppBar height
  transition: 'margin-top 0.3s ease',
}));

export const SidebarWrapper = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  zIndex: 1000,
}));