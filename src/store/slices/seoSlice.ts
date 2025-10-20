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
  author: string;
  charset: string;
  favicon: string;
  ogSiteName: string;
  ogType: string;
  ogUrl: string;
  twitterCard: string;
  twitterSite: string;
  viewport: string;
  allMetaTags: Array<{ name: string; content: string }>;
}

interface SeoContent {
  h1Count: number;
  h2Count: number;
  h3Count: number;
  imgCount: number;
  linkCount: number;
  wordCount: number;
  hasSchema: boolean;
  contentQuality: number;
  externalLinks: number;
  internalLinks: number;
  readabilityScore: number;
  headingStructure: Array<{ level: number; count: number; texts?: string[] }>;
  images: Array<{
    src: string;
    alt: string;
    title: string;
    width: number | null;
    height: number | null;
    loading: string;
    decoding: string;
    hasAlt: boolean;
  }>;
  keywordDensity: Array<{ word: string; count: number; density: string }>;
  schemaTypes: string[];
  schemas: Array<any>; // You can define a more specific type if needed
}

interface SeoPerformance {
  error?: string;
  scores?: Record<string, any>; // Empty in the data, but keeping flexible
  note?: string;
  overallScore?: number | string;
  metrics?: {
    [key: string]: any;
    firstContentfulPaint?: any;
    speedIndex?: any;
    largestContentfulPaint?: any;
    interactive?: any;
    totalBlockingTime?: any;
    cumulativeLayoutShift?: any;
  };
  // Newer format: separate strategies returned by PageSpeed (desktop/mobile)
  desktop?: {
    overallScore?: number | string;
    metrics?: { [key: string]: any };
  };
  mobile?: {
    overallScore?: number | string;
    metrics?: { [key: string]: any };
  };
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
    if (!response.success) {
      throw new Error(response.message || 'SEO analysis failed');
    }

    const raw = response.data || {};

    // Helper to coerce score-like fields to numbers when possible
    const coerceScores = (scores: any) => {
      if (!scores || typeof scores !== 'object') return {};
      const keys = ['performance', 'accessibility', 'bestPractices', 'seo'];
      const out: any = { ...scores };
      keys.forEach((k) => {
        if (out[k] !== undefined && out[k] !== null) {
          const n = Number(out[k]);
          out[k] = Number.isFinite(n) ? n : out[k];
        }
      });
      return out;
    };

    // Normalize performance object so components can rely on a consistent shape
    const perf: any = raw.performance ? { ...raw.performance } : {};

    // If the API returned a top-level `scores` object (older / alternate shape), move it into performance.scores
    if (raw.scores && !perf.scores) {
      perf.scores = coerceScores(raw.scores);
    }

    // If performance already has scores, ensure numeric coercion
    if (perf.scores) {
      perf.scores = coerceScores(perf.scores);
    }

    // Ensure there is an overallScore available for legacy components. Prefer explicit overallScore,
    // then desktop.overallScore, then the scores.performance value.
    if (perf.overallScore === undefined || perf.overallScore === null) {
      if (perf.desktop && perf.desktop.overallScore !== undefined && perf.desktop.overallScore !== null) {
        perf.overallScore = Number(perf.desktop.overallScore);
      } else if (perf.scores && perf.scores.performance !== undefined && perf.scores.performance !== null) {
        perf.overallScore = Number(perf.scores.performance);
      } else if (raw.scores && raw.scores.performance !== undefined && raw.scores.performance !== null) {
        perf.overallScore = Number(raw.scores.performance);
      }
    }

    const normalized: SeoAnalysis = {
      url: raw.url || '',
      meta: raw.meta || ({} as any),
      performance: perf as SeoPerformance,
      technical: raw.technical || ({} as any),
      content: raw.content || ({} as any),
    };

    return normalized;
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