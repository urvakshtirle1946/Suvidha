export const PROVIDER_SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'lowest_price', label: 'Lowest Price' },
  { value: 'highest_rated', label: 'Highest Rated' },
  { value: 'nearest', label: 'Nearest' },
  { value: 'fastest', label: 'Fastest Appointment' },
  { value: 'premium', label: 'Premium Hospitals' },
];

export const getEffectivePrice = (provider) => Number(provider?.discount_price || provider?.price || provider?.min_effective_price || 0);

export const getProviderRating = (provider) => Number(provider?.hospital_rating || provider?.rating || 0);

const getProviderName = (provider) => String(provider?.hospital_name || provider?.name || '').toLowerCase();

const getDistance = (provider) => Number(provider?.distance_km || provider?.distance || Number.POSITIVE_INFINITY);

const getFastestSignal = (provider) => {
  if (provider?.next_available_minutes) return -Number(provider.next_available_minutes);
  if (provider?.slot_capacity) return Number(provider.slot_capacity);
  return 0;
};

const getPremiumScore = (provider) => {
  const rating = getProviderRating(provider);
  const price = getEffectivePrice(provider);
  const hasPremiumText = /premium|super|specialty|multi|advanced|institute|hospital/i.test(
    `${provider?.hospital_name || ''} ${provider?.name || ''} ${provider?.description || ''}`
  );

  return (rating * 100) + Math.min(price / 25, 80) + (hasPremiumText ? 40 : 0);
};

const getRecommendedScore = (provider) => {
  const rating = getProviderRating(provider);
  const listPrice = Number(provider?.price || provider?.min_effective_price || 0);
  const effectivePrice = getEffectivePrice(provider);
  const discountSignal = listPrice > effectivePrice ? Math.min(((listPrice - effectivePrice) / listPrice) * 20, 10) : 0;

  return (rating * 100) + getFastestSignal(provider) + discountSignal - Math.min(effectivePrice / 100, 25);
};

export const compareProviders = (a, b, sortBy = 'recommended') => {
  const priceA = getEffectivePrice(a);
  const priceB = getEffectivePrice(b);
  const ratingA = getProviderRating(a);
  const ratingB = getProviderRating(b);

  switch (sortBy) {
    case 'lowest_price':
      return (priceA - priceB) || (ratingB - ratingA) || getProviderName(a).localeCompare(getProviderName(b));
    case 'highest_rated':
      return (ratingB - ratingA) || (priceA - priceB) || getProviderName(a).localeCompare(getProviderName(b));
    case 'nearest':
      return (getDistance(a) - getDistance(b)) || (ratingB - ratingA) || (priceA - priceB);
    case 'fastest':
      return (getFastestSignal(b) - getFastestSignal(a)) || (ratingB - ratingA) || (priceA - priceB);
    case 'premium':
      return (getPremiumScore(b) - getPremiumScore(a)) || (ratingB - ratingA) || (priceB - priceA);
    case 'recommended':
    default:
      return (getRecommendedScore(b) - getRecommendedScore(a)) || (ratingB - ratingA) || (priceA - priceB);
  }
};

export const sortProviders = (providers, sortBy = 'recommended') => [...providers].sort((a, b) => compareProviders(a, b, sortBy));
