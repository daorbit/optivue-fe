import { Grid, TextField, Button } from "@mui/material";
import { Search } from "lucide-react";

interface UrlInputSectionProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  loading: boolean;
  error?: string | null;
}

const UrlInputSection = ({
  url,
  setUrl,
  onAnalyze,
  // onClear,
  loading,
}: UrlInputSectionProps) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 3 }}
      >
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            onKeyPress={(e) => e.key === "Enter" && onAnalyze()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 6px 18px rgba(46,125,50,0.06)",
                "& fieldset": {
                  borderColor: "#eef2f0",
                },
                "&:hover fieldset": {
                  borderColor: "#cfe9d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2e7d32",
                  borderWidth: "2px",
                },
                minHeight: "52px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "12px 16px",
                fontSize: "16px",
                "&::placeholder": {
                  color: "#bfc9c1",
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={onAnalyze}
            disabled={loading || !url.trim()}
            startIcon={<Search size={16} color="#fff" />}
            sx={{
              borderRadius: "10px",
              padding: "11px 18px",
              fontSize: "15px",
              textTransform: "none",
              backgroundColor: "#2e7d32",
              color: "#fff",
              boxShadow: "0 6px 18px rgba(46,125,50,0.15)",
              "&:hover": {
                backgroundColor: "#245e25",
              },
              "&:disabled": {
                backgroundColor: "#a5d6a7",
                color: "#ffffff",
                boxShadow: "none",
                "&:hover": {
                  cursor: "not-allowed",
                },
              },
              minHeight: "48px",
              fontWeight: 700,
            }}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UrlInputSection;
