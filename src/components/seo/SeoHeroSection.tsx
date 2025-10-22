import { Box, Typography, Container } from "@mui/material";
import UrlInputSection from "./UrlInputSection";

interface SeoHeroSectionProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  loading: boolean;
  error: string | null;
}

const SeoHeroSection = ({
  url,
  setUrl,
  onAnalyze,
  onClear,
  loading,
  error,
}: SeoHeroSectionProps) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #eef7ee 0%, #dff3df 100%)",
        py: { xs: 6, md: 8},
       }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2.2rem", md: "3rem" },
              lineHeight: 1.05,
              color: "rgba(7, 16, 14, 0.95)",
            }}
          >
            <Box component="span" sx={{ fontWeight: 800 }}>
              SEO Analysis&nbsp;
            </Box>
            <Box component="span" sx={{ color: "#2e7d32" }}>
              Tool
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: 760,
              mx: "auto",
              fontWeight: 400,
              color: "rgba(7, 16, 14, 0.65)",
              fontSize: { xs: "1rem", md: "18px" },
            }}
          >
            Comprehensive SEO analysis to optimize your website's search engine
            performance
          </Typography>
        </Box>

        <UrlInputSection
          url={url}
          setUrl={setUrl}
          onAnalyze={onAnalyze}
          onClear={onClear}
          loading={loading}
          error={error}
        />
      </Container>
    </Box>
  );
};

export default SeoHeroSection;
