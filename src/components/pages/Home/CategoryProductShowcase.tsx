/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGetProductByCategoryQuery } from "../../../redux/api/productApi/ProductApi";
import ProductCard from "../../../components/ui/ProductCart";
import { Pagination, Spin, Input, Select, Button, Empty } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import ProductFilters from "../../../components/ui/ProductFilters";

const { Search } = Input;

const CategoryProductShowcase = ({ categoryId }: { categoryId: string }) => {
  // State management
  const [open, setOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    minPrice: undefined,
    maxPrice: undefined,
    endDate: undefined,
    startDate: undefined,
    brand: "",
    searchTerm: "",
    sortOrder: "lowToHigh",
    creationOrder: "newest"
  });

  // Debounce search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Fetch products
  const { data: products, isLoading } = useGetProductByCategoryQuery({
    isDelete: false,
    id: categoryId,
    pageIndex,
    pageSize,
    searchTerm: debouncedSearchTerm,
    sortOrder: filters.sortOrder,
    creationOrder: filters.creationOrder,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    brand: filters.brand,
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(filters.searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.searchTerm]);

  // Handlers
  const handlePageChange = (page: number, size?: number) => {
    setPageIndex(page);
    if (size) setPageSize(size);
  };

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const onFilter = (data: any) => {
    setFilters(prev => ({
      ...prev,
      minPrice: data.priceRange[0],
      maxPrice: data.priceRange[1],
      startDate: data.dateRange[0],
      endDate: data.dateRange[1],
      brand: data.selectedBrand
    }));
    setPageIndex(1); // Reset to first page when filters change
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Search
            placeholder="Search in this category..."
            allowClear
            enterButton="Search"
            size="middle"
            value={filters.searchTerm}
            onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            className="flex-1"
          />

          <div className="flex gap-2">
            <Select
              value={filters.sortOrder}
              onChange={(value) => setFilters(prev => ({ ...prev, sortOrder: value }))}
              options={[
                { value: "lowToHigh", label: "Price: Low to High" },
                { value: "HighToLow", label: "Price: High to Low" },
              ]}
              className="min-w-[180px]"
            />

            <Select
              value={filters.creationOrder}
              onChange={(value) => setFilters(prev => ({ ...prev, creationOrder: value }))}
              options={[
                { value: "newest", label: "Newest First" },
                { value: "oldest", label: "Oldest First" },
              ]}
              className="min-w-[180px]"
            />

            <Button 
              type="default" 
              icon={<FilterOutlined />} 
              onClick={showDrawer}
            >
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : products?.data?.result?.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.data.result.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Pagination
              current={pageIndex}
              pageSize={pageSize}
              total={products?.data?.meta?.total || 0}
              showSizeChanger
              onChange={handlePageChange}
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="text-gray-500">
              No products found in this category
            </span>
          }
          className="flex flex-col items-center justify-center py-12"
        >
          <Button 
            type="primary" 
            onClick={() => {
              setFilters({
                minPrice: undefined,
                maxPrice: undefined,
                endDate: undefined,
                startDate: undefined,
                brand: "",
                searchTerm: "",
                sortOrder: "lowToHigh",
                creationOrder: "newest"
              });
              setPageIndex(1);
            }}
          >
            Reset Filters
          </Button>
        </Empty>
      )}

      <ProductFilters 
        open={open} 
        onClose={closeDrawer} 
        onFilter={onFilter} 
      />
    </div>
  );
};

export default CategoryProductShowcase;