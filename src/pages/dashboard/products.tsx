import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import PageHeader from '@components/dashboard/pageHeader';
import CreateProduct from '@components/product/createProduct';
import EditProduct from '@components/product/editProduct';
import ProductCard from '@components/product/productCard';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '@store/actions/products';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import useDisclose from '@utils/hooks/useDisclose';
import { Product } from '@utils/types/product';
import { Button, Card, Result, Typography } from 'antd';
import Head from 'next/head';
import { useState } from 'react';

const ProductsPage = () => {
  const { Title } = Typography;
  const [pr, setPr] = useState<Product>();
  const { lat, lng } = useCurrentLocation();
  const location = { lat: lat || 0, lng: lng || 0 };
  const { data, isLoading } = useGetProductsQuery(location);
  const [deleteProduct, { isLoading: deleteLoad }] = useDeleteProductMutation();
  const createProductDisclose = useDisclose();
  const editProductDisclose = useDisclose();
  const { close, isOpen, toggle } = createProductDisclose;
  const {
    close: closeEdit,
    isOpen: isEditOpen,
    toggle: toggleEdit,
  } = editProductDisclose;
  return (
    <Card className="min-h-screen" loading={isLoading}>
      <Head>
        <title>Dashboard | Products</title>
      </Head>
      <PageHeader
        title="Products"
        action={toggle}
        actionLabel="Create a product"
        icon={<PlusOutlined className="inline" />}
      />
      <CreateProduct close={close} isOpen={isOpen} />
      {pr && <EditProduct close={closeEdit} isOpen={isEditOpen} product={pr} />}
      <div className="flex flex-wrap md:gap-2 w-full mx-auto">
        {data?.data.products.length || 0 > 0 ? (
          data?.data?.products.map((product) => (
            <>
              <ProductCard
                key={product?.id}
                product={product}
                loading={isLoading}
                actions={[
                  <Button
                    key="edit"
                    icon={<EditOutlined className="text-xl" />}
                    className="bg-primary hover:bg-primary border-none hover:border-none"
                    onClick={() => {
                      setPr(product);
                      toggleEdit();
                    }}
                  />,
                  <Button
                    key="delete"
                    loading={deleteLoad}
                    className="bg-red-600 hover:bg-red-500 border-none hover:border-none"
                    onClick={() => deleteProduct({ id: product.id })}
                    icon={<DeleteFilled className="text-xl text-white" />}
                  />,
                ]}
              />
            </>
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
