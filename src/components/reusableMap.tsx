import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { notification } from 'antd';
import React, { FC, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: 10,
};

interface IMapProps {
  coords: {
    lat: number;
    lng: number;
  };
  onLocationSelect?: (coords: { lat: number; lng: number }) => void;
}

const ReusableMap: FC<IMapProps> = ({ coords, onLocationSelect }) => {
  const [clickedCoords, setClickedCoords] = useState({});
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
  });
  const handleMapClick = async (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setClickedCoords({ lat: lat, lng: lng });
    if (onLocationSelect) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_M_API_KEY}`
        );
        const data = await response.json();
        const locationInfo = data.results[0];
        const formattedAddress =
          locationInfo?.formatted_address || 'Unknown Address';
        onLocationSelect({
          lat: lat,
          lng: lng,
        });
      } catch (error) {
        notification.error({
          message: 'Something went wrong',
        });
      }
    }
  };

  return (
    isLoaded && (
      <GoogleMap
        onClick={handleMapClick}
        mapContainerStyle={containerStyle}
        center={coords}
        zoom={12}
      >
        {!onLocationSelect && <MarkerF position={coords} />}
        {onLocationSelect && clickedCoords && (
          <MarkerF position={clickedCoords as google.maps.LatLngLiteral} />
        )}
      </GoogleMap>
    )
  );
};

export default React.memo(ReusableMap);
