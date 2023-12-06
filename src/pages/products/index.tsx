import { useGetProductsQuery } from '../../store/actions/products';
import { Spin } from 'antd';
import { motion } from 'framer-motion';
import ProductCard from '@components/product/productCard';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import { Product } from '@utils/types/product';

const ProductsPage = () => {
  const { lat, lng } = useCurrentLocation();
  const location = { lat: lat || 0, lng: lng || 0 };
  const { data, isLoading } = useGetProductsQuery(location);
  return (
    <div className="h-fit bg-white mb-10">
      {isLoading ? (
        <Spin className="flex justify-center my-32" />
      ) : (
        <motion.div className="flex flex-wrap justify-center">
          {data?.data.products.map((product: Product) => (
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
