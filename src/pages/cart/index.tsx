import {
  CheckOutlined,
  CheckSquareOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
} from '@store/actions/cart';
import {
  Avatar,
  Button,
  Card,
  InputNumber,
  Popover,
  Typography,
  notification,
} from 'antd';
import { loadEmoji } from 'next/dist/compiled/@vercel/og/emoji';
import { useRouter } from 'next/router';

const Cart = () => {
  const { Text, Title } = Typography;
  const [removeFromCart, { isLoading: loadRemove }] =
    useRemoveFromCartMutation();
  const { data, isLoading } = useGetCartQuery();
  const { push } = useRouter();
  const handleRemoveItem = async (productId: string) => {
    const res = await removeFromCart({ productId });
    if ('data' in res) {
      notification.success({
        message: res.data.message,
      });
    }
  };
  return (
    <div className="min-h-screen">
      <Card
        loading={isLoading}
        title="Cart Items"
        headStyle={{ fontWeight: 'bold', fontSize: '20px' }}
      >
        {!data && (
          <div className="flex justify-center flex-col items-center">
            <ShoppingCartOutlined className="text-9xl text-primary" />
            <Title>Your cart is empty</Title>
            <Button
              onClick={() => push('/')}
              type="primary"
              className="bg-primary"
            >
              Go back to shop
            </Button>
          </div>
        )}
        <div className="flex gap-6">
          <div className="rounded-lg md:w-2/3">
            {data?.products?.map((product) => (
              <Card
                className="my-3"
                loading={loadRemove}
                key={product.id}
                size="small"
              >
                <div className="justify-between sm:flex sm:justify-start">
                  <Avatar
                    src={product.images[0]}
                    className="w-36"
                    shape="square"
                    size={80}
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <Title className="text-lg font-bold text-gray-900">
                        {product.name}
                      </Title>

                      <Text className="mt-1 text-xs text-gray-700">
                        <ShopOutlined className="text-base text-primary mr-2" />
                        {product?.Store?.name}
                      </Text>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center justify-between mx-page">
                        <Text className="text-sm">RWF {product.price}</Text>
                        <Popover
                          content={<Text>Remove this item from cart</Text>}
                          trigger="hover"
                        >
                          <CloseCircleOutlined
                            className="text-xl text-red-500"
                            onClick={() => {
                              handleRemoveItem(product.id);
                            }}
                          />
                        </Popover>
                      </div>
                      <div className="flex gap-2">
                        <InputNumber
                          className="w-28 border bg-white text-center text-xs outline-none"
                          type="number"
                          defaultValue={product.quantity}
                          min={1}
                        />
                        <Button
                          type="primary"
                          className="bg-primary"
                          icon={<CheckSquareOutlined />}
                        >
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {data && (
            <Card className="w-1/3 max-h-fit" loading={isLoading || loadRemove}>
              <div className="mb-2 flex justify-between">
                <Text className="text-gray-700">Subtotal</Text>
                <Text className="text-gray-700">RWF {data?.total}</Text>
              </div>
              <div className="flex justify-between">
                <Text className="text-gray-700">VAT</Text>
                <Text className="text-gray-700">RWF 0</Text>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <Text className="text-lg font-bold">Total</Text>
                <Text className="mb-1 text-lg font-bold">
                  RWF {data?.total}
                </Text>
              </div>
              <Button className="mt-6 bg-primary" block>
                Check out
              </Button>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Cart;
