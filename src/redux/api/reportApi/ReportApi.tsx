import { baseApi } from "../baseApi";

const ReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getInventoryReport: build.query({
      query: (params) => ({
        url: "/report/inventory-report",
        method: "GET",
        params: params,
      }),
    }),
    getSalesReport: build.query({
      query: ({ startDate, endDate }) => ({
        url: "/report/sales-report",
        method: "GET",

        params: { startDate, endDate },
      }),
    }),
    getDashboardSummary: build.query({
      query: () => ({
        url: "/report/dashboard-summmary",
        method: "GET",

      }),
    }),
  }),

  overrideExisting: false,
});

export const { useGetInventoryReportQuery, useGetSalesReportQuery, useGetDashboardSummaryQuery } = ReportApi;
