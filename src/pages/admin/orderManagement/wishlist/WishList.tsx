/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Typography, Tag, Button, Popconfirm, Space, Card, Divider, Image } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";
import Swal from "sweetalert2";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { useGetwishlistDataQuery, useWishlistSoftDeleteMutation } from "../../../../redux/api/wishlistApi/WishlistApi";

const { Text, Title } = Typography;

const WishList = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedWishlist, setSelectedWishlist] = useState<any>(null);
const [wishlistSoftDelete] =useWishlistSoftDeleteMutation()
  const { data } = useGetwishlistDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });

  const showWishlistDetails = (wishlist: any) => {
    setSelectedWishlist(wishlist);
  };

  const customColumns = [
    {
      header: "ACTIONS",
      size: 100,
      Cell: ({ row }: any) => (
        <Space size="small">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => showWishlistDetails(row)}
            size="small"
          >
            View
          </Button>
          <Popconfirm
            title="Remove from wishlist?"
            onConfirm={() => handleDelete(row._id)}
            okText="Remove"
            cancelText="Cancel"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
    {
      header: "USER",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <Text strong>{row.user?.phone}</Text>
          <Tag color={row.user?.isDelete ? 'red' : 'green'}>
            {row.user?.isDelete ? 'Deleted' : 'Active'}
          </Tag>
          <Text type="secondary" copyable>{row.user?._id}</Text>
        </div>
      ),
    },
    {
      header: "PRODUCTS",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <Text strong>{row.products?.length || 0} items</Text>
          <div className="space-y-1 mt-1">
            {row.products?.slice(0, 2).map((product: any) => (
              <Tag key={product._id} color="blue">
                {product.productName}
              </Tag>
            ))}
            {row.products?.length > 2 && (
              <Tag>+{row.products.length - 2} more</Tag>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "PRODUCT VALUE",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          {row.products?.[0] && (
            <>
              <Text delete={row.products[0].productOfferPrice < row.products[0].productSellingPrice}>
                {formatCurrency(row.products[0].productSellingPrice)}
              </Text>
              {row.products[0].productOfferPrice < row.products[0].productSellingPrice && (
                <Text strong>{formatCurrency(row.products[0].productOfferPrice)}</Text>
              )}
            </>
          )}
        </div>
      ),
    },
    {
      header: "STOCK",
      Cell: ({ row }: any) => (
        <Tag color={row.products?.[0]?.productStock > 0 ? 'green' : 'red'}>
          {row.products?.[0]?.productStock || 0} in stock
        </Tag>
      ),
    },
    {
      header: "ADDED DATE",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <Text>{new Date(row.createdAt).toLocaleDateString()}</Text>
          <Text type="secondary">{new Date(row.createdAt).toLocaleTimeString()}</Text>
        </div>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    try {
const result = await wishlistSoftDelete({id})
      // Implement wishlist item removal API call here
      Swal.fire({
        title: "Removed!",
        text: `${result.data.message}`,
        icon: "success",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.data.message,
        icon: "error",
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="max-w-7xl mx-auto">
        <Title level={3}>Wishlist Management</Title>
        
        <CustomTable
          columns={customColumns}
          data={data?.data?.result || []}
          pagination={pagination}
          onPaginationChange={(pageIndex, pageSize) =>
            setPagination({ pageIndex, pageSize })
          }
          enableBulkDelete={false}
          onBulkDelete={() => {
          }}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          globalFilter={globalFilter}
          onFilterChange={setGlobalFilter}
          totalRecordCount={data?.data?.meta?.total || 0}
        />

        {/* Wishlist Details Modal */}
        {selectedWishlist && (
          <Card
            title={`Wishlist Details - ${selectedWishlist._id}`}
            style={{ top: 20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <div>
                <Text strong>User Information:</Text>
                <div className="mt-2 pl-4 space-y-2">
                  <p><Text strong>Phone:</Text> {selectedWishlist.user?.phone}</p>
                  <p><Text strong>Status:</Text> 
                    <Tag color={selectedWishlist.user?.isDelete ? 'red' : 'green'} className="ml-2">
                      {selectedWishlist.user?.isDelete ? 'Deleted User' : 'Active User'}
                    </Tag>
                  </p>
                  <p><Text strong>Added on:</Text> {new Date(selectedWishlist.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <Divider />

              <div>
                <Text strong className="text-lg">Wishlist Items ({selectedWishlist.products?.length}):</Text>
                <div className="mt-4 space-y-4">
                  {selectedWishlist.products?.map((product: any) => (
                    <Card key={product._id} className="hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 flex-shrink-0">
                          {product.productFeatureImage ? (
                            <Image
                              src={`${product.productFeatureImage}`}
                              alt={product.productName}
                              className="w-full h-full object-cover rounded"
                              preview={false}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
                              <Text type="secondary">No Image</Text>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <Text strong className="text-base block">{product.productName}</Text>
                          <Text type="secondary" className="block">SKU: {product.skuCode}</Text>
                          
                          <div className="mt-2 flex items-center gap-4">
                            <div>
                              <Text strong className="block">Price</Text>
                              <div className="flex items-center gap-2">
                                {product.productOfferPrice < product.productSellingPrice ? (
                                  <>
                                    <Text delete>{formatCurrency(product.productSellingPrice)}</Text>
                                    <Text strong>{formatCurrency(product.productOfferPrice)}</Text>
                                  </>
                                ) : (
                                  <Text strong>{formatCurrency(product.productSellingPrice)}</Text>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <Text strong className="block">Stock</Text>
                              <Tag color={product.productStock > 0 ? 'green' : 'red'}>
                                {product.productStock} available
                              </Tag>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WishList;