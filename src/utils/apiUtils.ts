import axios from 'axios';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  timeout?: number;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: any[];
}

class ApiUtils {
  private static axiosInstance: any;

  static {
    // Initialize axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'https://optivue-be.vercel.app',
      timeout: 30000, // 30 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for global error handling
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        // Auto-logout on 401 errors
        if (error.response?.status === 401) {
          this.clearToken();
        }
        return Promise.reject(error);
      }
    );
  }

  private static getToken(): string | null {
    return localStorage.getItem('token');
  }

  private static clearToken(): void {
    localStorage.removeItem('token');
  }

  private static handleAxiosError(error: any, operation: string): ApiErrorResponse {
    console.error(`${operation} error:`, error);

    // Network error (no response received)
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          message: 'Request timeout. Please try again.',
        };
      }
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }

    // HTTP error response
    const status = error.response.status;
    switch (status) {
      case 400:
        return {
          success: false,
          message: 'Invalid request data. Please check your information.',
        };
      case 401:
        return {
          success: false,
          message: operation.includes('login')
            ? 'Invalid email or password'
            : 'Session expired. Please login again.',
        };
      case 403:
        return {
          success: false,
          message: 'Access denied. You do not have permission to perform this action.',
        };
      case 404:
        return {
          success: false,
          message: 'Requested resource not found.',
        };
      case 409:
        return {
          success: false,
          message: 'Email already exists. Please use a different email.',
        };
      case 422:
        return {
          success: false,
          message: 'Validation error. Please check your input data.',
        };
      case 429:
        return {
          success: false,
          message: 'Too many requests. Please wait a moment and try again.',
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          success: false,
          message: 'Server error. Please try again later.',
        };
      default:
        return {
          success: false,
          message: `Request failed with status ${status}`,
        };
    }
  }

  /**
   * Makes an API request using axios
   * @param url - The API endpoint URL (relative to base URL)
   * @param options - Request options
   * @param operation - Description of the operation for error logging
   * @returns Promise with the response data or error response
   */
  static async makeRequest<T = any>(
    url: string,
    options: ApiRequestOptions = {},
    operation: string = 'API request'
  ): Promise<T> {
    try {
      const config: any = {
        url,
        method: options.method || 'GET',
        data: options.data,
        params: options.params,
        headers: options.headers,
        timeout: options.timeout,
      };

      const response = await this.axiosInstance.request(config);
      return response.data;
    } catch (error) {
      const axiosError = error as any;
      const errorResponse = this.handleAxiosError(axiosError, operation);

      // For auth-related operations, return the error response instead of throwing
      if (operation.includes('login') || operation.includes('signup')) {
        return errorResponse as T;
      }

      // For other operations, throw the error to be caught by the calling code
      throw new Error(errorResponse.message);
    }
  }

  /**
   * Makes a GET request
   */
  static async get<T = any>(
    url: string,
    params?: any,
    operation: string = 'GET request'
  ): Promise<T> {
    return this.makeRequest<T>(url, { method: 'GET', params }, operation);
  }

  /**
   * Makes a POST request
   */
  static async post<T = any>(
    url: string,
    data?: any,
    operation: string = 'POST request'
  ): Promise<T> {
    return this.makeRequest<T>(url, { method: 'POST', data }, operation);
  }

  /**
   * Makes a PUT request
   */
  static async put<T = any>(
    url: string,
    data?: any,
    operation: string = 'PUT request'
  ): Promise<T> {
    return this.makeRequest<T>(url, { method: 'PUT', data }, operation);
  }

  /**
   * Makes a DELETE request
   */
  static async delete<T = any>(
    url: string,
    operation: string = 'DELETE request'
  ): Promise<T> {
    return this.makeRequest<T>(url, { method: 'DELETE' }, operation);
  }

  /**
   * Utility method to check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Utility method to logout user
   */
  static logout(): void {
    this.clearToken();
  }

  /**
   * Utility method to set token
   */
  static setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Get the axios instance for advanced usage
   */
  static getAxiosInstance(): any {
    return this.axiosInstance;
  }
}

export default ApiUtils;