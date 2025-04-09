/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Button, Modal, Popconfirm, Radio, Input, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";
import {
  useAttributeOptionDeleteMutation,
  useAttributeOptionPostMutation,
  useAttributeOptionPutMutation,
  useGetattributeOptionDataQuery,
} from "../../../../redux/api/attributeOptionApi/AttributeOptionApi";
import Swal from "sweetalert2";
import { HexColorPicker } from "react-colorful";
import namer from "color-namer";

const AttributeOption = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [edit, setEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: data, refetch } = useGetattributeOptionDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });
  const selectedType = Form.useWatch("type", form);
  const [attributeOptionPost] = useAttributeOptionPostMutation();
  const [attributeOptionPut] = useAttributeOptionPutMutation();
  const [attributeOptionDelete, { isLoading: isDeleteLoading }] =
    useAttributeOptionDeleteMutation();

  const handleEdit = (editData: any) => {
    setEdit(editData);
    setIsModalOpen(true);
    form.setFieldsValue({
      name: editData.name,
      type: editData.type,
      colorCode: editData.colorCode,
      status: editData.status
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await attributeOptionDelete({ id }).unwrap();
      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });
      refetch();
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.message}`,
        icon: "error",
      });
    }
  };

  const customColumns = [
    {
      header: "ACTION",
      size: 50,
      muiTableHeadCellProps: { sx: { color: "black" } },
      Cell: ({ row }: any) => (
        <div className="flex justify-start gap-2">
          <Popconfirm
            title="Are you sure you want to delete this Attribute?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(row._id)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button type="primary" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>

          <Button loading={isDeleteLoading} onClick={() => handleEdit(row)}>
            Edit
          </Button>
        </div>
      ),
    },
    {
      header: "NAME",
      Cell: ({ row }: any) => <p>{row.name}</p>,
    },
    {
      header: "TYPE",
      Cell: ({ row }: any) => <p>{row.type}</p>,
    },
    {
      header: "COLOR CODE",
      Cell: ({ row }: any) => (
        <div
          className={`py-1 px-2 rounded border text-white`}
          style={{ backgroundColor: row.colorCode }} // ✅ Inline style for dynamic color
        >
          {row.colorCode}
        </div>
      ),
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
      header: "CREATED DATE",
      Cell: ({ row }: any) => (
        <p>{new Date(row.createdAt).toLocaleDateString()}</p>
      ),
    },
  ];


  const handleSubmit = async (values: any) => {
    const data = {
      name: values?.colorCode ? getColorName(values.colorCode) : values.name,
      type: values.type,
      colorCode: values?.colorCode || null,
      status: values?.status,
    };

    try {
      let res;
      if (edit) {
        res = await attributeOptionPut({ data, id: edit._id }).unwrap();
      } else {
        res = await attributeOptionPost(data).unwrap();
      }

      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });
      setIsModalOpen(false);
      form.resetFields();
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.data.message}`,
        icon: "error",
      });
    }
  };

  const getColorName = (hex: string) => {
    const names = namer(hex);
    return names?.basic[0]?.name || "Unknown";
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Attribute Option
        </Button>

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
          enableBulkDelete={false}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          onBulkDelete={() => {}}
        />
      </div>

      <Modal
        title={edit ? "Edit Attribute Option" : "Add Attribute Option"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name!" }]}
          >
            <Input placeholder="Enter color name" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select a type!" }]}
          >
            <Radio.Group
              options={[
                { label: "Color", value: "color" },
                { label: "Other", value: "other" },
              ]}
              optionType="button"
            />
          </Form.Item>

          {selectedType === "color" && (
            <>
              <Form.Item
                label="Pick a Color Code"
                name="colorCode"
                rules={[
                  { required: true, message: "Please select a colorCode!" },
                ]}
              >
                <HexColorPicker
                  color={form.getFieldValue("colorCode")}
                  onChange={(color) =>
                    form.setFieldsValue({ colorCode: color })
                  }
                />
              </Form.Item>
            </>
          )}
          <Form.Item
            label="Status"
            name="status"
            initialValue="active" // ✅ Ensures a default value is set in form state
          >
            <Select
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AttributeOption;
