import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';

interface FacebookAdsData {
  campaigns: any[] | null;
  ads: any[] | null;
  account: any;
  errors?: {
    campaigns?: string;
    ads?: string;
  };
}

interface FacebookAdsState {
  data: FacebookAdsData | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: FacebookAdsState = {
  data: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunk for fetching Facebook Ads data
export const fetchFacebookAdsData = createAsyncThunk(
  'facebookAds/fetchData',
  async (params: { date_preset?: string; status?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getFacebookAdsOverview(params);
      if (response.success) {
        return {
          data: response.data,
          timestamp: Date.now(),
        };
      } else {
        return rejectWithValue(response.message || 'Failed to fetch data');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch Facebook Ads data');
    }
  }
);

// Async thunk for syncing data (force refresh)
export const syncFacebookAdsData = createAsyncThunk(
  'facebookAds/syncData',
  async (params: { date_preset?: string; status?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getFacebookAdsOverview(params);
      if (response.success) {
        return {
          data: response.data,
          timestamp: Date.now(),
        };
      } else {
        return rejectWithValue(response.message || 'Failed to sync data');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to sync Facebook Ads data');
    }
  }
);

const facebookAdsSlice = createSlice({
  name: 'facebookAds',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = null;
      state.error = null;
      state.lastFetched = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch data cases
      .addCase(fetchFacebookAdsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacebookAdsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.lastFetched = action.payload.timestamp;
        state.error = null;
      })
      .addCase(fetchFacebookAdsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Sync data cases (same as fetch but can be used for manual refresh)
      .addCase(syncFacebookAdsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncFacebookAdsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.lastFetched = action.payload.timestamp;
        state.error = null;
      })
      .addCase(syncFacebookAdsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearData, setLoading } = facebookAdsSlice.actions;

// Selectors
export const selectFacebookAdsData = (state: any) => state.facebookAds.data;
export const selectFacebookAdsLoading = (state: any) => state.facebookAds.loading;
export const selectFacebookAdsError = (state: any) => state.facebookAds.error;
export const selectFacebookAdsLastFetched = (state: any) => state.facebookAds.lastFetched;

export default facebookAdsSlice.reducer;