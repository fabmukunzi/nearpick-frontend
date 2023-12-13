import React, { useState } from 'react';
import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import useGoogleMapsDirections from '@utils/hooks/googleMapsDirection';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import {
  Button,
  Card,
  Carousel,
  Image,
  Skeleton,
  Tag,
  Typography,
  notification,
} from 'antd';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { useAddToCartMutation } from '@store/actions/cart';
import {
  useGetShopProductsQuery,
  useGetSingleShopQuery,
} from '@store/actions/shops';
import ProductCard from '@components/product/productCard';
import { motion } from 'framer-motion';
import { Product } from '@utils/types/product';

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
  const { data, isLoading } = useGetSingleShopQuery({ id });
  const [isProducts, setIsProducts] = useState(false);
  const { data: shopProdcuts, isLoading: loadProducts } =
    useGetShopProductsQuery({ id });
  const center = React.useMemo(
    () => ({
      lat: data?.store.location.coordinates[0] || 0,
      lng: data?.store.location.coordinates[1] || 0,
    }),
    [data]
  );

  const { distance, duration, directionService, isLoaded } =
    useGoogleMapsDirections(center1, center.lat, center.lng);
  return (
    isLoaded && (
      <div>
        {isProducts ? (
          <motion.div className="grid md:grid-cols-5 grid-cols-1 justify-center">
            {shopProdcuts?.products.rows.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                loading={loadProducts}
              />
            ))}
          </motion.div>
        ) : (
          <div className="min-h-screen px-page">
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <Title className="font-bold my-6">
                    {data?.store.name} Location
                  </Title>
                  <Button
                    className="text-white bg-primary my-4"
                    icon={<ExportOutlined />}
                    onClick={() => setIsProducts(true)}
                  >
                    View Products
                  </Button>
                </div>
                <div className="mt-6 flex gap-4">
                  <Text className="font-semibold text-lg">
                    <EnvironmentOutlined className="text-primary text-xl mr-3" />
                    {distance}
                  </Text>
                  <Text className="font-semibold text-lg">
                    <ClockCircleOutlined className="text-primary text-lg mr-3" />
                    {duration}
                  </Text>
                </div>
              </>
            )}
            <Card
              loading={isLoading}
              className="mt-4"
              size="small"
              style={{ width: '100%' }}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                options={{
                  zoomControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
              >
                <Marker position={center} />
                {directionService && (
                  <DirectionsRenderer directions={directionService} />
                )}
              </GoogleMap>
            </Card>
          </div>
        )}
      </div>
    )
  );
};

export default SingleProduct;
