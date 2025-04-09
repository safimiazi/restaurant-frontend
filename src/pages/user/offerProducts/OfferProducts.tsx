/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetFilterProductsQuery } from "../../../redux/api/productApi/ProductApi";
import ProductCard from "../../../components/ui/ProductCart";
import { Pagination, Spin } from "antd";





const OfferProducts = () => {


  // 🔹 State for Pagination & Search
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 🔹 Fetch Products with Pagination & Search
  const { data: isOfferProducts, isLoading } = useGetFilterProductsQuery({
    pageIndex,
    pageSize,
    isDelete: false,
    isOffer: true,
  });


  // 🔹 Handle Page Change
  const handlePageChange = (page: number, size?: number) => {
    setPageIndex(page);
    if (size) setPageSize(size);
  };

 




    
  



  return (
    <>
      <div className="space-y-6">
        {/* Search Bar */}
      

        {/* Loader While Fetching Data */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {isOfferProducts?.data?.result?.map((product: any) => (
                <ProductCard
                  key={product._id}
                  product={product}
               
                />
              ))}
            </div>

            {/* Pagination Component */}
            <div className="flex justify-center mt-4">
              <Pagination
                current={pageIndex}
                pageSize={pageSize}
                total={isOfferProducts?.data?.meta?.total || 0}
                showSizeChanger
                onChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>

    </>
  );
};

export default OfferProducts;
