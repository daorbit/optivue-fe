import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
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

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await signup(username, email, password);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <SignupContainer maxWidth="sm">
      <SignupWrapper>
        <SignupPaper elevation={3}>
          <SignupTitle variant="h4">
            Sign Up
          </SignupTitle>
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </StyledTextField>
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
              />
            </StyledTextField>
            <StyledTextField>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </StyledTextField>
            <StyledTextField>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </StyledTextField>
            <SignupButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </SignupButton>
            <LoginLink>
              <Typography variant="body2">
                Already have an account?{' '}
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

export default Signup;