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
import { Store } from '@utils/types/store';
import Head from 'next/head';

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
    useGetShopProductsQuery({ id }, { skip: !id || !isProducts });
  const center = React.useMemo(
    () => ({
      lat: data?.store.location.coordinates[0] || 0,
      lng: data?.store.location.coordinates[1] || 0,
    }),
    [data]
  );
  console.log(center);
  const { distance, duration, directionService, isLoaded } =
    useGoogleMapsDirections(center1, center.lat, center.lng);
  return (
    isLoaded && (
      <div>
        <Head>
          <title>Izimart | Shops</title>
        </Head>
        {isProducts ? (
          <motion.div className="grid md:grid-cols-5 grid-cols-1 justify-center">
            {shopProdcuts?.products.rows.map((product: Product) => {
              let newProduct: Product = {
                ...product,
                Store: data?.store as Store,
              };
              return (
                <ProductCard
                  key={product.id}
                  product={newProduct}
                  loading={loadProducts}
                />
              );
            })}
          </motion.div>
        ) : (
          <div className="min-h-screen px-page">
            {isLoading || loadProducts ? (
              <Skeleton />
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <Title className="font-bold my-6 xxs:text-lg md:text-4xl">
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
              loading={isLoading || loadProducts}
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
