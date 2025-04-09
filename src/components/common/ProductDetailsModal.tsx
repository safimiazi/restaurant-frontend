import React from "react";
import { Modal, Descriptions, Image, Tag, Divider, Typography } from "antd";

const { Title, Text } = Typography;

interface ProductVariantColor {
  _id: string;
  name: string;
  colorCode: string;
}

interface ProductCategory {
  name: string;
}

interface ProductBrand {
  name: string;
  image: string;
}

interface ProductUnit {
  name: string;
}

interface Product {
  productName: string;
  skuCode: string;
  productCategory?: ProductCategory;
  productBrand?: ProductBrand;
  productWeight: number;
  productUnit?: ProductUnit;
  productStock: number;
  productBuyingPrice: number;
  productSellingPrice: number;
  productOfferPrice: number;
  isFeatured: boolean;
  productDescription: string;
  productFeatureImage: string;
  productImages?: string[];
  variantcolor?: ProductVariantColor[];
}

interface ProductDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  product?: Product;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  visible,
  onClose,
  product,
}) => {
  if (!product) return null;

  return (
    <Modal
      title={
        <Title level={3} style={{ marginBottom: 0 }}>
          🛍️ Product Details
        </Title>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={850}
      bodyStyle={{ backgroundColor: "#f9f9f9", padding: "20px" }}
    >
      <Descriptions bordered column={2} size="middle" layout="vertical">
        <Descriptions.Item label={<Text strong>Product Name</Text>}>
          <Text>{product.productName}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>SKU Code</Text>}>
          <Tag color="blue">{product.skuCode}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label={<Text strong>Category</Text>}>
          {product.productCategory?.name}
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Brand</Text>}>
          {product.productBrand?.name}
          <br />
          <Image
            src={product.productBrand?.image}
            alt="Brand"
            width={50}
            height={50}
            style={{ borderRadius: 5 }}
          />
        </Descriptions.Item>

        <Descriptions.Item label={<Text strong>Weight</Text>}>
          {product.productWeight} {product.productUnit?.name}
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Stock</Text>}>
          <Tag color={product.productStock > 0 ? "green" : "red"}>
            {product.productStock}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label={<Text strong>Buying Price</Text>}>
          <Text type="success">${product.productBuyingPrice}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Selling Price</Text>}>
          <Text type="danger">${product.productSellingPrice}</Text>
        </Descriptions.Item>

        <Descriptions.Item label={<Text strong>Offer Price</Text>}>
          <Tag color="gold">${product.productOfferPrice}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label={<Text strong>Featured</Text>}>
          {product.isFeatured ? (
            <Tag color="green">Yes</Tag>
          ) : (
            <Tag color="red">No</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>

      <Divider dashed />

      <Title level={5}>📜 Description</Title>
      <Text>{product.productDescription}</Text>

      <Divider dashed />

      <Title level={5}>🌟 Feature Image</Title>
      {product.productFeatureImage ? (
        <Image
          src={product.productFeatureImage}
          alt="Feature"
          width={250}
          height={250}
          style={{
            borderRadius: 10,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      ) : null}

      <Divider dashed />

      <Title level={5}>🖼️ Other Images</Title>
      {product.productImages?.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`Product-${index}`}
          width={100}
          height={100}
          style={{
            marginRight: 8,
            borderRadius: 8,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
          }}
        />
      ))}

      {product.variantcolor && product.variantcolor.length > 0 && (
        <>
          <Divider dashed />
          <Title level={5}>🎨 Available Colors</Title>
          {product.variantcolor.map((color) => (
            <Tag
              key={color._id}
              color={color.colorCode}
              style={{ padding: "5px 10px", fontSize: "14px" }}
            >
              {color.name}
            </Tag>
          ))}
        </>
      )}
    </Modal>
  );
};

export default ProductDetailsModal;
