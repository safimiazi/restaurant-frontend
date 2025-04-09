/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Typography, Tag, Button, Popconfirm, Space, Card, Divider, Badge } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";
import Swal from "sweetalert2";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { useAdminGetAllCartQuery } from "../../../../redux/api/cartApi/CartApi";

const { Text, Title } = Typography;

const Cart = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCart, setSelectedCart] = useState<any>(null);

  const { data } = useAdminGetAllCartQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });

  const showCartDetails = (cart: any) => {
    setSelectedCart(cart);
  };

  const customColumns = [
    {
      header: "ACTIONS",
      size: 120,
      Cell: ({ row }: any) => (
        <Space size="small">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => showCartDetails(row)}
            size="small"
          >
            Details
          </Button>
          <Popconfirm
            title="Delete this cart permanently?"
            onConfirm={() => handleDelete()}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
    {
      header: "CART ID",
      Cell: ({ row }: any) => (
        <Text strong copyable>{row._id}</Text>
      ),
    },
    {
      header: "USER INFO",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <Text strong>{row.user?.phone || 'N/A'}</Text>
          <Text type="secondary">ID: {row.user?._id}</Text>
          <Tag color={row.user?.isDelete ? 'red' : 'green'}>
            {row.user?.isDelete ? 'Deleted User' : 'Active User'}
          </Tag>
        </div>
      ),
    },
    {
      header: "ITEMS SUMMARY",
      Cell: ({ row }: any) => (
        <div>
          <Text strong>{row.products?.length || 0} items</Text>
          <div className="flex flex-col">
            {row.products?.slice(0, 2).map((product: any) => (
              <Text key={product._id} ellipsis>
                {product.quantity} × {product.product?.productName || 'Product'}
              </Text>
            ))}
            {row.products?.length > 2 && (
              <Text type="secondary">+{row.products.length - 2} more</Text>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "VALUE",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <Text strong>{formatCurrency(row.cartTotalCost)}</Text>
          <Text type="secondary">
            {row.products?.reduce((sum: number, p: any) => sum + p.quantity, 0)} units
          </Text>
        </div>
      ),
    },
    {
      header: "STATUS",
      Cell: ({ row }: any) => (
        <Badge 
          status={row.isCheckout ? 'success' : 'warning'} 
          text={
            <Tag color={row.isCheckout ? 'green' : 'orange'}>
              {row.isCheckout ? 'Completed' : 'Active'}
            </Tag>
          } 
        />
      ),
    },
    {
      header: "LAST UPDATED",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <Text>
            {new Date(row.updatedAt).toLocaleDateString()}
          </Text>
          <Text type="secondary">
            {new Date(row.updatedAt).toLocaleTimeString()}
          </Text>
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    try {
      // Implement actual delete API call here
      Swal.fire({
        title: "Success!",
        text: "Cart has been deleted",
        icon: "success",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="max-w-7xl mx-auto">
        <Title level={3}>Shopping Carts Management</Title>
        
        <CustomTable
             columns={customColumns}
             data={data?.data?.result || []}
             pagination={pagination}
             onPaginationChange={(pageIndex, pageSize) =>
               setPagination({ pageIndex, pageSize })
             }
             onBulkDelete={() => {
             }}
             enableBulkDelete={false}
             selectedRows={selectedRows}
             setSelectedRows={setSelectedRows}
             globalFilter={globalFilter}
             onFilterChange={setGlobalFilter}
             totalRecordCount={data?.data?.meta?.total || 0}
        />

        {/* Cart Details Modal */}
        {selectedCart && (
          <Card
            title={`Cart Details - ${selectedCart._id}`}
            style={{ top: 20 }}
          >
            <div className="space-y-4">
              <div>
                <Text strong>User Information:</Text>
                <div className="mt-2 pl-4">
                  <p>ID: {selectedCart.user?._id}</p>
                  <p>Phone: {selectedCart.user?.phone}</p>
                  <p>Status: 
                    <Tag color={selectedCart.user?.isDelete ? 'red' : 'green'} className="ml-2">
                      {selectedCart.user?.isDelete ? 'Deleted' : 'Active'}
                    </Tag>
                  </p>
                </div>
              </div>

              <Divider />

              <div>
                <Text strong>Cart Status:</Text>
                <div className="mt-2 pl-4">
                  <Tag color={selectedCart.isCheckout ? 'green' : 'orange'}>
                    {selectedCart.isCheckout ? 'Checked Out' : 'Active Cart'}
                  </Tag>
                  <p className="mt-1">Created: {new Date(selectedCart.createdAt).toLocaleString()}</p>
                  <p>Last Updated: {new Date(selectedCart.updatedAt).toLocaleString()}</p>
                </div>
              </div>

              <Divider />

              <div>
                <Text strong>Products ({selectedCart.products?.length}):</Text>
                <div className="mt-2 space-y-3">
                  {selectedCart.products?.map((item: any) => (
                    <Card key={item._id} size="small">
                      <div className="flex justify-between">
                        <div>
                          <Text strong>{item.product?.productName}</Text>
                          <p>SKU: {item.product?.skuCode}</p>
                          <p>Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <Text strong>{formatCurrency(item.price)} each</Text>
                          <p>Total: {formatCurrency(item.totalPrice)}</p>
                          <Tag color="blue">Stock: {item.product?.productStock}</Tag>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Divider />

              <div className="text-right">
                <Text strong className="text-lg">
                  Cart Total: {formatCurrency(selectedCart.cartTotalCost)}
                </Text>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cart;