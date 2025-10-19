import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';

interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonical: string;
  robots: string;
}

interface SeoContent {
  h1Count: number;
  h2Count: number;
  h3Count: number;
  imgCount: number;
  linkCount: number;
  wordCount: number;
  hasSchema: boolean;
}

interface SeoPerformance {
  overallScore: number;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics: {
    firstContentfulPaint: any;
    speedIndex: any;
    largestContentfulPaint: any;
    interactive: any;
    totalBlockingTime: any;
    cumulativeLayoutShift: any;
  };
  note?: string;
  error?: string;
}

interface SeoTechnical {
  statusCode: number;
  contentType: string;
  contentLength: string;
  server: string;
  hasHttps: boolean;
  hasMobileViewport: boolean;
  hasFavicon: boolean;
  hasOpenGraph: boolean;
  hasTwitterCards: boolean;
  hasStructuredData: boolean;
  imageAltCount: number;
  totalImages: number;
  missingAltImages: number;
}

interface SeoAnalysis {
  url: string;
  meta: SeoMeta;
  performance: SeoPerformance;
  technical: SeoTechnical;
  content: SeoContent;
}

interface SeoState {
  analysis: SeoAnalysis | null;
  loading: boolean;
  error: string | null;
}

const initialState: SeoState = {
  analysis: null,
  loading: false,
  error: null,
};

// Async thunk for SEO analysis
export const analyzeSeo = createAsyncThunk(
  'seo/analyzeSeo',
  async (url: string) => {
    const response = await apiService.analyzeSeo(url);
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'SEO analysis failed');
    }
  }
);

const seoSlice = createSlice({
  name: 'seo',
  initialState,
  reducers: {
    clearAnalysis: (state) => {
      state.analysis = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeSeo.fulfilled, (state, action: PayloadAction<SeoAnalysis>) => {
        state.loading = false;
        state.analysis = action.payload;
        state.error = null;
      })
      .addCase(analyzeSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'SEO analysis failed';
      });
  },
});

export const { clearAnalysis, clearError } = seoSlice.actions;
export default seoSlice.reducer;