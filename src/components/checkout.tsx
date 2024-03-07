import React, { FC, useState } from 'react';
import { Button, Form, Input, Modal, Radio, Select, Typography } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { useForm } from 'antd/lib/form/Form';
import locationData from '@utils/locations.json';
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { FLUTTERWAVE_PUBLIC_KEY } from '@utils/constants';
import { UserSchema } from '@utils/types/auth';
import { useCreateOrderMutation } from '@store/actions/order';
import useCurrencyConverter from '@utils/hooks/useCurrencyConverter';

interface Props {
  isOpen: boolean;
  close: () => void;
  amount: number;
  user?: UserSchema;
  currency: string;
  toggle: () => void;
}

const Checkout: FC<Props> = ({
  isOpen,
  close,
  amount,
  user,
  currency,
  toggle,
}) => {
  const { Title, Text } = Typography;
  const [form] = useForm();
  const [createOrder, { isLoading: loadOrder }] = useCreateOrderMutation();
  const [value, setValue] = useState<string>('selfpick');
  const [toPay, setToPay] = useState<number | null>(null);
  const { convertedPrice } = useCurrencyConverter({
    price: toPay || amount,
    currency,
  });
  const [district, setDistrict] = useState(null);
  const [sector, setSector] = useState(null);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    if (e.target.value === 'selfpick') setToPay(amount);
    else setToPay((amount || 0) + 3000);
  };
  const config = {
    public_key: FLUTTERWAVE_PUBLIC_KEY || '',
    tx_ref: Date.now().toString(),
    amount: convertedPrice,
    currency: currency,
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user?.email || '',
      phone_number: user?.phoneNumber || '',
      name: user?.name || '',
    },
    customizations: {
      title: 'Izimart.',
      description: 'Payment for products',
      logo: 'https://res.cloudinary.com/dr4reow8e/image/upload/e_background_removal/f_png/v1700070727/1700069859823_qsszxr.jpg',
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  const handleFinish = (values: any) => {
    const shippingAddress = values;
    handleFlutterPayment({
      callback: async (response) => {
        if (response.status === 'successful') {
          await createOrder({ shippingAddress: shippingAddress });
          closePaymentModal();
        }
      },
      onClose: () => {
        toggle();
        console.log('You close me ooo');
      },
    });
  };
  const districtOptions =
    Object.keys(locationData)?.map((item) => ({
      value: item,
      label: item,
    })) || [];

  const sectorOptions =
    Object.entries(locationData[district || 'Gasabo'] || {}).map(
      ([key, value]) => ({
        value: key,
        label: key,
      })
    ) || [];
  const cellOpt = Object.entries(locationData[district || 'Gasabo'] || {}).find(
    ([key, value]) => key === sector
  );
  const cellOptions = cellOpt
    ? Object.keys(cellOpt[1]).map((item) => ({
        value: item,
        label: item,
      }))
    : [];

  return (
    <Modal
      open={isOpen}
      onCancel={close}
      title={
        <Title level={4} className="font-semibold">
          Confirm order
        </Title>
      }
      className="-mt-20"
      footer={null}
    >
      <div>
        <Title level={4} className="font-semibold">
          Amount to pay {convertedPrice} {currency}
        </Title>
        <Text className="text-lg">Select a delivery method</Text>
        <br />
        <Radio.Group onChange={onChange} value={value} className="my-3">
          <Radio value="selfpick">Self-Pick</Radio>
          <Radio value="doorstep">Deliver to doorstep</Radio>
        </Radio.Group>
      </div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {value === 'doorstep' && (
          <>
            <Title level={3} className="font-semibold">
              Shipping address
            </Title>
            <Form.Item
              name="district"
              label="District"
              rules={[
                {
                  required: true,
                  message: 'Please select a district!',
                },
              ]}
            >
              <Select
                showSearch
                options={districtOptions}
                placeholder="Select district"
                onChange={(e) => {
                  setDistrict(e);
                  setSector(null);
                }}
              />
            </Form.Item>
            <Form.Item
              name="sector"
              label="Sector"
              rules={[
                {
                  required: true,
                  message: 'Please select a sector!',
                },
              ]}
            >
              <Select
                showSearch
                disabled={!district}
                options={sectorOptions}
                onChange={(e) => setSector(e)}
                placeholder="Select Sector"
              />
            </Form.Item>
            <Form.Item
              name="cell"
              label="Cell"
              rules={[
                {
                  required: true,
                  message: 'Please select a cell!',
                },
              ]}
            >
              <Select
                disabled={!district || !sector}
                showSearch
                options={cellOptions}
                placeholder="Select Cell"
              />
            </Form.Item>
            <Form.Item
              label="Street Address"
              name="streetAddress"
              rules={[
                {
                  required: true,
                  message: 'Please enter your street address!',
                },
              ]}
            >
              <Input placeholder="Street Address" />
            </Form.Item>
          </>
        )}
        <Button
          className="mt-5 bg-primary"
          type="primary"
          htmlType="submit"
          block
        >
          Pay {convertedPrice} {currency} with Flutterwave
        </Button>
      </Form>
    </Modal>
  );
};

export default Checkout;
