import { Inter } from 'next/font/google';
import { useGetProductsQuery } from '../store/actions/products';
import { Card, Pagination, Spin } from 'antd';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/productCard';
import { getCurrentLocation } from '@/utils/functions/currentLocation';
import { ProductUrlParams } from '@/utils/types/product';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  const [location, setLocation] = useState<ProductUrlParams>({});
  const res = getCurrentLocation();
  useEffect(() => {
    res.then((data) => {
      const { lat, lng } = data as ProductUrlParams;
      setLocation({ lat, lng });
    });
  }, [res]);
  const { data, isLoading } = useGetProductsQuery(location);
  return (
    <div className="h-fit bg-[white] mb-10">
      {isLoading ? (
        <Spin className="flex justify-center my-32" />
      ) : (
        <motion.div className="flex flex-wrap justify-center">
          {data?.data.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              loading={isLoading}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};
export default Home;
