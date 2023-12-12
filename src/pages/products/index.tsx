import { useGetProductsQuery } from '../../store/actions/products';
import { Spin, Typography } from 'antd';
import { motion } from 'framer-motion';
import ProductCard from '@components/product/productCard';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import { Product } from '@utils/types/product';

const ProductsPage = () => {
  const { lat, lng } = useCurrentLocation();
  const location = { lat: lat || 0, lng: lng || 0 };
  const { data, isLoading } = useGetProductsQuery(location);
  const { Title } = Typography;
  return (
    <div className="h-fit bg-white mb-10">
      <Title level={3} className='text-center font-bold'>All Products</Title>
      {isLoading ? (
        <Spin className="flex justify-center my-32" />
      ) : (
        <motion.div className="grid md:grid-cols-5 grid-cols-1 justify-center">
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
