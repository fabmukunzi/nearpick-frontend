import { Card, Pagination, Spin } from 'antd';
import { motion } from 'framer-motion';
import { getCurrentLocation } from '@utils/functions/currentLocation';
import { ProductUrlParams } from '@utils/types/product';
import { useEffect, useState } from 'react';
import { useGetShopsQuery } from '@store/actions/shops';
import ShopCard from '@components/shops/ShopCard';

const ShopsPage = () => {
  const [location, setLocation] = useState<ProductUrlParams>({});
  const res = getCurrentLocation();
  useEffect(() => {
    res.then((data) => {
      const { lat, lng } = data as ProductUrlParams;
      setLocation({ lat, lng });
    });
  }, [res]);
  const { data, isLoading } = useGetShopsQuery(location);
  return (
    <div className="h-screen">
      {isLoading ? (
        <Spin className="flex justify-center my-32" />
      ) : (
        <motion.div className="flex flex-col gap-5 h-screen">
          {data?.stores.stores.map((store) => (
            <ShopCard
              key={store.id}
              shop={store}
              loading={isLoading}
            />
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
