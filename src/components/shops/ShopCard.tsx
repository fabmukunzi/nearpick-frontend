import { useEffect, useReducer, useState } from 'react';
import { formatDistance, getLocationFromCoordinates } from '@utils/functions/extractDistance';
import { Product } from '@utils/types/product';
import { Card, Descriptions, Image, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { ShoppingFilled } from '@ant-design/icons';
import { Store } from '../../utils/types/store';
import { useRouter } from 'next/router';

type CardProps = {
  shop: Store;
  loading: boolean;
};

const ShopCard: FC<CardProps> = ({ shop, loading }) => {
  const { Meta } = Card;
  const [location, setLocation] = useState<string | null>(null);
  const product = shop;
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationResult = await getLocationFromCoordinates(
          product.location.coordinates[0],
          product.location.coordinates[1]
        );
        setLocation(locationResult);
      } catch (error: any) {
        console.error('Error fetching location:', error.message);
      }
    };

    fetchLocation();
  }, [product]);
  const { Title } = Typography;
  const { push } = useRouter();
  console.log(product);
  return (
    <Card
      key={product.id}
      hoverable
      style={{ width: 270, height: 240 }}
      className="ml-10 border-primary h-fit p-0 mt-10 border"
      size="small"
      loading={loading}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        onClick={() => push(`/stores/${product.id}`)}
      >
        <Image
          src={product?.Owner.avatar}
          alt="product image"
          className="object-cover w-72 h-52 -top-10 rounded-md overflow-hidden"
          preview={false}
        />
      </motion.div>
      <Meta
        title={product.name}
        description={
          <>
            <Descriptions column={1} className="-mb-4">
              {product.distance && (
                <Descriptions.Item label="Distance">
                  {formatDistance(product.distance)}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Shop">{product.name}</Descriptions.Item>
              <Descriptions.Item label="Category">
                <Tag>{product.Owner.name}</Tag>
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
          RWF {product.price}
        </Title>
        <ShoppingFilled className="text-xl border p-1.5 rounded-full cursor-pointer" />
      </div> */}
    </Card>
  );
};

export default ShopCard;
