import { Card, Pagination, Spin, Typography } from 'antd';
import { motion } from 'framer-motion';
import { ProductUrlParams } from '@utils/types/product';
import { useEffect, useState } from 'react';
import { useGetShopsQuery } from '@store/actions/shops';
import ShopCard from '@components/shops/ShopCard';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';

const ShopsPage = () => {
  const { lat, lng } = useCurrentLocation();
  const location = { lat: lat || 0, lng: lng || 0 };
  const { Title } = Typography;
  const { data, isLoading } = useGetShopsQuery(location);
  return (
    <div className="h-fit bg-white mb-10 md:px-page p-0">
      <Title level={3} className="font-bold text-center">
        Shops
      </Title>
      {isLoading ? (
        <Spin className="flex justify-center my-32" />
      ) : (
        <motion.div className="flex flex-wrap md:gap-2 w-full mx-auto">
          {data?.stores.stores.map((store) => (
            <ShopCard key={store.id} shop={store} loading={isLoading} />
          ))}
          <Pagination
            className="my-3"
            defaultCurrent={data?.stores.currentPage}
            total={data?.stores.totalPages}
          />
        </motion.div>
      )}
    </div>
  );
};
export default ShopsPage;
