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
        // Do not use fallback URLs in local development, so if the local server is down, we see the real error.
        return dedupeUrls([baseUrl]);
    }

    return dedupeUrls([baseUrl, ...FALLBACK_API_URLS]);
};

const FETCH_TIMEOUT_MS = 10000; // 10 seconds per candidate

const fetchWithFallback = async (baseUrl, endpoint, options = {}) => {
    const candidates = buildCandidateUrls(baseUrl);
    let lastError = null;

    for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

        try {
            const response = await fetch(`${candidate}${endpoint}`, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            const shouldTryNext =
                response.status === 404 &&
                endpoint.startsWith('/api/') &&
                i < candidates.length - 1;

            if (!shouldTryNext) {
                return response;
            }
        } catch (error) {
            clearTimeout(timeoutId);
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
