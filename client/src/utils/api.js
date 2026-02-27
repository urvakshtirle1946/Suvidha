export const getApiUrl = () => {
    // 1. Environment variable (Priority) - Next.js will inject this on both server and client
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }

    // 2. Default Fallback
    // For stable hydration, we assume the remote server unless the env var dictates otherwise.
    // However, we now use Next.js rewrites to proxy requests, so we just hit the relative path!
    return ''; // Empty string so fetch('/api/...') hits the current origin natively and gets rewritten by next.config.mjs
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
