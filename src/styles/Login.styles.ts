import { styled, Button, Typography, Box, Alert, Paper } from "@mui/material";

export const LoginContainer = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f6f9f6",
}));

export const LoginWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  width: "100%",
  maxWidth: "100%",
}));

export const LoginCard = styled(Paper)(() => ({
  width: "100%",
  display: "flex",
  minHeight: "100vh",
  padding: 0,
  borderRadius: 12,
  backgroundColor: "white",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  border: "1px solid #e8f5e8",
  overflow: "hidden",
}));

export const LeftPane = styled(Box)(({ theme }) => ({
  flex: "0 0 50%",
  width: "50%",
  padding: theme.spacing(6),
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const RightPane = styled(Box)(() => ({
  flex: "0 0 50%",
  width: "50%",
  display: "block",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export const LogoSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

export const LoginTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#111",
  fontSize: "2.25rem",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

export const StyledAlert = styled(Alert)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
  boxShadow: theme.shadows[2],
}));

export const LoginForm = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 520,
  marginTop: theme.spacing(1),
  marginLeft: "auto",
  marginRight: "auto",
}));

export const StyledTextField = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  "& .MuiTextField-root": {
    width: "100%",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    backgroundColor: "#fff",
    transition: "all 0.18s ease",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    minHeight: 44,
    border: "1px solid rgba(0,0,0,0.06)",
    "& .MuiOutlinedInput-input": {
      padding: "10px 12px",
      fontSize: "0.95rem",
      color: "#222",
      "&::placeholder": {
        color: "#bfbfbf",
        opacity: 1,
      },
    },
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
    "&.Mui-focused": {
      boxShadow: `0 6px 30px rgba(46,125,50,0.08)`,
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: 2,
        borderColor: "#2e7d32",
      },
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 600,
    color: "#333",
    display: "block",
    fontSize: "0.85rem",
    marginBottom: theme.spacing(1),
    "&.Mui-focused": {
      color: "#2e7d32",
      fontWeight: 700,
    },
  },
  "& .MuiInputBase-input": {
    paddingLeft: theme.spacing(1),
    paddingTop: 0,
    paddingBottom: 0,
    height: 20,
  },
}));

export const ForgotPasswordLink = styled(Typography)(() => ({
  "& a": {
    fontSize: "0.875rem",
    color: "#2e7d32",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.2s ease",
    textAlign: "right",
    "&:hover": {
      color: "#2e7d32",
      textDecoration: "underline",
    },
  },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  height: 44,
  padding: "0 18px",
  borderRadius: 12,
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  background: "#2e7d32",
  color: "#fff",
  transition: "all 0.15s ease",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    background: "#276027",
    boxShadow: "0 6px 18px rgba(39,96,39,0.12)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  "&:disabled": {
    background: theme.palette.grey[400],
    color: theme.palette.grey[600],
    boxShadow: "none",
    transform: "none",
  },
}));

export const SignupLink = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(3),
  "& .MuiTypography-root": {
    color: theme.palette.text.secondary,
    fontSize: "0.9rem",
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      fontWeight: 600,
      transition: "all 0.2s ease",
      "&:hover": {
        color: theme.palette.primary.dark,
        textDecoration: "underline",
      },
    },
  },
}));

export const SocialButton = styled(Button)(() => ({
  height: 44,
  borderRadius: 12,
  textTransform: "none",
  padding: "6px 14px",
  justifyContent: "flex-start",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },
}));
