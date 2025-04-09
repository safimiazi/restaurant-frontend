/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Form, Button, Modal, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";
import ReusableForm from "../../../../components/Reusable/ReusableForm";
import Swal from "sweetalert2";
import {
  useCreateMutation,
  useUpdateMutation,
  useGetAllQuery,
  useBulkSoftDeleteMutation,
  useSoftDeleteMutation,
} from "../../../../redux/api/unitApi/UnitApi";

const Unit = () => {
  const [form] = Form.useForm();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [initialValues, setiInitialValues] = useState<any | null>(null);
  const [Edit, setEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data } = useGetAllQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });
  const [create, { isLoading: isPostLoading }] = useCreateMutation();
  const [update, { isLoading: isEditLoading }] = useUpdateMutation();
  const [softDelete] = useSoftDeleteMutation();
  const [bulkSoftDelete] = useBulkSoftDeleteMutation();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (Edit === null) {
      setLoading(isPostLoading);
    } else if (Edit !== null) {
      setLoading(isEditLoading);
    }
  }, [isEditLoading, isPostLoading]);

  const handleEdit = (editData: any) => {
    setEdit(editData);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await softDelete({ id }).unwrap();
      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Good job!",
        text: `${error.message}`,
        icon: "error",
      });
    }
  };

  const isDarkMode = false;

  const customColumns = [
    {
      header: "ACTION",
      size: 50,
      muiTableHeadCellProps: {
        sx: { color: `${isDarkMode ? "white" : "black"} ` },
      },
      Cell: ({ row }: any) => (
        <div className="flex justify-start gap-2">
          <Popconfirm
            title="Are you sure you want to delete this About?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(row._id)} // Executes delete on confirm
            okText="Yes, Delete"
            cancelText="Cancel"
            // okButtonProps={{ danger: true }}
          >
            <Button type="primary" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>

          <Button onClick={() => handleEdit(row)}>Edit</Button>
        </div>
      ),
    },

    {
      header: "NAME",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="capitalize">{row.name}</span>
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "CREATED DATE",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p>
            {new Date(row.createdAt).toLocaleDateString("en", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (Edit && Edit !== null) {
      const initialValues = {
        name: Edit.name,
      };
      setiInitialValues(initialValues);
    }
  }, [Edit]);

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      setEdit(null);
      setiInitialValues(null);
    }
  }, [isModalOpen]);

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter unit Option Name",
      rules: [{ required: Edit ? false : true, message: "Name is required!" }],
    },
  ];

  const handleSubmit = async (values: any) => {
    try {
      let res;
      if (Edit) {
        res = await update({
          data: values,
          id: Edit._id,
        }).unwrap();

        Swal.fire({
          title: "Good job!",
          text: `${res.message}`,
          icon: "success",
        });
      } else {
        res = await create(values).unwrap();
        Swal.fire({
          title: "Good job!",
          text: `${res.message}`,
          icon: "success",
        });
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.data?.errorSource[0]?.message || error?.data?.message}`,
        icon: "error",
      });
    }
  };

  const deleteMultiple = async (ids: string[]) => {

    try {
      const res = await bulkSoftDelete(ids).unwrap();
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
    <div style={{ padding: 20 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add unit
        </Button>

        <CustomTable
          columns={customColumns}
          data={data?.data?.result || []}
          pagination={pagination}
          onPaginationChange={(pageIndex, pageSize) =>
            setPagination({ pageIndex, pageSize })
          }
          onBulkDelete={(selectedIds) => {
            deleteMultiple(selectedIds);
          }}
          enableBulkDelete={true}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          globalFilter={globalFilter}
          onFilterChange={setGlobalFilter}
          totalRecordCount={data?.data?.meta?.total || 0}
        />
      </div>

      <Modal
        title={Edit ? "Edit unit" : "Add unit"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ReusableForm
          fields={fields}
          form={form}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Unit;
