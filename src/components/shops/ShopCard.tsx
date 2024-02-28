import { useEffect, useReducer, useState } from 'react';
import {
  formatDistance,
  getLocationFromCoordinates,
} from '@utils/functions/extractDistance';
import { Card, Image, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import { FC } from 'react';
import {
  CarOutlined,
  EnvironmentOutlined,
  NodeIndexOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Store } from '../../utils/types/store';
import { useRouter } from 'next/router';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import useGoogleMapsDirections from '@utils/hooks/googleMapsDirection';
import Link from 'next/link';

type CardProps = {
  shop: Store;
  loading: boolean;
  actions?: Array<React.ReactNode>;
};

const ShopCard: FC<CardProps> = ({ shop, loading, actions }) => {
  const { Meta } = Card;
  const { lat, lng } = useCurrentLocation();
  const currentLocation = {
    lat: lat || 0,
    lng: lng || 0,
  };
  const { distance, duration } = useGoogleMapsDirections(
    currentLocation,
    shop.location.coordinates[0],
    shop.location.coordinates[1]
  );
  const [location, setLocation] = useState<string | null>(null);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationResult = await getLocationFromCoordinates(
          shop.location.coordinates[0],
          shop.location.coordinates[1]
        );
        setLocation(locationResult);
      } catch (error: any) {
        console.error('Error fetching location:', error.message);
      }
    };

    fetchLocation();
  }, [shop]);
  const { Title, Text } = Typography;
  const { push } = useRouter();
  return (
    <Card
      key={shop.id}
      style={{ width: 270, height: 240 }}
      className="h-fit w-[90%] md:w-[15.22rem] mx-auto md:mx-1 p-0 mt-10"
      size="small"
      loading={loading}
      actions={actions || []}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        onClick={() => push(`/shops/${shop.id}`)}
      >
        <Image
          src={shop?.Owner.avatar}
          alt="shop image"
          className="object-cover w-72 h-52 -top-10 rounded-md overflow-hidden"
          preview={false}
        />
      </motion.div>
      <Meta
        className="font-semibold"
        description={
          <>
            <Link href={`/shops/${shop.id}`}>
              <Title className="font-bold text-base">{shop.name}</Title>
            </Link>
            {distance && (
              <div className="flex justify-between my-4">
                <Text className="font-semibold text-sm">
                  <NodeIndexOutlined className="text-primary text-base mr-3" />
                  {distance}
                </Text>
                <Text className="font-semibold text-sm">
                  <CarOutlined className="text-primary text-base mr-3" />
                  {duration}
                </Text>
              </div>
            )}
            {/* <div className="my-2">
              <ShopOutlined className="text-base text-primary mr-3" />
              {shop.name}
            </div> */}
            {distance && (
              <div className="flex">
                <EnvironmentOutlined className="text-primary text-base mr-3" />
                <Tag style={{ fontSize: '12.5px' }}>{location}</Tag>
              </div>
            )}
          </>
        }
      />
    </Card>
  );
};

export default ShopCard;
