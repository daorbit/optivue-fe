import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';

interface User {
  id: string;
  username: string;
  email: string;
  applications?: Array<{
    category: string;
    type: string;
    label: string;
    configuration: any;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  googleAuthUrl: string | null;
  googleLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  googleAuthUrl: null,
  googleLoading: false,
};

// Async thunks
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      if (apiService.isAuthenticated()) {
        const response = await apiService.getAccount();
        if (response.success) {
          return response.user;
        } else {
          apiService.logout();
          return rejectWithValue('Authentication failed');
        }
      }
      return null;
    } catch (error: any) {
      apiService.logout();
      return rejectWithValue(error.message || 'Authentication check failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.login({ email, password });
      if (response.success && response.user) {
        return response.user;
      } else {
        return rejectWithValue(response.message || 'Login failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ username, email, password }: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.signup({ username, email, password });
      if (response.success && response.user) {
        return response.user;
      } else {
        return rejectWithValue(response.message || 'Signup failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await apiService.googleLogin(code);
      if (response.success && response.user) {
        return response.user;
      } else {
        return rejectWithValue(response.message || 'Google login failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Google login failed');
    }
  }
);

export const getGoogleAuthUrl = createAsyncThunk(
  'auth/getGoogleAuthUrl',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getGoogleAuthUrl();
      if (response.success && response.authUrl) {
        return response.authUrl;
      } else {
        return rejectWithValue(response.message || 'Failed to get Google auth URL');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to get Google auth URL');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.verifyOtp({ email, otp });
      if (response.success && response.user && response.token) {
        return response.user;
      } else {
        return rejectWithValue(response.message || 'OTP verification failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'OTP verification failed');
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async () => {
    const response = await apiService.getAccount();
    if (response.success) {
      return response.user;
    } else {
      throw new Error('Failed to refresh user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      apiService.logout();
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.googleAuthUrl = null;
      state.googleLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearGoogleAuthUrl: (state) => {
      state.googleAuthUrl = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Authentication check failed';
      })
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Login failed';
      })
      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Signup failed';
      })
      // verifyOtp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'OTP verification failed';
      })
      // googleLogin
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        state.googleAuthUrl = null;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Google login failed';
      })
      // getGoogleAuthUrl
      .addCase(getGoogleAuthUrl.pending, (state) => {
        state.googleLoading = true;
        state.error = null;
      })
      .addCase(getGoogleAuthUrl.fulfilled, (state, action) => {
        state.googleAuthUrl = action.payload;
        state.googleLoading = false;
        state.error = null;
      })
      .addCase(getGoogleAuthUrl.rejected, (state, action) => {
        state.googleLoading = false;
        state.error = action.payload as string || action.error.message || 'Failed to get Google auth URL';
      })
      // refreshUser
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, setLoading, clearGoogleAuthUrl } = authSlice.actions;
export default authSlice.reducer;