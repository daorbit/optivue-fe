import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { login as loginAction } from '../store/slices/authSlice';
import {
  LoginContainer,
  LoginWrapper,
  LoginTitle,
  StyledAlert,
  LoginForm,
  StyledTextField,
  LoginButton,
  SignupLink
} from '../styles/Login.styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await dispatch(loginAction({ email, password })).unwrap();
    } catch (err: any) {
      setError(err || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
          <LoginTitle variant="h4">
            Sign In
          </LoginTitle>
          {error && (
            <StyledAlert severity="error">
              {error}
            </StyledAlert>
          )}
          <LoginForm component="form" onSubmit={handleSubmit}>
            <StyledTextField>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </StyledTextField>
            <StyledTextField>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </StyledTextField>
            <LoginButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </LoginButton>
            <SignupLink>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link to="/signup">
                  Sign Up
                </Link>
              </Typography>
            </SignupLink>
          </LoginForm>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;