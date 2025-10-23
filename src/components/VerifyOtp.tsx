import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import { verifyOtp } from '../store/slices/authSlice';
import {
  SignupContainer,
  SignupWrapper,
  SignupPaper,
  SignupTitle,
  StyledAlert,
  SignupForm,
  StyledTextField,
  SignupButton,
  LoginLink
} from '../styles/Signup.styles';

const VerifyOtp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from location state if passed from signup
    const stateEmail = location.state?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !otp) {
      setError('Please fill in all fields');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      await dispatch(verifyOtp({ email, otp })).unwrap();
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    // TODO: Implement resend OTP functionality
    setError('Resend OTP functionality not implemented yet');
  };

  return (
    <SignupContainer maxWidth="sm">
      <SignupWrapper>
        <SignupPaper elevation={3}>
          <SignupTitle variant="h4">
            Verify Your Email
          </SignupTitle>
          <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
            We've sent a 6-digit OTP to your email address. Please enter it below to verify your account.
          </Typography>
          {error && (
            <StyledAlert severity="error">
              {error}
            </StyledAlert>
          )}
          <SignupForm component="form" onSubmit={handleSubmit}>
            <StyledTextField>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!location.state?.email}
              />
            </StyledTextField>
            <StyledTextField>
              <TextField
                required
                fullWidth
                id="otp"
                label="OTP Code"
                name="otp"
                autoComplete="one-time-code"
                inputProps={{
                  maxLength: 6,
                  pattern: '[0-9]*'
                }}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                helperText="Enter the 6-digit code sent to your email"
              />
            </StyledTextField>
            <SignupButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </SignupButton>
            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: 'center', cursor: 'pointer', color: 'primary.main' }}
              onClick={handleResendOtp}
            >
              Didn't receive the code? Click here to resend
            </Typography>
            <LoginLink>
              <Typography variant="body2">
                Remember your password?{' '}
                <Link to="/login">
                  Sign In
                </Link>
              </Typography>
            </LoginLink>
          </SignupForm>
        </SignupPaper>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default VerifyOtp;