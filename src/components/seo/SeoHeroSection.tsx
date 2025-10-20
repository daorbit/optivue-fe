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

const SeoHeroSection = ({ url, setUrl, onAnalyze, onClear, loading, error }: SeoHeroSectionProps) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 6,
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            SEO Analysis Tool
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 400
            }}
          >
            Comprehensive SEO analysis to optimize your website's search engine performance
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