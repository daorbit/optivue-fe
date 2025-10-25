import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getGoogleAuthUrl } from "../store/slices/authSlice";
import { apiService } from "../services/api";
import { useMetaTags } from "../utils/useMetaTags";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { GoogleIcon } from "./GoogleIcon";
import { SignupTitle, LoginLink } from "../styles/Signup.styles";
import {
  LoginForm,
  StyledTextField,
  LoginButton,
  SocialButton,
} from "../styles/Login.styles";
import {
  LoginContainer,
  LoginWrapper,
  LoginCard,
  LeftPane,
  RightPane,
  LogoSection,
} from "../styles/Login.styles";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, googleLoading } = useAppSelector((state) => state.auth);

  const metaTags = useMetaTags({
    title: "Sign Up for OptiVue - Join Our Digital Optimization Platform",
    description: "Create your OptiVue account to access powerful SEO analysis tools, Facebook Ads management, and comprehensive digital marketing optimization features.",
    keywords: "sign up, register, OptiVue account, SEO tools, Facebook ads, digital marketing platform",
    ogTitle: "Join OptiVue - Transform Your Digital Presence",
    ogDescription: "Sign up for OptiVue and unlock powerful tools for SEO analysis, Facebook Ads management, and digital marketing optimization."
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.signup({ username, email, password });
      if (response.success) {
        showSuccessToast("Account created successfully! Please check your email for verification code.");
        navigate("/verify-otp", { state: { email } });
      } else {
        showErrorToast(response.message || "Signup failed");
      }
    } catch (err: any) {
      showErrorToast(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await dispatch(getGoogleAuthUrl()).unwrap();
      if (result) {
        // Redirect to Google OAuth
        window.location.href = result;
      }
    } catch (err: any) {
      showErrorToast(err || "Failed to initiate Google signup");
    }
  };

  return (
    <>
      {metaTags}
      <LoginContainer>
      <LoginWrapper>
        <LoginCard elevation={3}>
          <LeftPane>
            <LogoSection sx={{ textAlign: "left", width: "100%", mb: 4 }}>
              <SignupTitle>Get Started Now</SignupTitle>
            </LogoSection>

            <LoginForm component="form" onSubmit={handleSubmit}>
              <StyledTextField>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                  Username
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </StyledTextField>

              <StyledTextField>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                  Email Address
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={18} color="#666" />
                      </InputAdornment>
                    ),
                  }}
                />
              </StyledTextField>

              <StyledTextField>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                  Password
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} color="#666" />
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
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </StyledTextField>

              <StyledTextField>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                  Confirm Password
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} color="#666" />
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
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </StyledTextField>

              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ marginTop: "10px" }}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </LoginButton>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 2, md: 3 },
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
                <Typography variant="body2" color="text.secondary">
                  Or
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: 1,
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 2, md: 3 },
                  flexDirection: "column",
                  mt: 2,
                  mb: 3,
                }}
              >
                <SocialButton
                  onClick={handleGoogleSignup}
                  disabled={googleLoading || loading}
                  startIcon={<GoogleIcon />}
                >
                  {googleLoading ? "Loading..." : "Sign up with Google"}
                </SocialButton>
              </Box>

              <LoginLink>
                <Typography variant="body2">
                  Already have an account? <Link to="/login">Sign In</Link>
                </Typography>
              </LoginLink>
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
    </>
  );
};

export default Signup;
