import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { login as loginAction } from "../store/slices/authSlice";
import {
  LoginContainer,
  LoginWrapper,
  LogoSection,
  LoginCard,
  LoginTitle,
  StyledAlert,
  LoginForm,
  StyledTextField,
  LoginButton,
  SignupLink,
  ForgotPasswordLink,
  LeftPane,
  RightPane,
  // SocialButton,
} from "../styles/Login.styles";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector<any>((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await dispatch(loginAction({ email, password })).unwrap();
    } catch (err: any) {
      setError(err || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginCard elevation={0}>
          <LeftPane>
            <LogoSection sx={{ width: "100%", mb: 4 }}>
              <LoginTitle>Welcome back!</LoginTitle>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1, fontSize: "14px" }}
              >
                Enter your Credentials to access your account
              </Typography>
            </LogoSection>

            {error && (
              <StyledAlert severity="error" sx={{ mb: 3 }}>
                {error}
              </StyledAlert>
            )}

            <LoginForm component="form" onSubmit={handleSubmit}>
              <StyledTextField>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                  Email address
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color="#666" />
                      </InputAdornment>
                    ),
                  }}
                />
              </StyledTextField>

              <StyledTextField>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }} >
                  Password
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} color="#666" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </StyledTextField>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
               
                <ForgotPasswordLink>
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: "none" }}
                  >
                    Forgot password
                  </Link>
                </ForgotPasswordLink>
              </Box>

              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </LoginButton>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  mt: 3,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: 1,
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                />
                {/* <Typography variant="body2" color="text.secondary">
                  Or
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: 1,
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                /> */}
              </Box>

              {/* <Box
                sx={{
                  display: "flex",
                  gap: 12,
                  flexDirection: "column",
                  mt: 2,
                }}
              >
                <SocialButton
                  startIcon={
                    <img
                      src="/assets/google-logo.png"
                      alt="g"
                      style={{ width: 18 }}
                    />
                  }
                >
                  Sign in with Google
                </SocialButton>
              </Box> */}

              <SignupLink>
                <Typography variant="body2">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </Typography>
              </SignupLink>
            </LoginForm>
          </LeftPane>

          <RightPane
            sx={{
              backgroundImage: `url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5b1e9650d1d3c1c6a2b8d9b4b3c3f7b7')`,
            }}
          />
        </LoginCard>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
