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
  useClearCartMutation,
  useGetCartQuery,
  usePayWithMomoMutation,
  useRemoveFromCartMutation,
} from '@store/actions/cart';
import { RootState } from '@store/index';
import { FLUTTERWAVE_PUBLIC_KEY } from '@utils/constants';
import formatNumber from '@utils/functions/formatNumber';
import {
  Avatar,
  Button,
  Card,
  InputNumber,
  Popover,
  Typography,
  notification,
} from 'antd';
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
const Cart = () => {
  const { Text, Title } = Typography;
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [removeFromCart, { isLoading: loadRemove }] =
    useRemoveFromCartMutation();
  const [clearCart, { isLoading: loadClear }] = useClearCartMutation();
  const { data, isLoading } = useGetCartQuery();
  const { push } = useRouter();
  const config = {
    public_key: FLUTTERWAVE_PUBLIC_KEY || '',
    tx_ref: Date.now().toString(), // Convert to string
    amount: data?.total || 0,
    currency: 'RWF',
    payment_options: 'card',
    customer: {
      email: user?.email || '',
      phone_number: user?.phoneNumber || '',
      name: user?.name || '',
    },
    customizations: {
      title: 'Near Pick',
      description: 'Payment for products',
      logo: 'https://res.cloudinary.com/dr4reow8e/image/upload/e_background_removal/f_png/v1700070727/1700069859823_qsszxr.jpg',
    },
  };
  const handleFlutterPayment = useFlutterwave(config);
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
        {data?.products.length ||
          (0 === 0 && (
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
          ))}
        <div className="flex gap-6 xxs:flex-wrap md:flex-nowrap">
          <div className="rounded-lg md:w-2/3">
            {data?.products?.map((product) => (
              <Card
                className="my-3"
                loading={loadRemove}
                key={product.id}
                size="small"
              >
                <div className="justify-between flex items-center gap-1">
                  <Avatar
                    src={product.images[0]}
                    className="w-36 xxs:h-32 md:h-24"
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
                    <div className="flex justify-between xxs:flex-col-reverse md:flex-none gap-2 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center justify-between mx-page">
                        <Text className="text-sm">
                          RWF {formatNumber(product.price)}
                        </Text>
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
                      <div className="flex gap-2 my-2">
                        <InputNumber
                          className="md:w-28 border bg-white text-center text-xs outline-none"
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
          {data?.products?.length ||
            (0 > 0 && (
              <Card
                className="md:w-1/3 w-full max-h-fit"
                loading={isLoading || loadRemove}
              >
                <div className="mb-2 flex justify-between">
                  <Text className="text-gray-700">Subtotal</Text>
                  <Text className="text-gray-700">
                    RWF {formatNumber(data?.total || 0)}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-gray-700">VAT</Text>
                  <Text className="text-gray-700">RWF 0</Text>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <Text className="text-lg font-bold">Total</Text>
                  <Text className="mb-1 text-lg font-bold">
                    RWF {formatNumber(data?.total || 0)}
                  </Text>
                </div>
                <Button
                  className="mt-6 bg-primary"
                  loading={loadClear}
                  onClick={() => {
                    handleFlutterPayment({
                      callback: (response) => {
                        clearCart();
                        closePaymentModal();
                      },
                      onClose: () => {
                        console.log('You close me ooo');
                      },
                    });
                  }}
                  block
                >
                  Pay with flutterwave
                </Button>
              </Card>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default Cart;
