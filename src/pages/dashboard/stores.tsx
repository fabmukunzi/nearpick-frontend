import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import PageHeader from '@components/dashboard/pageHeader';
import ShopCard from '@components/shops/ShopCard';
import CreateShop from '@components/shops/createShop';
import { useGetShopsQuery } from '@store/actions/shops';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import useDisclose from '@utils/hooks/useDisclose';
import { Button, Card, Result, Typography } from 'antd';

const ShopsPage = () => {
  const { Title } = Typography;
  const { lat, lng } = useCurrentLocation();
  const location = { lat: lat || 0, lng: lng || 0 };
  const { data, isLoading } = useGetShopsQuery(location);
  const { close, isOpen, toggle } = useDisclose();
  return (
    <Card className="min-h-screen" loading={isLoading}>
      <PageHeader
        title="Stores"
        action={toggle}
        actionLabel="Create store"
        icon={<PlusOutlined className="inline" />}
      />
      <CreateShop close={close} isOpen={isOpen} />
      <div className="flex flex-wrap md:gap-2 w-full mx-auto">
        {data?.stores.totalPages || 0 > 0 ? (
          data?.stores.stores.map((store) => (
            <ShopCard
              key={store.id}
              shop={store}
              loading={isLoading}
              actions={[
                <EditOutlined className="text-xl" key="edit" />,
                <DeleteFilled
                  className="text-xl hover:text-red-500"
                  key="delete"
                />,
              ]}
            />
          ))
        ) : (
          <Result
            className="mx-auto"
            icon={<ShopOutlined className="text-primary" />}
            title="You have not yet created any shop!"
            extra={
              <Button onClick={toggle} type="primary">
                Create one
              </Button>
            }
          />
        )}
      </div>
    </Card>
  );
};

export default ShopsPage;
