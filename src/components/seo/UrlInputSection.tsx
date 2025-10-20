import {
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
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            onKeyPress={(e) => e.key === 'Enter' && onAnalyze()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: '#fff',
                '& fieldset': {
                  borderColor: '#e9ecef',
                },
                '&:hover fieldset': {
                  borderColor: '#007bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                  borderWidth: '2px',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '12px 16px',
                fontSize: '16px',
              },
            }}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={onAnalyze}
            disabled={loading || !url.trim()}
            startIcon={<Search size={14}/>}
            sx={{
              borderRadius: '25px',
              padding: '10px 16px',
              fontSize: '14px',
              textTransform: 'none',
              backgroundColor: '#007bff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
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
            sx={{
              borderRadius: '25px',
              padding: '10px 16px',
              fontSize: '14px',
              textTransform: 'none',
              borderColor: '#6c757d',
              color: '#6c757d',
              '&:hover': {
                borderColor: '#5a6268',
                backgroundColor: '#f8f9fa',
              },
            }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>

 
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