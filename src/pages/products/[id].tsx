import { useJsApiLoader } from '@react-google-maps/api';
import React, { useContext } from 'react';
import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { useGetSingleProductQuery } from '@store/actions/products';
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
  LeftCircleOutlined,
  RightCircleOutlined,
  ShopOutlined,
  ShoppingFilled,
} from '@ant-design/icons';
import { useAddToCartMutation } from '@store/actions/cart';
import { useWindowResize } from '@utils/hooks/useWindowResize';
import Head from 'next/head';
import { AppContext } from '@pages/_app';
import useCurrencyConverter from '@utils/hooks/useCurrencyConverter';
import formatNumber from '@utils/functions/formatNumber';

const SingleProduct = () => {
  const { width } = useWindowResize();
  const { Title, Text } = Typography;
  const { lat, lng } = useCurrentLocation();
  const [addToCart, { isLoading: loadCart }] = useAddToCartMutation();
  const { currency, setCurrency } = useContext(AppContext);
  const center1 = React.useMemo(
    () => ({ lat: lat || 0, lng: lng || 0 }),
    [lat, lng]
  );
  const { query } = useRouter();
  const id = Array.isArray(query?.id) ? query.id[0] : query?.id || '';
  const { data, isLoading } = useGetSingleProductQuery({ id });
  const center = React.useMemo(
    () => ({
      lat: data?.product.Store.location.coordinates[0] || 0,
      lng: data?.product.Store.location.coordinates[1] || 0,
    }),
    [data]
  );
  const containerStyle = {
    width: '100%',
    height: width > 720 ? '600px' : '400px',
    borderRadius: '5px',
  };
  const { distance, duration, directionService, isLoaded } =
    useGoogleMapsDirections(center1, center.lat, center.lng);
  const handleAddToCart = async () => {
    const payload = {
      productId: data?.product.id || '',
      productQuantity: 1,
    };
    const res = await addToCart(payload);
    if ('data' in res) {
      notification.success({
        message: res.data.message,
      });
    }
  };
  const { convertedPrice, isLoading: loadCurrency } = useCurrencyConverter({
    price: data?.product.price || 0,
    currency,
  });
  return (
    isLoaded && (
      <div className="min-h-screen px-page">
        <Head>
          <title>Izimart | Products</title>
        </Head>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <div className="flex gap-10 flex-wrap">
              <Card
                size="small"
                className="w-full h-[20rem] md:w-[35rem] md:h-[25rem] bg-[#F5F5F5]"
              >
                <Carousel
                  arrows
                  autoplay
                  prevArrow={<RightCircleOutlined />}
                  nextArrow={<LeftCircleOutlined />}
                  dots={{ className: 'bg-[#DCDCDC] text-primary p-2' }}
                >
                  {data?.product.images.map((image, i) => (
                    <Image
                      src={image}
                      key={i}
                      className="w-[35rem] md:h-[23rem] h-[19rem] object-cover rounded-lg"
                      alt="Product image"
                    />
                  ))}
                </Carousel>
              </Card>
              <div>
                <Tag color={!data?.product.isAvailable ? 'green' : 'red'}>
                  {!data?.product.isAvailable ? 'In stock' : 'Not in stock'}
                </Tag>
                <Title className="font-bold text-2xl mt-page">
                  {data?.product.name}
                </Title>
                <Title className="font-semibold text-2xl">
                {currency} {formatNumber(convertedPrice)}
                </Title>
                <Text className="font-semibold text-lg mr-4">
                  <ShopOutlined className="text-primary text-xl mr-3" />
                  {data?.product.Store.name}
                </Text>
                {data?.product.Categories.map((category) => (
                  <Tag className="text-primary" key={category.id}>
                    {category.name}
                  </Tag>
                ))}
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
                  onClick={handleAddToCart}
                  loading={loadCart}
                >
                  Add to cart
                </Button>
              </div>
            </div>
            <Title className="font-bold my-6">Product Location</Title>
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
    )
  );
};

export default SingleProduct;
