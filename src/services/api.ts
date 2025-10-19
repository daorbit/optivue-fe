const API_BASE_URL = 'https://optivue-be.vercel.app';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
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
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success && result.token) {
      localStorage.setItem('token', result.token);
    }
    return result;
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success && result.token) {
      localStorage.setItem('token', result.token);
    }
    return result;
  }

  async getProfile(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  async getAccount(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/account`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  async updateAccount(data: UpdateAccountData): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/account`, {
      method: 'PUT',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Facebook Ads APIs
  async getFacebookAdAccount(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/facebook-ads/account`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  async getFacebookCampaigns(params?: any): Promise<any> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetch(`${API_BASE_URL}/api/facebook-ads/campaigns${queryString}`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  async getFacebookInsights(params?: any): Promise<any> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetch(`${API_BASE_URL}/api/facebook-ads/insights${queryString}`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  async getFacebookAdsOverview(params?: any): Promise<FacebookAdsOverviewResponse> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetch(`${API_BASE_URL}/api/facebook-ads/overview${queryString}`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  async getFacebookCampaignCreatives(campaignId: string, params?: any): Promise<any> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetch(`${API_BASE_URL}/api/facebook-ads/campaigns/${campaignId}/creatives${queryString}`, {
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }
}

export const apiService = new ApiService();