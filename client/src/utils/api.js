export const getApiUrl = () => {
    // 1. Environment variable (Priority) - Next.js will inject this on both server and client
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }

    // 2. Default Fallback
    // For stable hydration, we assume the remote server unless the env var dictates otherwise
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
