/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

const CustomTable = ({
  columns,
  data,
  pagination,
  onPaginationChange,
  globalFilter,
  onFilterChange,
  totalRecordCount,
  onBulkDelete,
  selectedRows,
  setSelectedRows,
  enableBulkDelete = false, // ✅ New Prop to enable/disable bulk delete
}: {
  columns: any[];
  data: any[];
  pagination: { pageIndex: number; pageSize: number };
  onPaginationChange: (pageIndex: number, pageSize: number) => void;
  globalFilter: string;
  onFilterChange: (value: string) => void;
  totalRecordCount: number;
  onBulkDelete: (selectedIds: string[]) => void;
  selectedRows: string[];
  setSelectedRows?: any;
  enableBulkDelete?: boolean; // ✅ New Prop to enable/disable bulk delete
}) => {
  const isDarkMode = false;

  // Handle selecting/deselecting rows
  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  // Handle bulk delete
  const handleBulkDelete = () => {
    if (enableBulkDelete && selectedRows.length > 0) {
      onBulkDelete(selectedRows);
      setSelectedRows([]); // Reset selection after deletion
    }
  };

  // Select/Deselect All
  const handleSelectAll = () => {
    if (!enableBulkDelete) return; // ✅ Prevent selection if bulk delete is disabled

    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row._id));
    }
  };

  const handlePageChange = (newPageIndex: number) => {
    onPaginationChange(newPageIndex, pagination.pageSize);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPaginationChange(pagination.pageIndex, Number(e.target.value));
  };

  return (
    <div
      className={`py-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Global Filter */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Search..."
          className={`p-3 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 transition-all ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-700 focus:ring-blue-500"
              : "bg-gray-50 border-gray-300 focus:ring-blue-400"
          }`}
        />

        {/* Selected Rows Count */}
        {enableBulkDelete && selectedRows.length > 0 && (
          <div
            className={`px-4 cursor-pointer py-2 rounded-full text-sm font-semibold ${
              isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800"
            }`}
            onClick={handleBulkDelete}
          >
            {selectedRows.length} delete
          </div>
        )}

        {/* Pagination Info */}
        <div
          className={`text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Showing{" "}
          <span className="font-semibold">
            {pagination.pageIndex * pagination.pageSize + 1}
          </span>
          {" - "}
          <span className="font-semibold">
            {Math.min(
              (pagination.pageIndex + 1) * pagination.pageSize,
              totalRecordCount
            )}
          </span>{" "}
          of <span className="font-semibold">{totalRecordCount}</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  rounded-xl  border border-gray-200">
        <table className="w-full ">
          <thead>
            <tr>
              {enableBulkDelete && (
                <th
                  className={`border p-2 text-left ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedRows?.length > 0 &&
                      selectedRows?.length === data?.length
                    }
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.accessorKey || col.header}
                  className={`border p-2 text-left ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  // className={`${
                  //   isDarkMode
                  //     ? rowIndex % 2 === 0
                  //       ? "bg-gray-800"
                  //       : "bg-gray-900"
                  //     : rowIndex % 2 === 0
                  //     ? "bg-sky-50"
                  //     : "bg-white"
                  // }`}
                >
                  {enableBulkDelete && (
                    <td
                      className={`border p-2 text-left ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-gray-100 border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row._id)}
                        onChange={() => handleSelectRow(row._id)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.accessorKey || col.header}
                      className={`border p-2 ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                      style={{
                        maxWidth: "250px",
                        overflowX: "auto",
                        minWidth: "150px",
                      }}
                    >
                      {col.Cell ? col.Cell({ row }) : row[col.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className={`text-center p-4 border ${
                    isDarkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <select
          value={pagination.pageSize}
          onChange={handlePageSizeChange}
          className={`p-2 border rounded ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <div>
          <button
            disabled={pagination.pageIndex === 0}
            onClick={() => handlePageChange(pagination.pageIndex - 1)}
            className={`px-4 py-2 border rounded mr-2 disabled:opacity-50 ${
              isDarkMode ? "border-gray-700" : "border-gray-300"
            }`}
          >
            Previous
          </button>
          <button
            disabled={
              (pagination.pageIndex + 1) * pagination.pageSize >=
              totalRecordCount
            }
            onClick={() => handlePageChange(pagination.pageIndex + 1)}
            className={`px-4 py-2 border rounded disabled:opacity-50 ${
              isDarkMode ? "border-gray-700" : "border-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
