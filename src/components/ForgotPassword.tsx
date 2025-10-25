import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Typography, Box } from "@mui/material";
import { Mail, ArrowLeft } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { forgotPassword } from "../store/slices/authSlice";
import { useMetaTags } from "../utils/useMetaTags";
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
  LeftPane,
  RightPane,
} from "../styles/Login.styles";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const metaTags = useMetaTags({
    title: "Forgot Password - OptiVue",
    description:
      "Reset your OptiVue account password. Enter your email address to receive a password reset link.",
    keywords: "forgot password, reset password, OptiVue account recovery",
    ogTitle: "Forgot Password - OptiVue",
    ogDescription: "Reset your OptiVue account password securely.",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await dispatch(forgotPassword(email)).unwrap();
      setSuccess(result);
    } catch (err: any) {
      setError(err || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {metaTags}
      <LoginContainer>
        <LoginWrapper>
          <LoginCard elevation={0}>
            <LeftPane>
              <LogoSection sx={{ width: "100%", mb: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowLeft size={17} style={{ marginRight: 8 }} />
                    Back to Login
                  </Link>
                </Box>
                <LoginTitle>Forgot Password</LoginTitle>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1, fontSize: "14px" }}
                >
                  Enter your email address and we'll send you a link to reset
                  your password.
                </Typography>
              </LogoSection>

              {error && (
                <StyledAlert severity="error" sx={{ mb: 3 }}>
                  {error}
                </StyledAlert>
              )}

              {success && (
                <StyledAlert severity="success" sx={{ mb: 3 }}>
                  {success}
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
                        <Box
                          sx={{ mr: 1, display: "flex", alignItems: "center" }}
                        >
                          <Mail size={20} color="#666" />
                        </Box>
                      ),
                    }}
                  />
                </StyledTextField>

                <LoginButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !email.trim()}
                  sx={{ mt: 2 }}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </LoginButton>
              </LoginForm>

              <SignupLink>
                <Typography variant="body2">
                  Remember your password?{" "}
                  <Link to="/login" style={{ color: "#2e7d32" }}>
                    Sign in
                  </Link>
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

export default ForgotPassword;
