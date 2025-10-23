import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAppSelector } from "../store/hooks";
import { apiService } from "../services/api";
import { SignupTitle, LoginLink } from "../styles/Signup.styles";
import {
  LoginForm,
  StyledTextField,
  LoginButton,
  StyledAlert,
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.signup({ username, email, password });
      if (response.success) {
        navigate("/verify-otp", { state: { email } });
      } else {
        setError(response.message || "Signup failed");
      }
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginCard elevation={3}>
          <LeftPane>
            <LogoSection sx={{ textAlign: "left", width: "100%", mb: 4 }}>
              <SignupTitle>Get Started Now</SignupTitle>
            </LogoSection>

            {error && <StyledAlert severity="error">{error}</StyledAlert>}

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
  );
};

export default Signup;
