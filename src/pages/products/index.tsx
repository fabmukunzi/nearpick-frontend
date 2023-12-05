import { useGetProductsQuery } from '../../store/actions/products';
import { Spin } from 'antd';
import { motion } from 'framer-motion';
import ProductCard from '@components/product/productCard';
import { ProductUrlParams } from '@utils/types/product';
import { useEffect, useState } from 'react';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';

const ProductsPage = () => {
  const { lat, lng } = useCurrentLocation();
  const location = { lat: lat || 0, lng: lng || 0 };
  const { data, isLoading } = useGetProductsQuery(location);
  return (
    <div className="h-screen">
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

export default ProductsPage;
