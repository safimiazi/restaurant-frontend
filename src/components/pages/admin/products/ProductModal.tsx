/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Upload,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useGetCategoryDataQuery } from "../../../../redux/api/categoryApi/CategoryApi";
import { useProductPostMutation, useProductUpdateMutation } from "../../../../redux/api/productApi/ProductApi";

const { TextArea } = Input;

const ProductModal = ({
  editingProduct,
  openProductDrawer,
  onClose,
  form,
}: any) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: categories } = useGetCategoryDataQuery({
    isDelete: false,
    search: globalFilter,
  });

  const [fileList, setFileList] = useState<any[]>([]);
  const [productPut] = useProductUpdateMutation();

  // RTK Mutation Hook for creating product
  const [productPost, { isLoading }] = useProductPostMutation();

  // Handle Image Upload Change
  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  // Handle Form Submit
  const onFinish = async (values: any) => {
    
    
    const formData = new FormData();

    // Append form fields
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", String(values.price));
    formData.append("category", values.categoryId);
    formData.append("stock", String(values.stock));

    // Append images
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {


      let result;
      if (editingProduct) {
        result = await productPut({
          data: formData,
          id: editingProduct._id,
        }).unwrap();
      } else {
        result = await productPost(formData).unwrap();
      }


      alert(result.message);
      form.resetFields();
      setFileList([]);
      onClose();
    } catch (error) {
      message.error("Failed to add product");
      console.error(error);
    }
  };

  return (
    <>
      <Drawer
        title={`${editingProduct ? "Edit Product" : "New Product"}`}
        placement="right"
        closable
        onClose={onClose}
        open={openProductDrawer}
        width={500}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter product description" },
            ]}
          >
            <TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter product price" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
            initialValue={editingProduct ? editingProduct?.category?._id : null}
          >
            <Select
              showSearch
              onSearch={(value) => setGlobalFilter(value)}
              placeholder="Select category"
              options={categories?.data?.result?.map((category: any) => ({
                label: category.name,
                value: category._id,
              }))}
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please enter stock quantity" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter stock quantity"
            />
          </Form.Item>

          <Form.Item
            name="images"
            label="Upload Images"
            rules={[
              { required: true, message: "Please upload product images" },
            ]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleUploadChange}
              multiple
            >
              {fileList.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {editingProduct ? "Edit Product" : "Create Product"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default ProductModal;
