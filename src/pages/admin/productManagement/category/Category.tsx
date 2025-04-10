/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Popconfirm,
  notification,
  Select,
  Upload,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";
import {
  useCategoryBulkDeleteMutation,
  useCategoryDeleteMutation,
  useCategoryPostMutation,
  useCategoryPutMutation,
  useGetCategoryDataQuery,
} from "../../../../redux/api/categoryApi/CategoryApi";
import Swal from "sweetalert2";
import compressImage from "../../../../utils/imageCompression";

const Category = () => {
  const [form] = Form.useForm();
  const [editing, setediting] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryType, setCategoryType] = useState<string>("parent");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Fetch categories
  const { data } = useGetCategoryDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });

  // API Mutations
  const [categoryPost] = useCategoryPostMutation();
  const [categoryPut] = useCategoryPutMutation();
  const [categoryDelete] = useCategoryDeleteMutation();
  const [categoryBulkDelete] = useCategoryBulkDeleteMutation();
  const [fileList, setFileList] = useState<any[]>([]);
  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };
  // Handle Add or Update Category
  const handleAddOrUpdate = async (values: any) => {
    try {
      const formData = new FormData();
  
      // Append simple fields
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      formData.append("status", values.status || "inactive");
      formData.append("type", values.type);
  
      // Append conditional relationships
      if (values.parentCategory) {
        formData.append("parentCategory", values.parentCategory);
      }
  
      if (values.category) {
        formData.append("category", values.category);
      }
  
      if (values.categories?.length) {
        formData.append("categories", JSON.stringify(values.categories));
        
      }
  
      if (values.subcategories?.length) {
        formData.append("subcategories", JSON.stringify(values.subcategories));

      }
  
      // Append image file (if exists)
      if (fileList.length > 0 && fileList[0]?.originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }
  
      let res;
      if (editing) {
        // Update
        res = await categoryPut({
          id: editing._id,
          data: formData,
        }).unwrap();
      } else {
        // Add
        res = await categoryPost(formData).unwrap();
      }
  
      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });
  
      // Reset form
      form.resetFields();
      setFileList([]);
      setediting(null);
      setIsModalOpen(false);
      setCategoryType("parent");
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error?.data?.message || "Something went wrong!"}`,
        icon: "error",
      });
    }
  };
  

  // Handle Bulk Delete
  const deleteMultiple = async (ids: string[]) => {
    try {
      const res = await categoryBulkDelete({ ids }).unwrap();
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

  // Handle Edit
  const handleEdit = (editData: any) => {
    console.log(editData);
    setCategoryType(editData.type);
    form.setFieldsValue({
      name: editData.name,
      description: editData.description,
      status: editData.status,
      type: editData.type,
      parentCategory: editData.parentCategory?._id,
      category: editData.category?._id,
      categories: editData.categories.map((cat: any) => cat._id),
      subcategories: editData.subcategories.map((cat: any) => cat._id),
    });
    setediting(editData);
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      const res = await categoryDelete({ id }).unwrap();
      notification.success({ message: res?.message, placement: "topRight" });
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  // Category Table Columns
  const customColumns = [
    {
      header: "Action",
      size: 50,
      Cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(row._id)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button onClick={() => handleEdit(row)}>Edit</Button>
        </div>
      ),
    },
    {
      header: "Image",
      Cell: ({ row }: any) => <span>
        {row.image ? (
          <img
            src={row.image}
            alt="Category"
            className="w-10 h-10 rounded object-cover"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </span>,
    },
    {
      header: "Name",
      Cell: ({ row }: any) => <span className="capitalize">{row.name}</span>,
    },
    {
      header: "Category Type",
      Cell: ({ row }: any) => <span className="">{row?.type || "N/A"}</span>,
    },
    {
      header: "Description",
      Cell: ({ row }: any) => <span>{row.description || "N/A"}</span>,
    },
    {
      header: "Status",
      Cell: ({ row }: any) => (
        <span
          className={`p-1 rounded border ${
            row.status === "active" ? "text-green-500" : "text-red-500"
          }`}
        >
          {row.status || "N/A"}
        </span>
      ),
    },
    {
      header: "Created Date",
      Cell: ({ row }: any) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const beforeUpload = async (file: File) => {
    try {
      const compressedFile = await compressImage(file);
      if (compressedFile) {
        setFileList([
          ...fileList,
          {
            uid: `${file.name}-${Date.now()}`,
            name: file.name,
            status: "done",
            url: URL.createObjectURL(compressedFile),
            originFileObj: compressedFile, // Store the compressed file
          },
        ]);
      }
      return false; // Prevent default upload behavior
    } catch (error) {
      console.error("Error compressing image:", error);
      return false; // Ensure the return type matches the expected type
    }
  };

  return (
    <div className="p-4">
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add New Food Category
      </Button>

      {/* Table Display */}
      <CustomTable
        columns={customColumns}
        data={data?.data?.result || []}
        pagination={pagination}
        onPaginationChange={(pageIndex, pageSize) =>
          setPagination({ pageIndex, pageSize })
        }
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
        totalRecordCount={data?.data?.meta?.total || 0}
        onBulkDelete={(selectedIds) => {
          deleteMultiple(selectedIds);
        }}
        enableBulkDelete={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />

      {/* Modal for Adding & Editing */}
      <Modal
        title={editing ? "Edit Food Category" : "Add New Food Category"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setediting(null);
          form.resetFields();
          setCategoryType("parent");
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddOrUpdate} layout="vertical">
          {/* Category Label Type */}
          <Form.Item label="Category Type" name="type">
            <Select
              onChange={(value) => setCategoryType(value)}
              options={[
                { value: "parent", label: <span>Parent Category</span> },
                { value: "category", label: <span>Category</span> },
                { value: "subcategory", label: <span>Sub Category</span> },
              ]}
            />
          </Form.Item>

          {/* Name of the Category */}
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input />
          </Form.Item>

          {/* Parent Category Selection for Category/Subcategory */}
          {categoryType === "category" && (
            <Form.Item
              label="Parent Category"
              name="parentCategory"
              rules={[
                {
                  required: false,
                  message: "Please select a parent category!",
                },
              ]}
            >
              <Select
                placeholder="Select parent category"
                options={data?.data?.result
                  .filter((cat: any) => cat.type === "parent")
                  .map((category: any) => {
                    return { value: category._id, label: category.name };
                  })}
              />
            </Form.Item>
          )}
          {categoryType === "subcategory" && (
            <Form.Item
              label="Category"
              name="category"
              rules={[
                { required: false, message: "Please select a category!" },
              ]}
            >
              <Select
                placeholder="Select category"
                options={data?.data?.result
                  .filter((cat: any) => cat.type === "category")
                  .map((category: any) => {
                    return { value: category._id, label: category.name };
                  })}
              />
            </Form.Item>
          )}

          {/* Subcategory Selection */}
          {categoryType === "category" && (
            <Form.Item
              label="Subcategories"
              name="subcategories"
              rules={[
                {
                  required: false,
                  message: "Please select at least one subcategory!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select parent category"
                options={data?.data?.result
                  .filter((cat: any) => cat.type === "subcategory")
                  .map((category: any) => {
                    return { value: category._id, label: category.name };
                  })}
              />
            </Form.Item>
          )}
          {categoryType === "parent" && (
            <Form.Item
              label="categories"
              name="categories"
              rules={[
                {
                  required: false,
                  message: "Please select at least one categories!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select categories"
                options={data?.data?.result
                  .filter((cat: any) => cat.type === "category")
                  .map((category: any) => {
                    return { value: category._id, label: category.name };
                  })}
              />
            </Form.Item>
          )}

          {/* Description of the Category */}
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              placeholder="Select Status"
              options={[
                { value: "active", label: <span>Active</span> },
                { value: "inactive", label: <span>In Active</span> },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="image"
            label="Upload Image"
            rules={[
              { required: false, message: "Please upload product images"},
            ]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              multiple
              maxCount={1}
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
            <Button type="primary" htmlType="submit">
              {editing ? "Update Food Category" : "Add Food Category"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
