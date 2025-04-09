/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Popconfirm, Space, Typography } from "antd";
import Swal from "sweetalert2";
import {
  useGetAllCustomerQuery,
  useUserSoftDeleteMutation,
} from "../../../redux/api/userApi/UserApi";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../components/common/CustomTable";

const { Text } = Typography;

const Customer = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [userSoftDelete] = useUserSoftDeleteMutation();
  const { data } = useGetAllCustomerQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });

  const isDarkMode = false;

  const customColumns = [
    {
      header: "ACTIONS",
      size: 100,
      muiTableHeadCellProps: {
        sx: { color: `${isDarkMode ? "white" : "black"}` },
      },
      Cell: ({ row }: any) => (
        <Space size="small">
          <Popconfirm
            title="Are you sure you want to delete this order?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(row._id)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
    {
      header: "PHONE",
      accessorKey: "phone",
      Cell: ({ row }: any) => (
        <Text strong copyable>
          {row.phone}
        </Text>
      ),
    },
    {
      header: "ROLE",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <Text strong>{row.role}</Text>
        </div>
      ),
    },

    {
      header: "DATE",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <Text>
            {new Date(row.createdAt).toLocaleDateString("en", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Text>
          <Text type="secondary">
            {new Date(row.createdAt).toLocaleTimeString()}
          </Text>
        </div>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      // Implement your delete mutation here
      const res = await userSoftDelete({ id }).unwrap();
      Swal.fire({
        title: "Success!",
        text: `${res.message}`,
        icon: "success",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.data.message}`,
        icon: "error",
      });
    }
  };

  const deleteMultiple = async (ids: string[]) => {
    try {
      // Implement your bulk delete mutation here
      // const res = await bulkSoftDelete(ids).unwrap();
      Swal.fire({
        title: "Success!",
        text: `${ids.length} orders have been deleted`,
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
          enableBulkDelete={false}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          globalFilter={globalFilter}
          onFilterChange={setGlobalFilter}
          totalRecordCount={data?.data?.meta?.total || 0}
        />
      </div>
    </div>
  );
};

export default Customer;
