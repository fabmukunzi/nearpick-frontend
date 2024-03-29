import { useGetProductsQuery } from '../store/actions/products';
import { Button, Carousel, Image, Spin, Typography } from 'antd';
import { motion } from 'framer-motion';
import ProductCard from '@components/product/productCard';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import { homeSlides } from '@utils/images';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { Title } = Typography;
  const { push } = useRouter();
  const { t, i18n } = useTranslation();
  const { lat, lng } = useCurrentLocation();
  const location = { lat: lat || 0, lng: lng || 0 };
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading } = useGetProductsQuery(location, {
    skip: user?.role == 'seller',
  });
  return (
    <div className="h-fit bg-white mb-10">
      <Head>
        <title>Izimart | {t('home')}</title>
      </Head>
      <div className="mx-auto rounded-xl">
        <Carousel autoplay>
          {homeSlides?.map((slide, index) => (
            <div key={index}>
              <div className="flex flex-col items-center justify-center md:h-[80vh] h-fit w-screen">
                <Image
                  className="object-cover h-72 md:h-full w-screen"
                  preview={false}
                  alt="Product"
                  src={slide.image.src}
                />
                <div className="absolute xxs:pt-20 md:pt-48 text-center w-screen h-full text-white bg-[rgb(0,0,0,0.3)]">
                  <Title
                    level={2}
                    className="md:text-3xl text-xl font-bold mb-2 text-white"
                  >
                    {t(slide.content)}
                  </Title>
                  <Title
                    level={5}
                    className="md:text-lg text-sm mb-4 text-white font-medium mx-4 md:mx-auto"
                  >
                    {t(slide.subtitle)}
                  </Title>
                  <Link href="/">
                    <Button
                      type="primary"
                      className="px-5 h-10 bg-primary"
                      onClick={() => push('/products')}
                    >
                      {t('explore')}
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
          <Title level={3} className="font-bold md:my-10 my-2 text-center">
            {t('popularProducts')}
          </Title>
          <motion.div className="flex flex-wrap md:justify-center md:gap-2 w-full">
            {data?.data?.products.map((product) => (
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
