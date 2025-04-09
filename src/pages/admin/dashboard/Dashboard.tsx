/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetDashboardSummaryQuery } from "../../../redux/api/reportApi/ReportApi";

const Dashboard = () => {
  const { data } = useGetDashboardSummaryQuery({});
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

{/* Summary Cards - Updated with Profit */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products (unchanged) */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500 font-medium">Total Products</h3>
          <p className="text-3xl font-bold text-gray-800">{data?.data.summary.totalProducts}</p>
          <p className="text-sm text-gray-500 mt-2">Available in inventory</p>
        </div>
        
        {/* New Profit Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 font-medium">Today's Profit</h3>
          <p className="text-3xl font-bold text-green-600">
            {formatCurrency(data?.data.profit.today || 0)}
          </p>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Revenue: {formatCurrency(data?.data.revenue.today || 0)}</span>
            <span className="text-gray-500">{data?.data.revenue.todayOrders} orders</span>
          </div>
        </div>
        
        {/* Monthly Financials Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 font-medium">Monthly Profit</h3>
          <p className="text-3xl font-bold text-purple-600">
            {formatCurrency(data?.data.profit.thisMonth || 0)}
          </p>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Revenue: {formatCurrency(data?.data.revenue.thisMonth || 0)}</span>
            <span className="text-gray-500">{data?.data.summary.completedOrders} orders</span>
          </div>
        </div>
        
        {/* Orders Summary Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <h3 className="text-gray-500 font-medium">Orders Summary</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-gray-800">{data?.data.summary.totalOrders}</p>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-green-500">{data?.data.summary.completedOrders} completed</span>
                <span className="text-yellow-500">{data?.data.summary.pendingOrders} pending</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Abandoned carts</p>
              <p className="text-lg font-bold">{data?.data.summary.abandonedCarts}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Financial Comparison Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Profit Comparison Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-500">Today's Profit</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(data?.data.profit.today || 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {data?.data.revenue.todayOrders} orders
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-500">Yesterday's Profit</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(data?.data.profit.yesterday || 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {data?.data.revenue.yesterday ? "Orders: N/A" : "No orders"}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(data?.data.profit.thisMonth || 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {data?.data.summary.completedOrders} completed orders
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-gray-500">Last Month</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(data?.data.profit.lastMonth || 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {data?.data.revenue.lastMonth ? "Orders: N/A" : "No orders"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Profit vs Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit vs Revenue</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Today</span>
                <span className="text-sm font-medium text-gray-700">
                  Profit: {formatCurrency(data?.data.profit.today || 0)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ 
                    width: `${data?.data.revenue.today ? 
                      (Math.abs(data.data.profit.today) / data.data.revenue.today * 100) : 
                      0}%` 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Revenue: {formatCurrency(data?.data.revenue.today || 0)}
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">This Month</span>
                <span className="text-sm font-medium text-gray-700">
                  Profit: {formatCurrency(data?.data.profit.thisMonth || 0)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ 
                    width: `${data?.data.revenue.thisMonth ? 
                      (Math.abs(data.data.profit.thisMonth) / data.data.revenue.thisMonth * 100) : 
                      0}%` 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Revenue: {formatCurrency(data?.data.revenue.thisMonth || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>




      {/* ----------------------------------------- */}
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Products
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500 font-medium">Total Products</h3>
          <p className="text-3xl font-bold text-gray-800">{data?.data.summary.totalProducts}</p>
          <p className="text-sm text-gray-500 mt-2">Available in inventory</p>
        </div> */}
        
        {/* Total Brands */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 font-medium">Total Brands</h3>
          <p className="text-3xl font-bold text-gray-800">{data?.data.summary.totalBrands}</p>
          <p className="text-sm text-gray-500 mt-2">Registered brands</p>
        </div>
        
        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 font-medium">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800">{data?.data.summary.totalOrders}</p>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-green-500">{data?.data.summary.completedOrders} completed</span>
            <span className="text-yellow-500">{data?.data.summary.pendingOrders} pending</span>
          </div>
        </div>
        
        {/* Revenue */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <h3 className="text-gray-500 font-medium">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-gray-800">{formatCurrency(data?.data.revenue.thisMonth || 0)}</p>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Yesterday: {formatCurrency(data?.data.revenue.yesterday || 0)}</span>
            <span className="text-gray-500">Today: {formatCurrency(data?.data.revenue.today || 0)}</span>
          </div>
        </div>
      </div>
      
      {/* Revenue Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Comparison</h3>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(data?.data.revenue.thisMonth || 0)}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Last Month</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(data?.data.revenue.lastMonth || 0)}</p>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
              style={{ 
                width: `${data?.data.revenue.lastMonth ? 
                  (data.data.revenue.thisMonth / data.data.revenue.lastMonth * 100) : 
                  100}%` 
              }}
            ></div>
          </div>
        </div>
        
        {/* Coupons & Carts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Promotions & Carts</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-500">Active Coupons</p>
              <p className="text-2xl font-bold text-blue-600">{data?.data.summary.activeCoupons}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-500">Coupon Usage</p>
              <p className="text-2xl font-bold text-purple-600">{data?.data.summary.couponUsage}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-gray-500">Abandoned Carts</p>
              <p className="text-2xl font-bold text-orange-600">{data?.data.summary.abandonedCarts}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-500">Today's Orders</p>
              <p className="text-2xl font-bold text-green-600">{data?.data.revenue.todayOrders}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Best Sellers */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data.bestSellers.map((product: any) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={product.productFeatureImage} 
                          alt={product.productName} 
                        />
                      </div> */}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                        <div className="text-sm text-gray-500">{product.skuCode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.productBrand?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.productCategory?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.salesCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.productStock < 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {product.productStock} in stock
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <div className="space-y-4">
          {data?.data.recentOrders.map((order: any) => (
            <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium 
                  ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''} • Total: {formatCurrency(order.total)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment: {order.payment.type} • {order.paymentStatus}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.customer.name}</p>
                  <p className="text-xs text-gray-500">{order.customer.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

