import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { TextField, Typography, InputAdornment } from "@mui/material";
import { Mail } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { verifyOtp } from "../store/slices/authSlice";
import { useMetaTags } from "../utils/useMetaTags";
import { SignupTitle, LoginLink } from "../styles/Signup.styles";
import {
  LoginContainer,
  LoginWrapper,
  LoginCard,
  LeftPane,
  RightPane,
  LogoSection,
  LoginForm,
  StyledTextField,
  LoginButton,
  StyledAlert,
} from "../styles/Login.styles";

const VerifyOtp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const metaTags = useMetaTags({
    title: "Verify Your Email - OptiVue Account Verification",
    description: "Enter the verification code sent to your email to complete your OptiVue account registration and access our digital optimization tools.",
    keywords: "verify email, OTP, verification code, OptiVue account, email verification",
    ogTitle: "Verify Your OptiVue Account",
    ogDescription: "Complete your account verification to access powerful SEO analysis and Facebook Ads management tools."
  });

  useEffect(() => {
    // Get email from location state if passed from signup
    const stateEmail = location.state?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !otp) {
      setError("Please fill in all fields");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    try {
      await dispatch(verifyOtp({ email, otp })).unwrap();
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    // TODO: Implement resend OTP functionality
    setError("Resend OTP functionality not implemented yet");
  };

  return (
    <>
      {metaTags}
      <LoginContainer>
      <LoginWrapper>
        <LoginCard elevation={3}>
          <LeftPane>
            <LogoSection>
              <SignupTitle variant="h4">Verify Your Email</SignupTitle>
            </LogoSection>

            {error && <StyledAlert severity="error">{error}</StyledAlert>}

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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!!location.state?.email}
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
                  OTP Code
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="otp"
                  name="otp"
                  placeholder="Enter your OTP"
                  autoComplete="one-time-code"
                  inputProps={{
                    maxLength: 6,
                    pattern: "[0-9]*",
                  }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  helperText="Enter the 6-digit code sent to your email"
                />
              </StyledTextField>

              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </LoginButton>

              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  color: "#2e7d32",
                }}
                onClick={handleResendOtp}
              >
                Didn't receive the code? Click here to resend
              </Typography>

              <LoginLink>
                <Typography variant="body2">
                  Remember your password? <Link to="/login">Sign In</Link>
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

export default VerifyOtp;
