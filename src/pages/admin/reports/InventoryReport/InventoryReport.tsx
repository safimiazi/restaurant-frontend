/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  DatePicker,
  Button,
  Row,
  Col,
  Statistic,
  Typography,
  Space,
  Select,
  Divider,
  Grid,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetInventoryReportQuery } from "../../../../redux/api/reportApi/ReportApi";

const { Title, Text } = Typography;
const { Option } = Select;
const { useBreakpoint } = Grid;

interface ProductDetail {
  productName: string;
  skuCode: string;
  category: string;
  brand: string;
  currentStock: number;
  buyingPrice: number;
  sellingPrice: number;
  offerPrice: number;
  stockValue: number;
  status: string;
}

interface InventoryReport {
  summary: {
    totalProducts: number;
    outOfStock: number;
    lowStock: number;
    totalStockValue: number;
    totalPotentialRevenue: number;
    dateRange: {
      start: Date | null;
      end: Date | null;
    };
  };
  categorySummary: any[];
  brandSummary: any[];
  productDetails: ProductDetail[];
}

const InventoryReport: React.FC = () => {
  const screens = useBreakpoint();
  const [report, setReport] = useState<InventoryReport | null>(null);

  const [statusFilter, setStatusFilter] = useState<string | null>(null);

const [startDate, setStartDate] = useState<dayjs.Dayjs>(
    dayjs().subtract(30, "days")
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs());


  const handleDateChange =
    (type: "start" | "end") => (date: dayjs.Dayjs | null) => {
      if (!date) return;
      if (type === "start") {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    };

  const { data } = useGetInventoryReportQuery({
    startDate: startDate.format("YYYY-MM-DD"),
    endDate: endDate.format("YYYY-MM-DD"),
  });

  useEffect(() => {
    if (data) {
      setReport(data?.data);
    }
  }, [data]);

  const filteredProducts =
    report?.productDetails.filter(
      (product) => !statusFilter || product.status === statusFilter
    ) || [];

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      responsive: ['md'] as any,
    },
    {
      title: "SKU",
      dataIndex: "skuCode",
      key: "skuCode",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ['lg'] as any,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      responsive: ['lg'] as any,
    },
    {
      title: "Stock",
      dataIndex: "currentStock",
      key: "currentStock",
      align: "right" as const,
    },
    {
      title: "Buying Price",
      dataIndex: "buyingPrice",
      key: "buyingPrice",
      align: "right" as const,
      render: (value: number) => `৳${value.toFixed(2)}`,
      responsive: ['lg'] as any,
    },
    {
      title: "Selling Price",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      align: "right" as const,
      render: (value: number) => `৳${value.toFixed(2)}`,
      responsive: ['lg'] as any,
    },
    {
      title: "Stock Value",
      dataIndex: "stockValue",
      key: "stockValue",
      align: "right" as const,
      render: (value: number) => `৳${value.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "";
        if (status === "Out of Stock") color = "red";
        else if (status === "Low Stock") color = "orange";
        else color = "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const exportToCSV = () => {
    if (!report) return;

    // CSV export implementation
    const headers = Object.keys(columns).join(",");
    const rows = filteredProducts
      .map((product) =>
        columns
          .map((col) => `"${product[col.dataIndex as keyof ProductDetail]}"`)
          .join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `inventory_report_${dayjs().format("YYYY-MM-DD")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="inventory-report-page">
      <Title level={3}>Inventory Report</Title>

      <Card>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col xs={24} md={16}>
            <Space size="large" direction={screens.md ? "horizontal" : "vertical"} style={{ width: '100%' }}>
              <div>
                <Text strong>Date Range</Text>
                    <div className="flex flex-wrap gap-4 mb-6">
                          <div>
                            <label className="block mb-2">Start Date</label>
                            <DatePicker
                              value={startDate}
                              onChange={handleDateChange("start")}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block mb-2">End Date</label>
                            <DatePicker
                              value={endDate}
                              onChange={handleDateChange("end")}
                              className="w-full"
                            />
                          </div>
                        </div>
              </div>

              <div>
                <Text strong>Filter by Status</Text>
                <div style={{ marginTop: 8 }}>
                  <Select
                    placeholder="All Statuses"
                    style={{ width: screens.xs ? '100%' : 150 }}
                    allowClear
                    onChange={setStatusFilter}
                  >
                    <Option value="In Stock">In Stock</Option>
                    <Option value="Low Stock">Low Stock</Option>
                    <Option value="Out of Stock">Out of Stock</Option>
                  </Select>
                </div>
              </div>
            </Space>
          </Col>

          <Col xs={24} md={8} style={{ textAlign: screens.md ? 'right' : 'left' }}>
            <Button
              icon={<DownloadOutlined />}
              onClick={exportToCSV}
              disabled={!report}
              block={!screens.md}
            >
              Export CSV
            </Button>
          </Col>
        </Row>
      </Card>

      {report && (
        <>
          <Divider />

          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Products"
                  value={report.summary.totalProducts}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Out of Stock"
                  value={report.summary.outOfStock}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Low Stock"
                  value={report.summary.lowStock}
                  valueStyle={{ color: "#d46b08" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Stock Value"
                  value={report.summary.totalStockValue}
                  precision={2}
                  prefix="৳"
                />
              </Card>
            </Col>
          </Row>

          <Card title="Product Details">
            <Table
              columns={columns}
              dataSource={filteredProducts}
              rowKey="skuCode"
              pagination={{ pageSize: 10 }}
              scroll={{ x: true }}
              size={screens.xs ? 'small' : 'middle'}
            />
          </Card>

          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col xs={24} lg={12}>
              <Card title="Categories Summary">
                <Table
                  columns={[
                    { title: "Category", dataIndex: "name", key: "name" },
                    { 
                      title: "Type", 
                      dataIndex: "type", 
                      key: "type",
                      responsive: ['md'] as any,
                    },
                    {
                      title: "Products",
                      dataIndex: "productCount",
                      key: "productCount",
                      align: "right" as const,
                    },
                    {
                      title: "Stock Value",
                      dataIndex: "stockValue",
                      key: "stockValue",
                      align: "right" as const,
                      render: (value: number) => `৳${value.toFixed(2)}`,
                    },
                  ]}
                  dataSource={report.categorySummary}
                  rowKey="name"
                  pagination={false}
                  size={screens.xs ? 'small' : 'middle'}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Brands Summary">
                <Table
                  columns={[
                    { title: "Brand", dataIndex: "name", key: "name" },
                    {
                      title: "Featured",
                      dataIndex: "isFeatured",
                      key: "isFeatured",
                      render: (value: string) => (
                        <Tag color={value === "true" ? "green" : "default"}>
                          {value === "true" ? "Yes" : "No"}
                        </Tag>
                      ),
                      responsive: ['md'] as any,
                    },
                    {
                      title: "Products",
                      dataIndex: "productCount",
                      key: "productCount",
                      align: "right" as const,
                    },
                    {
                      title: "Stock Value",
                      dataIndex: "stockValue",
                      key: "stockValue",
                      align: "right" as const,
                      render: (value: number) => `৳${value.toFixed(2)}`,
                    },
                  ]}
                  dataSource={report.brandSummary}
                  rowKey="name"
                  pagination={false}
                  size={screens.xs ? 'small' : 'middle'}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default InventoryReport;