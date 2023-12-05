import { useState, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

interface GoogleMapsDirections {
  distance: string | undefined;
  duration: string | undefined;
  directionService: any;
  isLoaded: boolean;
}

const useGoogleMapsDirections = (
  center: { lat: number; lng: number },
  lat: number,
  lng: number
): GoogleMapsDirections => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY || '',
  });
  const [distance, setDistance] = useState<string | undefined>(undefined);
  const [duration, setDuration] = useState<string | undefined>(undefined);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const calculateRoute = async () => {
    if (!isLoaded) {
      return;
    }
    const directionService = new window.google.maps.DirectionsService();
    const result = await directionService.route({
      origin: center,
      destination: { lat, lng },
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDistance(result.routes[0].legs[0].distance?.text);
    setDuration(result.routes[0].legs[0].duration?.text);
    setDirectionsResponse(result);
  };
  useEffect(() => {
    calculateRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, lat, lng, isLoaded]);
  return { distance, duration, directionService: directionsResponse, isLoaded };
};
export default useGoogleMapsDirections;
