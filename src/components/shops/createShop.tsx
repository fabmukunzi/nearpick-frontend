import ReusableMap from '@components/reusableMap';
import { useGetCategoriesQuery } from '@store/actions/categories';
import { useCreateShopMutation } from '@store/actions/shops';
import useCurrentLocation from '@utils/hooks/useCurrentLocation';
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Typography,
  notification,
} from 'antd';
import { FC, useState } from 'react';

interface Props {
  isOpen: boolean;
  close: () => void;
}
const CreateShop: FC<Props> = ({ isOpen, close }) => {
  const { Title } = Typography;
  const { data, isLoading } = useGetCategoriesQuery();
  const { lat, lng } = useCurrentLocation();
  const [createShop, { isLoading: loadShop }] = useCreateShopMutation();
  const [shopLocation, setShopLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const handleCreateShop = async (values: any) => {
    delete values.location;
    values.lat = shopLocation?.lat.toString();
    values.long = shopLocation?.lng.toString();
    const res = await createShop(values);
    if ('data' in res) {
      notification.success({ message: res.data.message });
      close();
    }
  };
  return (
    <Modal
      title={
        <Title level={4} className="font-semibold">
          Create a shop
        </Title>
      }
      open={isOpen}
      onCancel={close}
      footer={false}
    >
      <Form layout="vertical" onFinish={handleCreateShop}>
        <Form.Item
          label="Shop name"
          name="name"
          rules={[{ required: true, message: 'Shop name is required' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Shop Category"
          name="categoryId"
          rules={[{ required: true, message: 'Shop category is required' }]}
        >
          <Select
            disabled={isLoading}
            mode="multiple"
            size="large"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select categories"
            options={data?.categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="location"
          // rules={[{ required: true, message: 'Shop location is required' }]}
        >
          <ReusableMap
            coords={{ lat: lat || 0, lng: lng || 0 }}
            onLocationSelect={(values) => {
              setShopLocation(values);
            }}
          />
        </Form.Item>
        {/* <div className="gap-2 hidden">
          <Form.Item
            label="Latitude"
            name="lat"
            // rules={[{ required: true, message: 'This field is required' }]}
          >
            <InputNumber
              defaultValue={0}
              type="number"
              size="large"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Longitude"
            name="lng"
            // rules={[{ required: true, message: 'This field is required' }]}
          >
            <InputNumber
              defaultValue={0}
              type="number"
              placeholder="Enter maximum attendance"
              size="large"
              className="w-full"
            />
          </Form.Item>
        </div> */}
        <Form.Item>
          <Button
            loading={loadShop}
            className="mt-5"
            type="primary"
            htmlType="submit"
          >
            Create a Shop
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateShop;
