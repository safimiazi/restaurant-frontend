

/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useState } from "react";
import { Form, Input, Button, Modal, Popconfirm, notification, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";
import {
  useCategoryBulkDeleteMutation,
  useCategoryDeleteMutation,
  useCategoryPostMutation,
  useCategoryPutMutation,
  useGetCategoryDataQuery,
} from "../../../../redux/api/categoryApi/CategoryApi";
import Swal from "sweetalert2";

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

  // Handle Add or Update Category
  const handleAddOrUpdate = async (values: any) => {
    try {
      let res;
      if (editing) {
        // Edit existing category
        res = await categoryPut({
          data: values,
          id: editing._id,
        }).unwrap();
      } else {
        // Add new category
        res = await categoryPost(values).unwrap();
      }

      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });

      // Reset the form and close the modal after successful submission
      form.resetFields();
      setediting(null);
      setIsModalOpen(false);
      setCategoryType("parent"); // Reset category type
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error?.data?.message}`,
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
    setCategoryType(editData.type)
    form.setFieldsValue({name: editData.name,
      description: editData.description,
      status: editData.status,
      type: editData.type,
      parentCategory: editData.parentCategory?._id,
      category: editData.category?._id,
      categories: editData.categories.map((cat: any) => cat._id),
      subcategories: editData.subcategories.map((cat: any) => cat._id),

    })
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
      header: "Name",
      Cell: ({ row }: any) => <span className="capitalize">{row.name}</span>,
    },
    {
      header: "Category Type",
      Cell: ({ row }: any) => (
        <span className="">{row?.type || "N/A"}</span>
      ),
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

  return (
    <div className="p-4">
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add New Category
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
        title={editing ? "Edit Category" : "Add New Category"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setediting(null);
          form.resetFields();
          setCategoryType("parent");
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddOrUpdate} layout="vertical" >
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
                { required: false, message: "Please select a parent category!" },
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
              rules={[{ required: false, message: "Please select a category!" }]}
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
              defaultValue={"active"}
              options={[
                { value: "active", label: <span>Active</span> },
                { value: "inactive", label: <span>In Active</span> },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editing ? "Update Category" : "Add Category"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;