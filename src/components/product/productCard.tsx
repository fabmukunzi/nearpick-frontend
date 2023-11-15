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
import Link from 'next/link';
import { useRouter } from 'next/router';

type CardProps = {
  product: Product;
  loading: boolean;
};

const ProductCard: FC<CardProps> = ({ product, loading }) => {
  const { Meta } = Card;
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationResult = await getLocationFromCoordinates(
          product.Store.location.coordinates[0],
          product.Store.location.coordinates[1]
        );
        setLocation(locationResult);
      } catch (error: any) {
        console.error('Error fetching location:', error.message);
      }
    };

    fetchLocation();
  }, [product.Store.location.coordinates]);
  const { Title } = Typography;
  const { push } = useRouter();

  return (
    <Card
      key={product.id}
      hoverable
      className="hover:border-primary h-fit w-full md:border-[white] border-primary md:w-64 md:mx-1 mx-6 p-0 mt-10 border"
      size="small"
      loading={loading}
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
            <Descriptions
              column={1}
              className="-mb-4"
            >
              {product.distance && (
                <Descriptions.Item label="Distance">
                  {formatDistance(product.distance)}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Shop" className='line line-clamp-2'>
                {product.Store.name}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                <Tag>{product.Category.name}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                <Tag>{location}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </>
        }
      />
      <div className="flex justify-between items-center mt-6">
        <Title key="price" className="font-bold text-base">
          RWF {product.price}
        </Title>
        <ShoppingFilled className="text-xl hover:text-primary transition border p-1.5 rounded-full cursor-pointer" />
      </div>
    </Card>
  );
};

export default ProductCard;
