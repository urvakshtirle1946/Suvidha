const FALLBACK_API_URL = 'https://suvidha-server-4u66.onrender.com';

const isLoopbackUrl = (value) => {
    try {
        const parsed = new URL(value);
        return ['localhost', '127.0.0.1', '::1'].includes(parsed.hostname);
    } catch {
        return false;
    }
};

export const getApiUrl = () => {
    const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

    if (!configuredUrl) {
        return FALLBACK_API_URL;
    }

    if (typeof window !== 'undefined') {
        const isLocalAppHost = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
        if (!isLocalAppHost && isLoopbackUrl(configuredUrl)) {
            return FALLBACK_API_URL;
        }
    }

    return configuredUrl.replace(/\/+$/, '');
};

export const apiFetch = (endpoint, options = {}) => {
  const backendUrl = getApiUrl();
  
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return fetch(`${backendUrl}${endpoint}`, {
    credentials: "include",
    ...options,
    headers
  });
};

export const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('data:') || url.startsWith('http') || url.includes('gradient')) {
        return url;
    }
    const baseUrl = getApiUrl();
    // Ensure no double slashes
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${cleanUrl}`;
};
