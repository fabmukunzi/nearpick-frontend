import { useSearchParams } from 'next/navigation';
// AIzaSyC63nofXo7TrdUawWh8VManHU2yowVc_Mc

import React, { useState } from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useGetSingleProductQuery } from '@store/actions/products';
import { useRouter } from 'next/router';
import useGoogleMapsDirections from '@utils/hooks/googleMapsDirection';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -1.947,
  lng: 30.1,
};
const center1 = {
  lat: -1.747,
  lng: 31.1,
};
const SingleProduct = () => {
  const { distance, duration, directionService, isLoaded } =
    useGoogleMapsDirections(center1, center.lat, center.lng);

  // const { query } = useRouter();
  // const { id } = query;
  // console.log(id);
  // const { data } = useGetSingleProductQuery({ id });
  // console.log(data);
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.PUBLIC_NEXT_API_KEY,
  // });
  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      <Marker position={center} />
      {directionService && <DirectionsRenderer directions={directionService} />}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default SingleProduct;
