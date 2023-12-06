import { useJsApiLoader } from '@react-google-maps/api';
import React from 'react';
import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { useGetSingleProductQuery } from '@store/actions/products';
import { useRouter } from 'next/router';
import useGoogleMapsDirections from '@utils/hooks/googleMapsDirection';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import { Button, Card, Carousel, Image, Tag, Typography } from 'antd';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  ShopOutlined,
  ShoppingFilled,
} from '@ant-design/icons';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '5px',
};

const SingleProduct = () => {
  const { Title, Text } = Typography;
  const { lat, lng } = useCurrentLocation();
  const center1 = React.useMemo(
    () => ({ lat: lat || 0, lng: lng || 0 }),
    [lat, lng]
  );
  const { query } = useRouter();
  const id = Array.isArray(query?.id) ? query.id[0] : query?.id || '';
  const { data } = useGetSingleProductQuery({ id });
  const center = React.useMemo(
    () => ({
      lat: data?.product.Store.location.coordinates[0] || 0,
      lng: data?.product.Store.location.coordinates[1] || 0,
    }),
    [data]
  );

  const { distance, duration, directionService, isLoaded } =
    useGoogleMapsDirections(center1, center.lat, center.lng);

  return (
    isLoaded && (
      <div className="min-h-screen px-page">
        <div className="flex gap-10">
          <Card size="small" className="w-[35rem] h-[28.5rem] bg-green-300">
            <Carousel
              className=""
              arrows
              autoplay
              prevArrow={<RightCircleOutlined />}
              nextArrow={<LeftCircleOutlined />}
              dots={{ className: 'bg-gray-400 p-2' }}
            >
              {data?.product.images.map((image, i) => (
                <Image
                  src={image}
                  key={i}
                  className="w-[35rem] h-[27rem] object-cover rounded-lg"
                  alt="Product image"
                />
              ))}
            </Carousel>
          </Card>
          <div>
            <Tag color={data?.product.isAvailable ? 'green' : 'red'}>
              {data?.product.isAvailable ? 'In stock' : 'Not in stock'}
            </Tag>
            <Title className="font-bold text-2xl mt-page">
              {data?.product.name}
            </Title>
            <Title className="font-semibold text-2xl">
              RWF {data?.product.price}
            </Title>
            {data?.product.Categories.map((category) => (
              <Tag key={category.id}>{category.name}</Tag>
            ))}
            <Text className="font-semibold text-lg">
              <ShopOutlined className="text-primary text-xl mr-3" />
              {data?.product.Store.name}
            </Text>
            <div className="mt-6 flex gap-4">
              <Text className="font-semibold text-base">
                <EnvironmentOutlined className="text-primary text-xl mr-3" />
                {distance}
              </Text>
              <Text className="font-semibold text-base">
                <ClockCircleOutlined className="text-primary text-lg mr-3" />
                {duration}
              </Text>
            </div>
            <Button
              className="text-white bg-primary my-4"
              icon={<ShoppingFilled />}
            >
              Add to cart
            </Button>
          </div>
        </div>
        <Title className="font-bold my-6">Product Location</Title>
        <Card
          className="border-primary mt-4"
          size="small"
          style={{ width: '100%' }}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{ zoomControl: false,mapTypeControl:false,streetViewControl:false }}
          >
            <Marker position={center} />
            {directionService && (
              <DirectionsRenderer directions={directionService} />
            )}
          </GoogleMap>
        </Card>
      </div>
    )
  );
};

export default SingleProduct;
