/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Upload,
  InputNumber,
  Popconfirm,
  Drawer,
  Menu,
  Dropdown,
} from "antd";
import CustomTable from "../../../../components/common/CustomTable";
import MaxWidth from "../../../../wrapper/MaxWidth";
import {
  useBulkDeleteMutation,
  useGetproductDataQuery,
  useProductDeleteMutation,
  useProductPostMutation,
  useProductUpdateMutation,
} from "../../../../redux/api/productApi/ProductApi";
import { useGetCategoryDataQuery } from "../../../../redux/api/categoryApi/CategoryApi";
import { useGetbrandDataQuery } from "../../../../redux/api/brandApi/BrandApi";
import { useGetattributeDataQuery } from "../../../../redux/api/attributeApi/AttributeApi";
import { useGetAllQuery } from "../../../../redux/api/unitApi/UnitApi";
import Swal from "sweetalert2";
import ProductDetailsModal from "../../../../components/common/ProductDetailsModal";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openProductDrawer, setOpenProductDrawer] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [featureImageList, setFeatureImageList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const haveVarient = Form.useWatch("haveVarient", form);
  const [attributesForColor, setAttributesForColor] = useState<any[]>([]);
  const { data: productData, refetch } = useGetproductDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });


  const { data: categories } = useGetCategoryDataQuery({
    isDelete: false,
    search: globalFilter,
  });
  const { data: brands } = useGetbrandDataQuery({
    isDelete: false,
    search: globalFilter,
  });
  const { data: attributes } = useGetattributeDataQuery({
    isDelete: false,
    search: globalFilter,
  });
  const { data: units } = useGetAllQuery({
    isDelete: false,
    search: globalFilter,
  });

  const [productPost, { isLoading: isPostLoading }] = useProductPostMutation();
  const [ProductUpdate, { isLoading: isEditLoading }] =
    useProductUpdateMutation();
  const [productDelete] = useProductDeleteMutation();
  const [bulkDelete] = useBulkDeleteMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditLoading) {
      setLoading(true);
    }
    if (isPostLoading) {
      setLoading(true);
    }
  }, [isEditLoading, isPostLoading]);

  useEffect(() => {
    if (!openProductDrawer) {
      form.resetFields();
      setEditingProduct(null);
      setFileList([]);
      setFeatureImageList([]);
      setAttributesForColor([]);
      setProductImages([]);
      setProductFeatureImage(null);
    }
  }, [openProductDrawer]);

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleFeatureImageChange = ({ fileList }: any) => {
    setFeatureImageList(fileList);
  };

  const handleAddOrUpdate = async (values: any) => {
    console.log(values);
    try {
      const formData = new FormData();

      // Append product details
      formData.append("productName", values.productName || ""); // Default empty string
      formData.append("skuCode", values.skuCode || ""); // Default empty string
      formData.append("productCategory", values.productCategory || ""); // Default empty string or null
      formData.append("productBrand", values.productBrand || ""); // Default empty string or null
      formData.append("productWeight", values.productWeight || ""); // Default empty string
      formData.append("productUnit", values.productUnit || ""); // Default empty string
      formData.append(
        "productPurchasePoint",
        values.productPurchasePoint || ""
      ); // Default empty string
      formData.append("productBuyingPrice", values.productBuyingPrice || 0); // Default 0
      formData.append("productSellingPrice", values.productSellingPrice || 0); // Default 0
      formData.append("productOfferPrice", values.productOfferPrice || 0); // Default 0
      formData.append("productStock", values.productStock || 0); // Default 0
      formData.append(
        "isFeatured",
        values.isFeatured !== undefined ? values.isFeatured : false
      ); // Default false
      formData.append(
        "haveVarient",
        values.haveVarient !== undefined ? values.haveVarient : false
      ); // Default false
      formData.append("productDescription", values.productDescription || ""); // Default empty string
      formData.append("variant", values?.variant || null); // Default null if no variant

      if (featureImageList && featureImageList[0]?.originFileObj) {
        formData.append(
          "productFeatureImage",
          featureImageList[0]?.originFileObj || null
        ); // Ensure this field name is correct
      } else {
        console.error("No feature image selected.");
      }

      if (fileList) {
        fileList.forEach((file: any) => {
          formData.append("productImages", file?.originFileObj || null); // Ensure this field name is correct
        });
      } else {
        console.error("No additional images selected.");
      }

      // Handle color-related data
      if (values.variantcolor && values.variantcolor.length > 0) {
        formData.append("variantcolor", JSON.stringify(values.variantcolor));
      }

      // Submit the form
      const res = editingProduct
        ? await ProductUpdate({
            data: formData,
            id: editingProduct._id,
          }).unwrap()
        : await productPost(formData).unwrap();

      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });

      refetch();
      form.resetFields();
      setEditingProduct(null);
      setOpenProductDrawer(false);
      setProductImages([]);
      setProductFeatureImage(null);
      setLoading(false)
    } catch (error: any) {
      setLoading(false)

      Swal.fire({
        title: "Error!",
        text: `${error?.data?.message || error.data?.errorSource[0]?.message}`,
        icon: "error",
      });
    }
  };

  // Function to close modal
  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const [productImages, setProductImages] = useState([]);
  const [productFeatureImage, setProductFeatureImage] = useState(null);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setOpenProductDrawer(true);
    form.setFieldsValue({
      productName: product?.productName,
      skuCode: product?.skuCode,
      productCategory: product?.productCategory._id,
      productBrand: product?.productBrand._id,
      productWeight: product?.productWeight,
      productUnit: product?.productUnit._id,
      productPurchasePoint: product?.productPurchasePoint,
      productBuyingPrice: product?.productBuyingPrice,
      productSellingPrice: product?.productSellingPrice,
      productOfferPrice: product?.productOfferPrice,
      productStock: product?.productStock,
      isFeatured: product?.isFeatured,
      haveVarient: product?.haveVarient,
      productDescription: product?.productDescription,
      variant: product.variant?._id,
      variantcolor: product?.variantcolor?.map((item: any) => item._id),
    });
    setProductImages(product?.productImages);
    setProductFeatureImage(product?.productFeatureImage);
    setAttributesForColor(product?.variantcolor || []);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await productDelete({ id }).unwrap();
      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });
      refetch();
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.data?.errorSource[0]?.message || error?.data?.message}`,
        icon: "error",
      });
    }
  };

  const customColumns = [
    {
      header: "ACTION",
      size: 50,
      Cell: ({ row }: any) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit" onClick={() => handleEdit(row)}>
              <EditOutlined /> Edit
            </Menu.Item>
            <Menu.Item
              key="details"
              onClick={() => {
                setSelectedProduct(row);
                setIsModalVisible(true);
              }}
            >
              <EyeOutlined /> Details
            </Menu.Item>
            <Menu.Item key="delete" danger>
              <Popconfirm
                title="Are you sure you want to delete this product?"
                onConfirm={() => handleDelete(row._id)}
                okText="Yes, Delete"
                cancelText="Cancel"
              >
                <DeleteOutlined /> Delete
              </Popconfirm>
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["hover"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
    {
      header: "NAME",
      Cell: ({ row }: any) => <span>{row.productName}</span>,
    },
    {
      header: "SKU CODE",
      Cell: ({ row }: any) => <span>{row.skuCode}</span>,
    },
    {
      header: "CATEGORY",
      Cell: ({ row }: any) => (
        <span>{`${row.productCategory.name} (${row.productCategory.type})`}</span>
      ),
    },
    {
      header: "BRAND",
      Cell: ({ row }: any) => <span>{row.productBrand.name}</span>,
    },
    {
      header: "UNIT",
      Cell: ({ row }: any) => <span>{row.productUnit.name}</span>,
    },

    {
      header: "CREATED DATE",
      Cell: ({ row }: any) => (
        <div>
          {new Date(row.createdAt).toLocaleDateString("en", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </div>
      ),
    },
  ];

  const deleteMultiple = async (ids: string[]) => {
    try {
      const res = await bulkDelete({ ids }).unwrap();
      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });
      setSelectedRows([]);
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.message}`,
        icon: "error",
      });
    }
  };
  return (
    <MaxWidth>
      <Button type="primary" onClick={() => setOpenProductDrawer(true)}>
        Add New Product
      </Button>
      <ProductDetailsModal
        visible={isModalVisible}
        onClose={handleClose}
        product={selectedProduct}
      />
      <CustomTable
        columns={customColumns}
        data={productData?.data?.result || []}
        pagination={pagination}
        onPaginationChange={(pageIndex, pageSize) =>
          setPagination({ pageIndex, pageSize })
        }
        onBulkDelete={(ids) => {
          deleteMultiple(ids);
        }}
        enableBulkDelete={true}
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
        totalRecordCount={productData?.data?.meta?.total || 0}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <Drawer
        title={`${editingProduct ? "Edit Product" : "New Product"}`}
        placement="right"
        closable
        onClose={() => setOpenProductDrawer(false)}
        open={openProductDrawer}
        width={500}
      >
        <Form form={form} onFinish={handleAddOrUpdate} layout="vertical">
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="SKU Code"
            name="skuCode"
            rules={[{ required: true, message: "Please enter the SKU code" }]}
          >
            <Input.Group compact>
              <Input
                style={{ width: "80%" }}
                value={Form.useWatch("skuCode", form)}
                placeholder="Enter SKU code"
                // You don't need to manually manag e SKU value here anymore
              />
              <Button
                type="primary"
                style={{ width: "20%" }}
                onClick={() => {
                  // Generate a new SKU code and update it in the form
                  const newSkuCode = `SKU-${Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toUpperCase()}`;
                  form.setFieldsValue({ skuCode: newSkuCode });
                }}
              >
                Generate
              </Button>
            </Input.Group>
          </Form.Item>

          <Form.Item
            label="Brand"
            name="productBrand"
            rules={[{ required: true, message: "Please select a brand" }]}
          >
            <Select
              placeholder="Select a brand"
              options={brands?.data?.result.map((item: any) => ({
                label: item.name,
                value: item._id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="productCategory"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select a category"
              options={categories?.data?.result.map((item: any) => ({
                label: `${item.name} (${item.type.toUpperCase()})`,
                value: item._id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Weight"
            name="productWeight"
            rules={[
              { required: false, message: "Please enter the product weight" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Unit"
            name="productUnit"
            rules={[{ required: true, message: "Please select a unit" }]}
          >
            <Select
              placeholder="Select a unit"
              options={units?.data?.result.map((item: any) => ({
                label: item.name,
                value: item._id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Purchase Point"
            name="productPurchasePoint"
            rules={[
              { required: false, message: "Please enter the purchase point" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Buying Price"
            name="productBuyingPrice"
            rules={[
              { required: true, message: "Please enter the buying price" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Selling Price"
            name="productSellingPrice"
            rules={[
              { required: true, message: "Please enter the selling price" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Offer Price" name="productOfferPrice">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="productStock"
            rules={[
              { required: true, message: "Please enter the stock quantity" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Featured Image" name="productFeatureImage">
            <div>
              <Upload
                listType="picture-card"
                fileList={featureImageList}
                beforeUpload={() => false}
                onChange={handleFeatureImageChange}
                maxCount={1}
              >
                {featureImageList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              <div>
                {productFeatureImage && (
                  <img
                    src={productFeatureImage}
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: 16,
                    }}
                  />
                )}
              </div>
            </div>
          </Form.Item>

          <Form.Item
            label="Images"
            name="productImages"
            rules={[
              { required: editingProduct ? false : true, message: "please select product images." },
            ]}
          >
            <div className="space-y-2">
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false}
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
              <div className="grid grid-cols-5 gap-1">
                {productImages?.length > 0 &&
                  productImages.map((image: string) => {
                    return (
                      <img
                        src={image}
                        style={{
                          width: "100px",
                          height: "100px",
                          marginBottom: 16,
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          </Form.Item>

          <Form.Item label="Product Description" name="productDescription">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="isFeatured" valuePropName="checked">
            <Checkbox>Is Featured?</Checkbox>
          </Form.Item>

          <Form.Item name="haveVarient" valuePropName="checked">
            <Checkbox>Have Variant?</Checkbox>
          </Form.Item>

          {haveVarient && (
            <>
              <Form.Item label="Variant" name="variant">
                <Select
                  placeholder="Select variant"
                  options={attributes?.data?.result.map((item: any) => ({
                    label: item.name,
                    value: item._id,
                  }))}
                  onChange={(values) => {
                    const selectedAttributes = attributes?.data?.result.find(
                      (attr: any) => values.includes(attr._id)
                    );
                    setAttributesForColor(selectedAttributes?.attributeOption);
                    form.setFieldsValue({ variantcolor: [] });
                  }}
                />
              </Form.Item>
            </>
          )}

          {attributesForColor.length > 0 && (
            <Form.Item name="variantcolor" label="Variant Colors">
              <Select
                mode="multiple"
                placeholder="Select variant colors"
                style={{ width: "100%" }}
                options={attributesForColor?.map((item: any) => ({
                  label: item.name,
                  value: item._id,
                }))}
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </MaxWidth>
  );
};

export default Products;
