import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  LinearProgress,
  Alert,
} from '@mui/material';
import { Search } from 'lucide-react';

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
  onClear,
  loading,
  error,
}: UrlInputSectionProps) => {
  return (
    <>
      {/* URL Input Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Enter URL to analyze"
                variant="outlined"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                onKeyPress={(e) => e.key === 'Enter' && onAnalyze()}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={onAnalyze}
                disabled={loading || !url.trim()}
                startIcon={<Search />}
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={onClear}
                disabled={loading}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <LinearProgress />
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default UrlInputSection;