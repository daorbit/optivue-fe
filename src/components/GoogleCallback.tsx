import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { googleLogin } from '../store/slices/authSlice';
import { Box, CircularProgress, Typography } from '@mui/material';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        console.error('Google OAuth error:', error);
        navigate('/login?error=google_auth_failed');
        return;
      }

      if (!code) {
        console.error('No authorization code received');
        navigate('/login?error=missing_code');
        return;
      }

      try {
        await dispatch(googleLogin(code)).unwrap();
        navigate('/');
      } catch (error) {
        console.error('Google login failed:', error);
        navigate('/login?error=login_failed');
      }
    };

    handleCallback();
  }, [searchParams, navigate, dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Completing Google Sign-In...
      </Typography>
    </Box>
  );
};

export default GoogleCallback;
