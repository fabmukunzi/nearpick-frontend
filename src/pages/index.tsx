import { useGetProductsQuery } from '../store/actions/products';
import { Button, Carousel, Image, Spin, Typography } from 'antd';
import { motion } from 'framer-motion';
import ProductCard from '@components/product/productCard';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import { homeSlides } from '@utils/images';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home = () => {
  const { Title } = Typography;
  const { push } = useRouter();
  const { lat, lng } = useCurrentLocation();
  const location = { lat: lat || 0, lng: lng || 0 };
  const { data, isLoading } = useGetProductsQuery(location);
  return (
    <div className="h-fit bg-white mb-10 px-page">
      <div className="mx-auto rounded-xl">
        <Carousel autoplay>
          {homeSlides?.map((slide, index) => (
            <div key={index}>
              <div className="flex flex-col items-center justify-center h-[80vh] w-screen">
                <Image
                  className="object-cover h-full w-full"
                  preview={false}
                  alt="Product"
                  src={slide.image.src}
                />
                <div className="absolute text-center text-white">
                  <h2 className="text-3xl font-bold mb-2">{slide.content}</h2>
                  <p className="text-lg mb-4">Subtitle or additional details</p>
                  <Link href="/">
                    <Button
                      type="primary"
                      className="px-5 h-10"
                      onClick={() => push('/products')}
                    >
                      Explore Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {isLoading ? (
        <Spin className="flex justify-center my-32" />
      ) : (
        <>
          <Title className="text-3xl my-10">Popular Products</Title>
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
