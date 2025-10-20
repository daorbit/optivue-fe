import { Alert, Typography } from "@mui/material";

interface SeoErrorAlertProps {
  error: string | null;
}

const SeoErrorAlert = ({ error }: SeoErrorAlertProps) => {
  if (!error) return null;

  return (
    <Alert
      severity="error"
      sx={{
        mb: 4,
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        Analysis Failed
      </Typography>
      {error}
    </Alert>
  );
};

export default SeoErrorAlert;