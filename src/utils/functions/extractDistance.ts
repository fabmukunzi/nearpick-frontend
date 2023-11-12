export const getLocationFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  const apiKey = 'AIzaSyC63nofXo7TrdUawWh8VManHU2yowVc_Mc';
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const { status, results } = await response.json();

    if (status === 'OK' && results.length > 0) {
      const location: string = results[0].formatted_address;
      console.log(location)
      return location;
    } else {
      throw new Error('No results found');
    }
  } catch (error: any) {
    console.error('Error fetching location:', error.message);
    throw error;
  }
};
