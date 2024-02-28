import {
  CheckOutlined,
  CheckSquareOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import Checkout from '@components/checkout';
import { AppContext } from '@pages/_app';
import {
  useAddToCartMutation,
  useClearCartMutation,
  useGetCartQuery,
  usePayWithMomoMutation,
  useRemoveFromCartMutation,
} from '@store/actions/cart';
import { useCreateOrderMutation } from '@store/actions/order';
import { RootState } from '@store/index';
import { FLUTTERWAVE_PUBLIC_KEY } from '@utils/constants';
import formatNumber from '@utils/functions/formatNumber';
import useCurrencyConverter from '@utils/hooks/useCurrencyConverter';
import useDisclose from '@utils/hooks/useDisclose';
import { Product } from '@utils/types/product';
import {
  Avatar,
  Button,
  Card,
  Form,
  InputNumber,
  Popover,
  Spin,
  Typography,
  notification,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
const CartItem = ({
  product,
  currency,
  handleRemoveItem,
}: {
  product: Product;
  currency: string;
  handleRemoveItem: (productId: string) => void;
}) => {
  const { convertedPrice, isLoading: loadCurrency } = useCurrencyConverter({
    price: product.price,
    currency,
  });
  const [addToCart, { isLoading: loadUpdate }] = useAddToCartMutation();
  const [form] = useForm();
  const { Title, Text } = Typography;
  const handleAddToCart = async (productId: string) => {
    const payload = {
      productId: productId,
      productQuantity: parseInt(form.getFieldValue(`${productId}`), 10),
    };
    const res = await addToCart(payload);
    if ('data' in res) {
      notification.success({
        message: res.data.message,
      });
    }
  };
  return (
    <Card type="inner" className="w-full" loading={loadUpdate}>
      <div className="justify-between flex gap-1">
        <Avatar
          src={product.images[0]}
          className="w-36 xxs:h-32 md:h-24"
          shape="square"
          size={80}
        />
        <div className="sm:ml-4 w-[45%] xxs:-mt-7 sm:mt-0 sm:flex sm:w-full sm:justify-between">
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
            <div className="flex items-center justify-between md:mx-page">
              <Text className="text-sm">
                {currency} {convertedPrice}
              </Text>
              <Popover
                content={<Text>Remove this item from cart</Text>}
                trigger="hover"
              >
                <CloseCircleOutlined
                  className="text-xl text-red-500"
                  onClick={() => handleRemoveItem(product.id)}
                />
              </Popover>
            </div>
            <div className="flex gap-2 my-2">
              <Form form={form}>
                <Form.Item name={`${product.id}`}>
                  <InputNumber
                    className="md:w-28 border bg-white text-center text-xs outline-none"
                    type="number"
                    size="large"
                    defaultValue={product.quantity}
                    min={1}
                  />
                </Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="bg-primary"
                  icon={<CheckSquareOutlined />}
                  onClick={() => handleAddToCart(product.id)}
                >
                  Confirm
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
const Cart = () => {
  const { Text, Title } = Typography;
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { currency, setCurrency } = useContext(AppContext);
  const [removeFromCart, { isLoading: loadRemove }] =
    useRemoveFromCartMutation();
  const { isOpen, close, toggle } = useDisclose();
  const [clearCart, { isLoading: loadClear }] = useClearCartMutation();
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
  const { convertedPrice, isLoading: loadCurrency } = useCurrencyConverter({
    price: data?.total || 0,
    currency,
  });
  return (
    <div className="min-h-screen p-page">
      <Head>
        <title>Izimart | Cart</title>
      </Head>
      <Checkout
        toggle={toggle}
        isOpen={isOpen}
        close={close}
        amount={data?.total || 0}
        user={user}
        currency={currency}
      />
      <Card
        loading={isLoading || loadRemove || loadClear}
        title="Cart Items"
        headStyle={{ fontWeight: 'bold', fontSize: '20px' }}
        extra={
          <Button
            loading={loadClear}
            onClick={() => clearCart()}
            type="primary"
          >
            Clear Cart
          </Button>
        }
      >
        {data?.products.length === 0 && (
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
        <div className="flex gap-6 xxs:flex-wrap md:flex-nowrap">
          <div className="rounded-lg md:w-2/3 xxs:w-screen">
            {data?.products?.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                currency={currency}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
          {(data?.products?.length || 0) > 0 && (
            <Card
              className="md:w-1/3 w-full max-h-fit"
              loading={isLoading || loadRemove || loadClear}
            >
              <div className="mb-2 flex justify-between">
                <Text className="text-gray-700">Subtotal</Text>
                <Text className="text-gray-700">
                  {currency} {formatNumber(convertedPrice)}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text className="text-gray-700">VAT</Text>
                <Text className="text-gray-700">{currency} 0</Text>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <Text className="text-lg font-bold">Total</Text>
                <Text className="mb-1 text-lg font-bold">
                  {currency} {formatNumber(convertedPrice)}
                </Text>
              </div>
              <Button
                className="mt-6 bg-primary"
                loading={loadClear}
                onClick={toggle}
                block
              >
                Checkout
              </Button>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Cart;
