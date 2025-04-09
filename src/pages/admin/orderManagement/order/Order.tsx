/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Typography,
  Button,
  Modal,
  Form,
  Input,
  message,
  Tag,
  Card,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";
import {
  useCancelOrderMutation,
  useConfirmOrderMutation,
  useGetOrderDataQuery,
} from "../../../../redux/api/orderApi/OrderApi";
import { formatCurrency } from "../../../../utils/formatCurrency";
import Swal from "sweetalert2";

const { Text } = Typography;

const Order = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { data, refetch } = useGetOrderDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });

  const [confirmOrder] = useConfirmOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();

  const customColumns = [
    {
      header: "ORDER ID",
      accessorKey: "transactionId",
      Cell: ({ row }: any) => (
        <Text strong copyable>
          {row.transactionId || "N/A"}
        </Text>
      ),
    },
    {
      header: "CUSTOMER",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <Text strong>{row.customer?.name}</Text>
          <Text type="secondary">{row.customer?.email}</Text>
          <Text type="secondary">{row.customer?.phone}</Text>
        </div>
      ),
    },
    {
      header: "ITEMS",
      Cell: ({ row }: any) => (
        <div>
          {row.items?.map((item: any) => (
            <div key={item._id} className="flex justify-between py-1">
              <Text>
                {item.quantity} × {item.product?.productName || "Product"}
              </Text>
              <Text>{formatCurrency(item.price)}</Text>
            </div>
          ))}
        </div>
      ),
    },
    {
      header: "TOTAL",
      Cell: ({ row }: any) => <Text strong>{formatCurrency(row.total)}</Text>,
    },
    {
      header: "PAYMENT",
      Cell: ({ row }: any) => (
        <Card
          size="small"
          style={{
            boxShadow: "none",
            border: "1px solid #f0f0f0",
            height: "100%",
          }}
          bodyStyle={{
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Payment Method Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <DollarOutlined
              style={{
                color: row.paymentStatus === "paid" ? "#52c41a" : "#f5222d",
                fontSize: "18px",
              }}
            />
            <div>
              <Text strong style={{ display: "block" }}>
                {row.payment?.type?.toUpperCase()}
              </Text>
              {row.payment?.method && (
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {row.payment?.method}
                </Text>
              )}
            </div>
          </div>

          {/* Payment Status */}
          <Tag
            color={row.paymentStatus === "paid" ? "success" : "error"}
            style={{
              margin: 0,
              alignSelf: "flex-start",
              fontWeight: 500,
            }}
          >
            {row.paymentStatus.toUpperCase()}
          </Tag>

          {/* Action Buttons - Stacked Vertically */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "auto",
            }}
          >
            {/* Manual Payment Verification */}
            {row.payment?.type === "manual" &&
              row.paymentStatus === "unpaid" && (
                <div className="space-y-2">
                  <Button
                    block
                    type="primary"
                    onClick={() => showVerifyModal(row)}
                    icon={<CheckCircleOutlined />}
                    size="small"
                  >
                    Verify Payment
                  </Button>
                  <Button
                    block
                    danger
                    onClick={() => showCancelModal(row)}
                    icon={<CloseCircleOutlined />}
                    size="small"
                  >
                    Cancel Order
                  </Button>
                </div>
              )}

            {/* COD Order Actions */}
            {row.payment?.type === "cashOnDelivery" &&
              row.status === "pending" && (
                <>
                  <Button
                    block
                    type="primary"
                    onClick={() => showConfirmModal(row)}
                    icon={<CheckCircleOutlined />}
                    size="small"
                  >
                    Confirm Order
                  </Button>
                  <Button
                    block
                    danger
                    onClick={() => showCancelModal(row)}
                    icon={<CloseCircleOutlined />}
                    size="small"
                  >
                    Cancel Order
                  </Button>
                </>
              )}
          </div>
        </Card>
      ),
    },
    {
      header: "STATUS",
      Cell: ({ row }: any) => {
        let color = "";
        switch (row.status) {
          case "completed":
            color = "green";
            break;
          case "cancelled":
            color = "red";
            break;
          case "pending":
          default:
            color = "orange";
        }
        return <Tag color={color}>{row.status.toUpperCase()}</Tag>;
      },
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

  const showVerifyModal = (order: any) => {
    setCurrentOrder(order);
    form.setFieldsValue({
      transactionId: order.payment?.transactionId || "",
    });
    setIsModalVisible(true);
  };

  const showConfirmModal = (order: any) => {
    setCurrentOrder(order);
    setIsConfirmModalVisible(true);
  };

  const showCancelModal = (order: any) => {
    setCurrentOrder(order);
    setIsCancelModalVisible(true);
  };

  const handleVerifyPayment = async () => {
    try {
      setConfirmLoading(true);
      await form.validateFields();

      // API call to verify manual payment
      const res = await confirmOrder({
        orderId: currentOrder._id,
      }).unwrap();

      Swal.fire({
        text: `${res.message}`,
        icon: "success",
        confirmButtonText: "Okay",
      });
      setIsModalVisible(false);
      refetch();
    } catch (error: any) {
      Swal.fire({
        text: `${error.data.message}`,
        icon: "error",
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      setConfirmLoading(true);

      // API call to confirm COD order
      const res = await confirmOrder({
        orderId: currentOrder._id,
      }).unwrap();

      Swal.fire({
        text: `${res.message}`,
        icon: "success",
        confirmButtonText: "Okay",
      });
      setIsConfirmModalVisible(false);
      refetch();
    } catch (error: any) {
      Swal.fire({
        text: `${error.data.message}`,
        icon: "error",
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      setConfirmLoading(true);

      // API call to cancel order
      await cancelOrder({
        orderId: currentOrder._id,
      });

      message.success("Order cancelled successfully!");
      setIsCancelModalVisible(false);
      refetch();
    } catch (error: any) {
      message.error(
        error.message || "Failed to cancel order. Please try again."
      );
    } finally {
      setConfirmLoading(false);
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
          onBulkDelete={() => {
            // Bulk delete implementation
          }}
          enableBulkDelete={false}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          globalFilter={globalFilter}
          onFilterChange={setGlobalFilter}
          totalRecordCount={data?.data?.meta?.total || 0}
        />
      </div>

      {/* Payment Verification Modal */}
      <Modal
        title="Verify Manual Payment"
        visible={isModalVisible}
        onOk={handleVerifyPayment}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={confirmLoading}
        okText="Confirm Order"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="transactionId"
            label="Transaction ID"
            rules={[
              { required: true, message: "Please enter transaction ID" },
              {
                min: 6,
                message: "Transaction ID must be at least 6 characters",
              },
            ]}
          >
            <Input placeholder="Enter payment transaction ID" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Order Confirmation Modal */}
      <Modal
        title="Confirm Order"
        visible={isConfirmModalVisible}
        onOk={handleConfirmOrder}
        onCancel={() => setIsConfirmModalVisible(false)}
        confirmLoading={confirmLoading}
        okText="Confirm Order"
        okButtonProps={{ type: "primary" }}
      >
        <div>
          <Text>Are you sure you want to confirm this order?</Text>
          <div className="mt-4">
            <Text strong>Order ID:</Text> {currentOrder?._id}
          </div>
          <div>
            <Text strong>Amount:</Text>{" "}
            {formatCurrency(currentOrder?.total || 0)}
          </div>
        </div>
      </Modal>

      {/* Order Cancellation Modal */}
      <Modal
        title="Cancel Order"
        visible={isCancelModalVisible}
        onOk={handleCancelOrder}
        onCancel={() => setIsCancelModalVisible(false)}
        confirmLoading={confirmLoading}
        okText="Confirm Cancellation"
        okButtonProps={{ danger: true }}
      >
        <div>
          <Text>Are you sure you want to cancel this order?</Text>
          <div className="mt-4">
            <Text strong>Order ID:</Text> {currentOrder?._id}
          </div>
          <div>
            <Text strong>Customer:</Text> {currentOrder?.customer?.name}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Order;
