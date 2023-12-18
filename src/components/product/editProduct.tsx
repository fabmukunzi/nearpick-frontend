import { PlusOutlined } from '@ant-design/icons';
import { useGetCategoriesQuery } from '@store/actions/categories';
import {
  useCreateProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from '@store/actions/products';
import { useGetUserStoresQuery } from '@store/actions/shops';
import { Product } from '@utils/types/product';
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  notification,
} from 'antd';
import { FC, useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  close: () => void;
  product: Product;
}
const EditProduct: FC<Props> = ({ isOpen, close, product }) => {
  // const { data: product, isLoading: loadViewProduct } =
  //   useGetSingleProductQuery({ id }, { skip: !id });
  const { Title } = Typography;
  const { data, isLoading } = useGetCategoriesQuery();
  const { data: userShops, isLoading: loadUser } = useGetUserStoresQuery();
  const [updateProduct, { isLoading: loadProduct }] =
    useUpdateProductMutation();
  const handleUpdateProduct = async (values: any) => {
    const formData = new FormData();
    const defaultImageUrls = fileList.map((defaultImage) => defaultImage.url);
    formData.append('oldImages', JSON.stringify(defaultImageUrls));
    Object.keys(values).forEach((key) => {
      console.log(values);
      if (key === 'images') {
        values.images.fileList?.forEach((image: UploadFile, index: number) => {
          if (image.originFileObj) {
            formData.append('images', image.originFileObj as File);
          }
        });
      } else {
        formData.append(key, values[key]);
      }
    });
    const res = await updateProduct({
      id: product?.id || '',
      body: formData,
    });
    if ('data' in res) {
      notification.success({ message: res.data.message });
      close();
    }
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  useEffect(() => {
    // Update fileList when product images change
    if (product?.images) {
      setFileList(
        product?.images.map((url, index) => ({
          uid: String(index),
          name: `Image ${index + 1}`,
          status: 'done',
          url,
        }))
      );
    }
  }, [product?.images]);
  return (
    <Modal
      title={
        <Title level={4} className="font-semibold">
          Edit Product
        </Title>
      }
      open={isOpen}
      onCancel={close}
      footer={false}
      className="-mt-20"
    >
      <Form
        layout="vertical"
        onFinish={handleUpdateProduct}
        initialValues={product}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Shop name is required' }]}
        >
          <Input placeholder="Ex: Nyirangarama" size="large" />
        </Form.Item>
        <div className="flex justify-start gap-6">
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Price is required' }]}
            initialValue={100}
          >
            <InputNumber min={100} size="large" className="w-32" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Quantity is required' }]}
            initialValue={1}
          >
            <InputNumber min={1} size="large" className="w-32" />
          </Form.Item>
          <Form.Item label="Expiration Date" name="expiryDate">
            <DatePicker size="large" className="w-32" />
          </Form.Item>
        </div>
        <Form.Item
          label="Product Category"
          name="categoryId"
          rules={[{ required: true, message: 'Category is required' }]}
          initialValue={product?.Categories?.map(
            (category) => category.id
          )}
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
          label="In which shop?"
          name="storeId"
          rules={[{ required: true, message: 'Shop is required' }]}
        >
          <Select
            disabled={loadUser}
            size="large"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select shop"
            options={userShops?.stores.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Product Images"
          name="images"
          rules={[{ required: true, message: 'Product image is required' }]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loadProduct}
            className="mt-5"
            type="primary"
            htmlType="submit"
          >
            update Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;
