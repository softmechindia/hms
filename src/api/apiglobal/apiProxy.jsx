import axios from "axios";
const API_BASE_URL = "/api";
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global Token Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token.startsWith("Bearer ") 
        ? token 
        : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export async function proxyApiRequest(endpoint, method = 'POST', body = null) {
  try {
    const response = await API({
      url: endpoint,
      method: method,
      data: body,
    });

    return {
      status: true,
      message: response.data?.message || "Success",
      data: response.data?.data || response.data,
    };
  } catch (err) {
    console.error("Axios Error Details:", err);
    return {
      status: false,
      message: err.response?.data?.message || "Request failed",
      error: String(err),
    };
  }
}

export default API; 