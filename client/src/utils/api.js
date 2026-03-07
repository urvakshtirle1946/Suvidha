const FALLBACK_API_URLS = [
    'https://suvidha-server.onrender.com',
    'https://suvidha-server-4u66.onrender.com'
];

const isLoopbackUrl = (value) => {
    try {
        const parsed = new URL(value);
        return ['localhost', '127.0.0.1', '::1'].includes(parsed.hostname);
    } catch {
        return false;
    }
};

const normalizeApiUrl = (value) => value.replace(/\/+$/, '');

const dedupeUrls = (urls) => {
    const seen = new Set();
    const unique = [];

    for (const url of urls) {
        if (!url) continue;
        const normalized = normalizeApiUrl(url);
        if (!seen.has(normalized)) {
            seen.add(normalized);
            unique.push(normalized);
        }
    }

    return unique;
};

export const getApiUrl = () => {
    const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

    if (!configuredUrl) {
        return normalizeApiUrl(FALLBACK_API_URLS[0]);
    }

    if (typeof window !== 'undefined') {
        const isLocalAppHost = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
        if (!isLocalAppHost && isLoopbackUrl(configuredUrl)) {
            return normalizeApiUrl(FALLBACK_API_URLS[0]);
        }
    }

    return normalizeApiUrl(configuredUrl);
};

const buildCandidateUrls = (baseUrl) => {
    if (isLoopbackUrl(baseUrl)) {
        return dedupeUrls([baseUrl, ...FALLBACK_API_URLS]);
    }

    return dedupeUrls([baseUrl, ...FALLBACK_API_URLS]);
};

const fetchWithFallback = async (baseUrl, endpoint, options = {}) => {
    const candidates = buildCandidateUrls(baseUrl);
    let lastError = null;

    for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];

        try {
            const response = await fetch(`${candidate}${endpoint}`, options);

            const shouldTryNext =
                response.status === 404 &&
                endpoint.startsWith('/api/') &&
                i < candidates.length - 1;

            if (!shouldTryNext) {
                return response;
            }
        } catch (error) {
            lastError = error;
            if (i === candidates.length - 1) {
                throw error;
            }
        }
    }

    if (lastError) {
        throw lastError;
    }

    return fetch(`${candidates[0]}${endpoint}`, options);
};

export const apiFetch = async (endpoint, options = {}) => {
    const backendUrl = getApiUrl();

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return fetchWithFallback(backendUrl, endpoint, {
        credentials: 'include',
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
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${cleanUrl}`;
};
