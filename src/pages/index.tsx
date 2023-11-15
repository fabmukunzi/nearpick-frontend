import { useGetProductsQuery } from '../store/actions/products';
import { Card, Carousel, Image, Pagination, Spin, Typography } from 'antd';
import { motion } from 'framer-motion';
import ProductCard from '@components/product/productCard';
import { getCurrentLocation } from '@utils/functions/currentLocation';
import { ProductUrlParams } from '@utils/types/product';
import { useEffect, useState } from 'react';

const Home = () => {
  const [location, setLocation] = useState<ProductUrlParams>({});
  const { Title } = Typography;
  const res = getCurrentLocation();
  useEffect(() => {
    res.then((data) => {
      const { lat, lng } = data as ProductUrlParams;
      setLocation({ lat, lng });
    });
  }, [res]);
  const { data, isLoading } = useGetProductsQuery(location);
  return (
    <div className="h-fit bg-white mb-10">
      <div className="w-[95%] border-green-500 border-4 mx-auto rounded-xl">
        <Carousel autoplay>
          {data?.data.products[3].images.map((p) => (
            <div key={p}>
              <Image
                className="object-cover h-[80vh] w-screen"
                preview={false}
                alt="Product"
                src={p}
              />
            </div>
          ))}
        </Carousel>
      </div>
      {isLoading ? (
        <Spin className="flex justify-center my-32" />
      ) : (
        <>
          <Title className="text-3xl mx-10 my-10">Popular Products</Title>
          <motion.div className="flex flex-wrap justify-center">
            {data?.data.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                loading={isLoading}
              />
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};
export default Home;
