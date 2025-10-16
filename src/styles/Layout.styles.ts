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

export const MainContent = styled(Box)(() => ({
  flex: 1,
  minHeight: '100vh',
  backgroundColor: '#fafafa',
}));

export const SidebarWrapper = styled(Box)(() => ({
  position: 'relative',
}));