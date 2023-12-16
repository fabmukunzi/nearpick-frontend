import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import PageHeader from '@components/dashboard/pageHeader';
import ProductCard from '@components/product/productCard';
import { useGetProductsQuery } from '@store/actions/products';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import useDisclose from '@utils/hooks/useDisclose';
import { Button, Card, Result, Typography } from 'antd';

const ProductsPage = () => {
  const { Title } = Typography;
  const { lat, lng } = useCurrentLocation();
  const location = { lat: lat || 0, lng: lng || 0 };
  const { data, isLoading } = useGetProductsQuery(location);
  const { close, isOpen, toggle } = useDisclose();
  return (
    <Card className="min-h-screen" loading={isLoading}>
      <PageHeader
        title="Products"
        action={toggle}
        actionLabel="Create a product"
        icon={<PlusOutlined className="inline" />}
      />
      {/* <CreateShop close={close} isOpen={isOpen} /> */}
      <div className="flex flex-wrap md:gap-2 w-full mx-auto">
        {data?.data.products.length||0 > 0 ? (
          data?.data.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
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
            icon={<ShoppingOutlined className="text-primary" />}
            title="You have not yet created any product!"
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

export default ProductsPage;
