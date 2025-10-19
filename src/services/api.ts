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

  async getFacebookAdsOverview(params?: any): Promise<any> {
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