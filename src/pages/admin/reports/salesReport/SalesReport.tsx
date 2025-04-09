// SalesReportPage.tsx
import React, { useState } from "react";
import { DatePicker, Card, Table, Spin ,Grid} from "antd";
import dayjs from "dayjs";
import { useGetSalesReportQuery } from "../../../../redux/api/reportApi/ReportApi";
const { useBreakpoint } = Grid;

interface SalesReport {
  summary: {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    paymentMethods: Record<string, number>;
    orderStatuses: Record<string, number>;
  };
  topProducts: Array<{
    productName: string;
    skuCode: string;
    quantitySold: number;
    totalRevenue: number;
  }>;
  recentOrders: Array<{
    transactionId: string;
    customerName: string;
    totalAmount: number;
    status: string;
    date: string;
  }>;
}

const SalesReport: React.FC = () => {
    const screens = useBreakpoint();

  const [startDate, setStartDate] = useState<dayjs.Dayjs>(
    dayjs().subtract(30, "days")
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs());

  const { data: report, isLoading } = useGetSalesReportQuery({
    startDate: startDate.format("YYYY-MM-DD"),
    endDate: endDate.format("YYYY-MM-DD"),
  });

  const handleDateChange =
    (type: "start" | "end") => (date: dayjs.Dayjs | null) => {
      if (!date) return;
      if (type === "start") {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    };

  const paymentMethodsColumns = [
    {
      title: "Payment Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
  ];

  const topProductsColumns = [
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "SKU",
      dataIndex: "skuCode",
      key: "skuCode",
    },
    {
      title: "Quantity Sold",
      dataIndex: "quantitySold",
      key: "quantitySold",
    },
    {
      title: "Revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
  ];

  const recentOrdersColumns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("MMM D, YYYY h:mm A"),
    },
  ];

  return (
    <div className="p-4">
      <Card title="Sales Report" className="mb-4">
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

        {isLoading && <Spin tip="Generating report..." />}

        {report && (
          <div className="space-y-6">
            {/* Summary Section */}
            <Card title="Summary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium">Total Orders</h3>
                  <p className="text-2xl">
                    {report?.data?.summary.totalOrders}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium">Total Revenue (with delivery cost)</h3>
                  <p className="text-2xl">
                    ${report?.data?.summary.totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium">Avg. Order Value (with delivery cost)</h3>
                  <p className="text-2xl">
                    ${report?.data?.summary.averageOrderValue.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card title="Payment Methods">
              <Table
                scroll={{ x: true }}
                size={screens.xs ? "small" : "middle"}
                columns={paymentMethodsColumns}
                dataSource={Object.entries(
                  report?.data?.summary.paymentMethods
                ).map(([method, count]) => ({
                  key: method,
                  method,
                  count,
                }))}
                pagination={false}
              />
            </Card>

            {/* Order Statuses */}
            <Card title="Order Statuses">
              <Table
                scroll={{ x: true }}
                size={screens.xs ? "small" : "middle"}
                columns={[
                  { title: "Status", dataIndex: "status", key: "status" },
                  { title: "Count", dataIndex: "count", key: "count" },
                ]}
                dataSource={Object.entries(
                  report?.data?.summary.orderStatuses
                ).map(([status, count]) => ({
                  key: status,
                  status,
                  count,
                }))}
                pagination={false}
              />
            </Card>

            {/* Top Products */}
            <Card title="Top Selling Products">
              <Table
                scroll={{ x: true }}
                size={screens.xs ? "small" : "middle"}
                columns={topProductsColumns}
                dataSource={report?.data?.topProducts}
                pagination={false}
              />
            </Card>

            {/* Recent Orders */}
            <Card title="Recent Orders">
              <Table
                scroll={{ x: true }}
                size={screens.xs ? "small" : "middle"}
                columns={recentOrdersColumns}
                dataSource={report?.data?.recentOrders}
                pagination={false}
              />
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SalesReport;
