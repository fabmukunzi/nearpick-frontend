import { useGetProductsQuery } from '../../store/actions/products';
import { Spin } from 'antd';
import { motion } from 'framer-motion';
import ProductCard from '@components/product/productCard';
import { ProductUrlParams } from '@utils/types/product';
import { useEffect, useState } from 'react';
import { getCurrentLocation } from '@utils/functions/currentLocation';

const ProductsPage = () => {
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
    <div className="h-screen">
      {isLoading ? (
        <Spin className="flex justify-center my-32" />
      ) : (
        <motion.div className="flex flex-wrap gap-5 h-screen">
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
