import { useEffect, useState } from 'react';

interface CurrentLocation {
  lat: number | null;
  lng: number | null;
  error: string | null;
}

const useCurrentLocation = (): CurrentLocation => {
  const [location, setLocation] = useState<CurrentLocation>({
    lat: null,
    lng: null,
    error: null,
  });

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              error: null,
            });
          },
          (error) => {
            setLocation({
              lat: null,
              lng: null,
              error: `Error getting current location: ${error.message}`,
            });
          }
        );
      } else {
        setLocation({
          lat: null,
          lng: null,
          error: 'Geolocation is not supported by your browser.',
        });
      }
    };

    getCurrentLocation();
  }, []);

  return location;
};

export default useCurrentLocation;
