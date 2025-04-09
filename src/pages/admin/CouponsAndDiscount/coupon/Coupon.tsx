/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Dropdown, Menu, Popconfirm, Tag, Badge } from "antd";
import CustomTable from "../../../../components/common/CustomTable";
import MaxWidth from "../../../../wrapper/MaxWidth";

import Swal from "sweetalert2";
import moment from "moment";
import CouponForm from "../../../../components/pages/coupon/CouponForm";
import { useCouponDeleteMutation, useCouponPostMutation, useCouponUpdateMutation, useGetcouponDataQuery } from "../../../../redux/api/couponApi/CouponApi";

const Coupon = () => {

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openCouponDrawer, setOpenCouponDrawer] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any | null>(null);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");

//   API Calls
    const { data: couponData, refetch } = useGetcouponDataQuery({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      search: globalFilter,
      isDelete: false,
    });
    const [couponPost] = useCouponPostMutation();
    const [couponUpdate] = useCouponUpdateMutation();
    const [couponDelete] = useCouponDeleteMutation();

  const handleEdit = (coupon: any) => {
    setEditingCoupon(coupon);
    setOpenCouponDrawer(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await couponDelete(id).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Coupon deleted successfully",
        icon: "success",
      });
      refetch();
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.data?.message || "Failed to delete coupon",
        icon: "error",
      });
    }
  };

  const deleteMultiple = async (ids: string[]) => {
    try {
      await Promise.all(ids.map((id) => couponDelete(id).unwrap()));
      Swal.fire({
        title: "Success!",
        text: `${ids.length} coupons deleted successfully`,
        icon: "success",
      });
      setSelectedRows([]);
      refetch();
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.data?.message || "Failed to delete coupons",
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
           
            >
              <EyeOutlined /> Details
            </Menu.Item>
            <Menu.Item key="delete" danger>
              <Popconfirm
                title="Are you sure you want to delete this coupon?"
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
      header: "CODE",
      Cell: ({ row }: any) => <Tag color="blue">{row.code}</Tag>,
    },
    {
      header: "NAME",
      Cell: ({ row }: any) => <span>{row.name}</span>,
    },
    {
      header: "DISCOUNT",
      Cell: ({ row }: any) => (
        <span>
          {row.discountType === "percentage"
            ? `${row.discountValue}%`
            : `$${row.discountValue}`}
        </span>
      ),
    },
    {
      header: "MIN. ORDER",
      Cell: ({ row }: any) => <span>${row.minOrderAmount || 0}</span>,
    },
    {
      header: "STATUS",
      Cell: ({ row }: any) => {
        const isActive = moment(row.endDate).isAfter() && row.isActive;
        return (
          <Badge
            status={isActive ? "success" : "error"}
            text={isActive ? "Active" : "Inactive"}
          />
        );
      },
    },
    {
      header: "VALIDITY",
      Cell: ({ row }: any) => (
        <div>
          {moment(row.startDate).format("MMM D, YYYY")} -{" "}
          {moment(row.endDate).format("MMM D, YYYY")}
        </div>
      ),
    },
    {
      header: "USAGE",
      Cell: ({ row }: any) => (
        <span>
          {row.usedCount || 0} / {row.usageLimit || "∞"}
        </span>
      ),
    },
  ];

  const handleFormSubmit = async (values: any) => {
    try {
      const couponData = {
        ...values,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
      };

  

      if (editingCoupon) {
        await couponUpdate({
          id: editingCoupon._id,
          data: couponData,
        }).unwrap();
        Swal.fire({
          title: "Success!",
          text: "Coupon updated successfully",
          icon: "success",
        });
      } else {
        await couponPost(couponData).unwrap();
        Swal.fire({
          title: "Success!",
          text: "Coupon created successfully",
          icon: "success",
        });
      }

      setOpenCouponDrawer(false);
      refetch();
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.data?.message || "Failed to save coupon",
        icon: "error",
      });
    }
  };

  return (
    <MaxWidth>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingCoupon(null);
          setOpenCouponDrawer(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add New Coupon
      </Button>

      <CustomTable
        columns={customColumns}
         data={couponData?.data?.result || []}
        pagination={pagination}
        onPaginationChange={(pageIndex, pageSize) =>
          setPagination({ pageIndex, pageSize })
        }
        onBulkDelete={deleteMultiple}
        enableBulkDelete={true}
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
        totalRecordCount={couponData?.meta?.total || 0}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />

      <Drawer
        title={`${editingCoupon ? "Edit Coupon" : "Create Coupon"}`}
        placement="right"
        closable
        onClose={() => setOpenCouponDrawer(false)}
        open={openCouponDrawer}
        width={600}
        destroyOnClose
      >
        <CouponForm
          onSubmit={handleFormSubmit}
          initialValues={
            editingCoupon
              ? {
                  ...editingCoupon,
                  dateRange: [
                    moment(editingCoupon.startDate),
                    moment(editingCoupon.endDate),
                  ],
                }
              : null
          }
        />
      </Drawer>
    </MaxWidth>
  );
};

export default Coupon;
