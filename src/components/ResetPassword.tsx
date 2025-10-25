import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { resetPassword } from "../store/slices/authSlice";
import { useMetaTags } from "../utils/useMetaTags";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import {
  LoginContainer,
  LoginWrapper,
  LogoSection,
  LoginCard,
  LoginTitle,
  LoginForm,
  StyledTextField,
  LoginButton,
  SignupLink,
  LeftPane,
  RightPane,
} from "../styles/Login.styles";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const metaTags = useMetaTags({
    title: "Reset Password - OptiVue",
    description: "Set a new password for your OptiVue account.",
    keywords: "reset password, new password, OptiVue account",
    ogTitle: "Reset Password - OptiVue",
    ogDescription: "Securely set a new password for your OptiVue account."
  });

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      showErrorToast("Invalid reset link. Please request a new password reset.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      showErrorToast("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await dispatch(resetPassword({ token, password })).unwrap();
      showSuccessToast("Password reset successful! You are now logged in.");
      navigate("/"); // Redirect to home after successful reset
    } catch (err: any) {
      showErrorToast(err || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <>
        {metaTags}
        <LoginContainer>
          <LoginWrapper>
            <LoginCard elevation={0}>
              <LeftPane>
                <LogoSection sx={{ width: "100%", mb: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    <Link to="/login"   style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <ArrowLeft size={17} style={{ marginRight: 8 }} />
                      Back to Login
                    </Link>
                  </Box>
                  <LoginTitle>Reset Password</LoginTitle>
                </LogoSection>

                <SignupLink>
                  <Typography variant="body2">
                    <Link to="/forgot-password" style={{color:"#2e7d32"}}>Request a new reset link</Link>
                  </Typography>
                </SignupLink>
              </LeftPane>
              <RightPane sx={{ backgroundImage: `url('/assets/login.webp')` }} />
            </LoginCard>
          </LoginWrapper>
        </LoginContainer>
      </>
    );
  }

  return (
    <>
      {metaTags}
      <LoginContainer>
        <LoginWrapper>
          <LoginCard elevation={0}>
            <LeftPane>
              <LogoSection sx={{ width: "100%", mb: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                    <ArrowLeft size={20} style={{ marginRight: 8 }} />
                    Back to Login
                  </Link>
                </Box>
                <LoginTitle>Reset Password</LoginTitle>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1, fontSize: "14px" }}
                >
                  Enter your new password below.
                </Typography>
              </LogoSection>

              <LoginForm component="form" onSubmit={handleSubmit}>
                <StyledTextField>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    New Password
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="Enter new password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
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

                <StyledTextField>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    Confirm New Password
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={20} color="#666" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            size="small"
                          >
                            {showConfirmPassword ? (
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

                <LoginButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !password.trim() || !confirmPassword.trim()}
                  sx={{ mt: 2 }}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </LoginButton>
              </LoginForm>

              <SignupLink>
                <Typography variant="body2">
                  Remember your password? <Link to="/login" style={{color:"#2e7d32"}}>Sign in</Link>
                </Typography>
              </SignupLink>
            </LeftPane>

            <RightPane
              sx={{
                backgroundImage: `url('/assets/login.webp')`,
              }}
            />
          </LoginCard>
        </LoginWrapper>
      </LoginContainer>
    </>
  );
};

export default ResetPassword;