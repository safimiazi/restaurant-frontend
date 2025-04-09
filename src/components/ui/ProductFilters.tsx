/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Select,
  Slider,
  DatePicker,
  Button,
  Row,
  Col,
  Drawer,
  Space,
  theme,
  Typography,
} from "antd";
import { useGetbrandDataQuery } from "../../redux/api/brandApi/BrandApi";
import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Title } = Typography;

// Custom Date Cell Renderer
const AppDateCellRender: DatePickerProps["cellRender"] = (current, info) => {
  const { token } = theme.useToken();
  const style: React.CSSProperties = {
    border: `2px solid ${token.colorPrimary}`,
    borderRadius: "50%",
    fontWeight: "bold",
  };

  if (info.type !== "date") return info.originNode;
  return (
    <div
      className="ant-picker-cell-inner"
      style={dayjs.isDayjs(current) && current.date() === 1 ? style : {}}
    >
      {dayjs.isDayjs(current) ? current.date() : current}
    </div>
  );
};

// Define Props Interface
interface ProductFiltersProps {
  onClose: () => void;
  open: boolean;
  onFilter: (filters: any) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onClose,
  open,
  onFilter,
}) => {
  const [brandSearch, setBrandSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  // Fetch brands from API
  const { data: brands } = useGetbrandDataQuery({
    isDelete: false,
    search: brandSearch,
  });

  // Handlers
  const handlePriceChange = (value: number[]) =>
    setPriceRange(value as [number, number]);
  const handleBrandChange = (value: string) => setSelectedBrand(value);
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) =>
    setDateRange(dates ?? [null, null]);

  // Apply filters and close drawer
  const handleApplyFilters = () => {
    onFilter({ priceRange, dateRange, selectedBrand });
    onClose();
  };

  return (
    <Drawer
      title="🔍 Advanced Product Filters"
      placement="left"
      closable
      onClose={onClose}
      open={open}
      width={350} // Adjusted width for better UI
      className="p-4"
    >
      <div className="p-2">
        <Title level={5} className="text-gray-600">
          Filter your products by price, date, and brand.
        </Title>
      </div>

      <Row gutter={[16, 16]} className="p-2">
        {/* Price Range Filter */}
        <Col span={24}>
          <div className="bg-gray-100 p-3 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-2">💰 Price Range</p>
            <Slider
              range
              min={0}
              max={5000}
              defaultValue={[0, 1000]}
              onChange={handlePriceChange}
              value={priceRange}
              tooltip={{ formatter: (value) => `$${value}` }}
            />
          </div>
        </Col>

        {/* Date Range Picker (NO RESTRICTION) */}
        <Col span={24}>
          <div className="bg-gray-100 p-3 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-2">📅 Select Date Range</p>
            <Space size={12} direction="vertical" className="w-full">
              <RangePicker
                className="w-full"
                onChange={handleDateChange}
                value={dateRange}
                cellRender={AppDateCellRender}
              />
            </Space>
          </div>
        </Col>

        {/* Brand Filter */}
        <Col span={24}>
          <div className="bg-gray-100 p-3 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-2">🏷️ Select Brand</p>
            <Select
              placeholder="Search & Select Brand"
              value={selectedBrand}
              showSearch
              
              onSearch={setBrandSearch}
              onChange={handleBrandChange}
              style={{ width: "100%" }}
              options={brands?.data?.result?.map((brand: any) => ({
                value: brand._id,
                label: brand.name,
              }))}
            />
          </div>
        </Col>
      </Row>

      {/* Apply Filters Button */}
      <div className="flex justify-end mt-4">
        <Button
          type="primary"
          className="w-full py-2 text-lg font-semibold"
          onClick={handleApplyFilters}
        >
          ✅ Apply Filters
        </Button>
      </div>
    </Drawer>
  );
};

export default ProductFilters;
