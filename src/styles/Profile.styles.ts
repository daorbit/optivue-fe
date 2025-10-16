import { styled, Box, Button, Avatar, Tabs, Tab, TextField } from '@mui/material';

export const ProfileContainer = styled(Box)(({ theme }) => ({
  maxWidth: '980px',
  margin: '0 auto',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
  borderRadius: 6,
  boxShadow: 'none',
}));

export const ProfileHeader = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const ProfileTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid rgba(0,0,0,0.08)',
  marginBottom: theme.spacing(3),
  '& .MuiTabs-indicator': {
    backgroundColor: '#0f7b76',
  },
}));

export const ProfileTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: 'rgba(0,0,0,0.7)',
  fontWeight: 600,
  minWidth: 80,
}));

export const ProfileBody = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
}));

export const AvatarColumn = styled(Box)(({ theme }) => ({
  width: 220,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
}));

export const FormColumn = styled(Box)(({ theme }) => ({
  flex: 1,
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 72,
  height: 72,
  backgroundColor: '#e6f3f2',
  color: '#0f7b76',
}));

export const ChooseFileButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0f7b76',
  color: '#fff',
  textTransform: 'none',
  padding: theme.spacing(0.8, 2),
  '&:hover': {
    backgroundColor: '#0c6b67',
  }
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: '#fafafa',
  }
}));

export const EditButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0f7b76',
  color: '#fff',
  textTransform: 'none',
  padding: theme.spacing(1, 2),
  borderRadius: 6,
  '&:hover': {
    backgroundColor: '#0c6b67',
  }
}));
