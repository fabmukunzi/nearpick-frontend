import { useEffect, useReducer, useState } from 'react';
import {
  formatDistance,
  getLocationFromCoordinates,
} from '@utils/functions/extractDistance';
import { Product } from '@utils/types/product';
import { Card, Descriptions, Image, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { ShoppingFilled } from '@ant-design/icons';
import { Store } from '../../utils/types/store';
import { useRouter } from 'next/router';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import useGoogleMapsDirections from '@utils/hooks/googleMapsDirection';

type CardProps = {
  shop: Store;
  loading: boolean;
};

const ShopCard: FC<CardProps> = ({ shop, loading }) => {
  const { Meta } = Card;
  const { lat, lng, error: locationError } = useCurrentLocation();
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
  const { Title } = Typography;
  const { push } = useRouter();
  return (
    <Card
      key={shop.id}
      hoverable
      style={{ width: 270, height: 240 }}
      className="ml-10 border-primary h-fit p-0 mt-10 border"
      size="small"
      loading={loading}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        onClick={() => push(`/stores/${shop.id}`)}
      >
        <Image
          src={shop?.Owner.avatar}
          alt="shop image"
          className="object-cover w-72 h-52 -top-10 rounded-md overflow-hidden"
          preview={false}
        />
      </motion.div>
      <Meta
        title={shop.name}
        description={
          <>
            <Descriptions column={1} className="-mb-4">
              {distance && (
                <Descriptions.Item label="Distance">
                  {distance}
                </Descriptions.Item>
              )}
              {/* <Descriptions.Item label="Shop">{shop.name}</Descriptions.Item> */}
              <Descriptions.Item label="Category">
                <Tag>{shop.Owner.name}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                <Tag>{location}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </>
        }
      />
      {/* <div className="flex justify-between items-center mt-6">
        <Title key="price" className="font-bold text-base">
          RWF {shop.price}
        </Title>
        <ShoppingFilled className="text-xl border p-1.5 rounded-full cursor-pointer" />
      </div> */}
    </Card>
  );
};

export default ShopCard;
