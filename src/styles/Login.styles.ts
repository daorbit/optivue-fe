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
  fontWeight: 700,
  color: "#2f855a",
  fontSize: "2rem",
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
    borderRadius: 12,
    backgroundColor: theme.palette.background.paper,
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
    "&.Mui-focused": {
      boxShadow: `0 4px 20px rgba(102, 126, 234, 0.25)`,
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: 2,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
  "& .MuiInputBase-input": {
    paddingLeft: theme.spacing(1),
  },
}));

export const ForgotPasswordLink = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.primary.main,
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.2s ease",
  "&:hover": {
    color: theme.palette.primary.dark,
    textDecoration: "underline",
  },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.75),
  borderRadius: 12,
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)`,
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
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
