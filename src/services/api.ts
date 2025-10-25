import ApiUtils from '../utils/apiUtils';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface VerifyOtpData {
  email: string;
  otp: string;
}

interface UpdateAccountData {
  username?: string;
  applications?: Array<{
    category: string;
    type: string;
    label: string;
    configuration: any;
  }>;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
  errors?: any[];
}

interface FacebookAccount {
  id: string;
  name: string;
  account_id: string;
  currency: string;
  timezone_name: string;
  account_status: number;
  spend_cap?: number;
  balance?: number;
}

interface FacebookInsights {
  impressions?: number;
  clicks?: number;
  spend?: number;
  reach?: number;
  frequency?: number;
  cpc?: number;
  cpm?: number;
  ctr?: number;
  conversions?: number;
  cost_per_conversion?: number;
  actions?: any[];
  action_values?: any[];
  placement_with_impression_share?: string;
  cost_per_action_type?: any[];
  website_ctr?: number;
  website_clicks?: number;
}

interface FacebookCampaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: number;
  lifetime_budget?: number;
  start_time?: string;
  stop_time?: string;
  created_time?: string;
  updated_time?: string;
  platform: 'facebook' | 'instagram' | 'mixed';
  insights?: FacebookInsights;
}

interface FacebookCreative {
  id: string;
  name?: string;
  effective_object_story_id?: string;
  object_story_spec?: any;
  thumbnail_url?: string;
  image_url?: string;
  video_id?: string;
  object_type?: string;
  title?: string;
  body?: string;
  link_url?: string;
  call_to_action?: any;
  video_details?: {
    id: string;
    title?: string;
    description?: string;
    source?: string;
    thumbnails?: any;
    picture?: string;
    permalink_url?: string;
    length?: number;
    created_time?: string;
  };
  image_details?: {
    id: string;
    name?: string;
    permalink_url?: string;
    width?: number;
    height?: number;
    created_time?: string;
  };
}

interface FacebookAd {
  id: string;
  name: string;
  status: string;
  adset_id: string;
  campaign_id: string;
  date_start?: string;
  date_stop?: string;
  platform: 'facebook' | 'instagram' | 'mixed' | 'unknown';
  creative: FacebookCreative;
  insights?: FacebookInsights;
  tracking_specs?: any[];
  targeting?: any;
}

interface FacebookAdsOverviewResponse {
  success: boolean;
  data: {
    account: FacebookAccount;
    campaigns: FacebookCampaign[] | null;
    ads: FacebookAd[] | null;
    errors?: {
      campaigns?: string;
      ads?: string;
    };
  };
  message?: string;
}

export type { FacebookAdsOverviewResponse };

class ApiService {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await ApiUtils.post<AuthResponse>(
      '/auth/login',
      data,
      'login'
    );

    if (response.success && response.token) {
      ApiUtils.setToken(response.token);
    }
    
    return response;
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await ApiUtils.post<AuthResponse>(
      '/auth/signup',
      data,
      'signup'
    );

    if (response.success && response.token) {
      ApiUtils.setToken(response.token);
    }
    
    return response;
  }

  async getGoogleAuthUrl(): Promise<{ success: boolean; authUrl?: string; message?: string }> {
    const response = await ApiUtils.get<any>('/auth/google', undefined, 'get Google auth URL');
    
    if (response.success && response.data?.authUrl) {
      return {
        success: true,
        authUrl: response.data.authUrl
      };
    }
    
    return response;
  }

  async googleLogin(code: string): Promise<AuthResponse> {
    const response = await ApiUtils.post<AuthResponse>(
      '/auth/google/callback',
      { code },
      'Google login'
    );

    if (response.success && response.token) {
      ApiUtils.setToken(response.token);
    }
    
    return response;
  }

  async verifyOtp(data: VerifyOtpData): Promise<AuthResponse> {
    const response = await ApiUtils.post<AuthResponse>(
      '/auth/verify-otp',
      data,
      'verify otp'
    );

    if (response.success && response.token) {
      ApiUtils.setToken(response.token);
    }

    return response;
  }

  async getProfile(): Promise<any> {
    return await ApiUtils.get('/auth/profile', undefined, 'get profile');
  }

  async getAccount(): Promise<any> {
    return await ApiUtils.get('/api/account', undefined, 'get account');
  }

  async updateAccount(data: UpdateAccountData): Promise<any> {
    return await ApiUtils.put('/api/account', data, 'update account');
  }

  logout(): void {
    ApiUtils.logout();
  }

  isAuthenticated(): boolean {
    return ApiUtils.isAuthenticated();
  }

  // Facebook Ads APIs
  async getFacebookAdAccount(): Promise<any> {
    return await ApiUtils.get('/api/facebook-ads/account', undefined, 'get Facebook ad account');
  }

  async getFacebookCampaigns(params?: any): Promise<any> {
    return await ApiUtils.get('/api/facebook-ads/campaigns', params, 'get Facebook campaigns');
  }

  async getFacebookInsights(params?: any): Promise<any> {
    return await ApiUtils.get('/api/facebook-ads/insights', params, 'get Facebook insights');
  }

  async getFacebookAdsOverview(params?: any): Promise<FacebookAdsOverviewResponse> {
    return await ApiUtils.get<FacebookAdsOverviewResponse>('/api/facebook-ads/overview', params, 'get Facebook ads overview');
  }

  async getFacebookCampaignCreatives(campaignId: string, params?: any): Promise<any> {
    return await ApiUtils.get(`/api/facebook-ads/campaigns/${campaignId}/creatives`, params, 'get Facebook campaign creatives');
  }

  // SEO Analysis API
  async analyzeSeo(url: string): Promise<any> {
    return await ApiUtils.makeRequest('/api/seo/analyze?nocaching=true', {
      method: 'POST',
      data: { url },
      timeout: 120000
    }, 'analyze SEO');
  }

  async getAiSuggestions(issues: any[]): Promise<any> {
    return await ApiUtils.makeRequest('/api/seo/ai-suggestions', {
      method: 'POST',
      data: { issues },
      timeout: 60000 
    }, 'get AI suggestions');
  }
}

export const apiService = new ApiService();