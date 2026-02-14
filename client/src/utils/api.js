export const getApiUrl = () => {
    // 1. Manual override via URL (e.g., localhost:3000/?backend=remote)
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('backend') === 'remote') {
            return 'https://suvidha-server-4u66.onrender.com';
        }
    }

    // 2. Environment variable (Priority)
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }

    // 3. Local Development override
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        return 'http://localhost:5000';
    }

    // 4. Default Production Fallback
    return 'https://suvidha-server-4u66.onrender.com';
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
