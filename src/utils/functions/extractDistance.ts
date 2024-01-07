export const getLocationFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const { status, results } = await response.json();

    if (status === 'OK' && results.length > 0) {
      const location: string = results[0].formatted_address;
      return location;
    } else {
      throw new Error('No results found');
    }
  } catch (error: any) {
    console.error('Error fetching location:', error.message);
    throw error;
  }
};

export const formatDistance = (distance: number) => {
  if (distance >= 1000) {
    const kilometers = distance / 1000;
    return `${kilometers.toFixed(2)} Km`;
  } else if (distance >= 1) {
    return `${distance.toFixed(2)} m`;
  } else if (distance >= 0.01) {
    const centimeters = distance * 100;
    return `${centimeters.toFixed(2)} cm`;
  } else {
    const millimeters = distance * 1000;
    return `${millimeters.toFixed(2)} mm`;
  }
};
