import { useEffect, useState } from 'react';
import {
  Card,
  Descriptions,
  Image,
  Tag,
  Typography,
  notification,
  Spin,
} from 'antd';
import { motion } from 'framer-motion';
import {
  CarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  NodeIndexOutlined,
  ShopOutlined,
  ShoppingFilled,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getLocationFromCoordinates } from '@utils/functions/extractDistance';
import { Product } from '@utils/types/product';
import useGoogleMapsDirections from '@utils/hooks/googleMapsDirection';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import { useAddToCartMutation } from '@store/actions/cart';
import formatNumber from '@utils/functions/formatNumber';

type CardProps = {
  product: Product;
  loading: boolean;
  actions?: Array<React.ReactNode>;
};

const ProductCard: React.FC<CardProps> = ({ product, loading, actions }) => {
  const { Meta } = Card;
  const { Text } = Typography;
  const [location, setLocation] = useState<string | null>(null);
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const { lat, lng, error: locationError } = useCurrentLocation();
  const currentLocation = {
    lat: lat || 0,
    lng: lng || 0,
  };
  const { Title } = Typography;
  const { push } = useRouter();
  const { distance, duration } = useGoogleMapsDirections(
    currentLocation,
    product.Store?.location.coordinates[0],
    product.Store?.location.coordinates[1]
  );

  const handleAddToCart = async () => {
    try {
      const payload = {
        productId: product.id,
        productQuantity: 1,
      };
      const res = await addToCart(payload);

      if ('data' in res) {
        notification.success({
          message: res.data.message,
        });
      }
    } catch (error: any) {
      console.error('Error adding product to cart:', error.message);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationResult = await getLocationFromCoordinates(
          product.Store?.location.coordinates[0],
          product.Store?.location.coordinates[1]
        );
        setLocation(locationResult);
      } catch (error: any) {
        console.error('Error fetching location:', error.message);
      }
    };
    fetchLocation();
  }, [product.Store?.location.coordinates]);

  return (
    <Card
      key={product.id}
      actions={actions || []}
      className="h-fit w-[90%] md:w-[15.22rem] mx-auto md:mx-1 p-0 mt-10"
      size="small"
      loading={distance ? false : true}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        onClick={() => push(`/products/${product.id}`)}
      >
        <Image
          src={product.images[1]}
          alt="product image"
          className="object-cover w-[30rem] h-52 -top-10 rounded-md overflow-hidden"
          preview={false}
        />
      </motion.div>
      <Meta
        className="font-semibold"
        description={
          <>
            <Link href={`/products/${product.id}`}>
              <Title className="font-bold text-base">{product.name}</Title>
            </Link>
            <div className="flex justify-between">
              <Text className="font-semibold text-sm">
                <NodeIndexOutlined className="text-primary text-base mr-3" />
                {distance}
              </Text>
              <Text className="font-semibold text-sm">
                <CarOutlined className="text-primary text-base mr-3" />
                {duration}
              </Text>
            </div>
            <div className="my-2">
              <ShopOutlined className="text-base text-primary mr-3" />
              {product.Store?.name}
            </div>
            <div className="flex">
              <EnvironmentOutlined className="text-primary text-base mr-3" />
              <Tag style={{ fontSize: '12.5px' }}>{location}</Tag>
            </div>
          </>
        }
      />
      {!actions && (
        <div className="flex justify-between items-center mt-6">
          <Title key="price" className="font-bold text-base">
            RWF {formatNumber(product.price)}
          </Title>
          {isLoading ? (
            <Spin />
          ) : (
            <ShoppingFilled
              onClick={handleAddToCart}
              className="text-xl hover:text-primary transition border p-1.5 rounded-full cursor-pointer"
            />
          )}
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
