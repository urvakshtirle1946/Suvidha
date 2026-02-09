export const getApiUrl = () => {
    if (typeof window !== 'undefined') {
        if (window.location.hostname === 'localhost') {
            return 'http://localhost:5000';
        }
    }
    return process.env.NEXT_PUBLIC_API_URL || 'https://suvidha-server-4u66.onrender.com';
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
