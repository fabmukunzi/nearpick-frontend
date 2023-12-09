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
  const { Text } = Typography;
  const { data, isLoading } = useGetShopsQuery(location);
  console.log(data)
  return (
    <div className="h-screen">
      {isLoading ? (
        <Spin className="flex justify-center my-32" />
      ) : (
        <motion.div className="flex flex-wrap justify-center">
          <Text>Shops</Text>
          {data?.stores.stores.map((store) => (
            <ShopCard key={store.id} shop={store} loading={isLoading} />
          ))}
          <Pagination
            className="flex-end"
            defaultCurrent={data?.stores.currentPage}
            total={data?.stores.totalPages}
          />
        </motion.div>
      )}
    </div>
  );
};
export default ShopsPage;
