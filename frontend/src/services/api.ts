const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://91.99.193.156:3001/api";

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data: APIResponse<T> = await response.json();

    if (!data.success) {
      throw new Error(data.error || "API request failed");
    }

    return data.data as T;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
        credentials: 'include',
        mode: 'cors',
        ...options,
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: APIResponse = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("authToken", data.data.token);
    return data.data;
  }

  async register(name: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data: APIResponse = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Registration failed");
    }

    localStorage.setItem("authToken", data.data.token);
    return data.data;
  }

  async logout() {
    try {
      await this.request("/auth/logout", { method: "POST" });
    } finally {
      localStorage.removeItem("authToken");
    }
  }

  // User endpoints
  async getUserProfile() {
    return this.request("/user/profile");
  }

  async updateUserProfile(profileData: any) {
    return this.request("/user/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  async getDashboardData() {
    return this.request("/user/dashboard");
  }

  async getUserAchievements(category?: string) {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    return this.request(`/user/achievements?${params.toString()}`);
  }

  async getStudyStats() {
    return this.request("/user/study-stats");
  }

  // Course endpoints
  async getAllCourses(filters?: {
    category?: string;
    level?: string;
    search?: string;
    sort?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.level) params.append("level", filters.level);
    if (filters?.search) params.append("search", filters.search);
    if (filters?.sort) params.append("sort", filters.sort);

    return this.request(`/courses?${params.toString()}`);
  }

  async getCourse(id: string) {
    return this.request(`/courses/${id}`);
  }

  async getEnrolledCourses(filters?: { filter?: string; sort?: string }) {
    const params = new URLSearchParams();
    if (filters?.filter) params.append("filter", filters.filter);
    if (filters?.sort) params.append("sort", filters.sort);

    return this.request(`/courses/enrolled/me?${params.toString()}`);
  }

  async enrollInCourse(courseId: string) {
    return this.request(`/courses/${courseId}/enroll`, {
      method: "POST",
    });
  }

  async unenrollFromCourse(courseId: string) {
    return this.request(`/courses/${courseId}/unenroll`, {
      method: "DELETE",
    });
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL.replace("/api", "")}/health`);
    return response.json();
  }

  // Utility method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem("authToken");
  }
}

export const apiService = new ApiService();
export default apiService;
