/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import MaxWidth from "../../../wrapper/MaxWidth";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useRef } from "react";
import RightNavigartionButton from "../../ui/RightNavigartionButton";
import LeftNavigationButton from "../../ui/LeftNavigationButton";
import SectionPadding from "../../../wrapper/SectionPadding";
import ProductCard from "../../ui/ProductCart";
import { useGetFilterProductsQuery } from "../../../redux/api/productApi/ProductApi";
import { Link } from "react-router-dom";
import { Spin } from "antd";

export default function BestSellingSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { data: offerProducts, isLoading } = useGetFilterProductsQuery({
    pageIndex: 1,
    pageSize: 8,
    isDelete: false,
    isBestSelling: true,
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <SectionPadding>
          <MaxWidth>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
                Best Selling Products
              </h2>
              <p className="text-blue-500 hover:underline transition-colors duration-500 cursor-pointer">
                <span>
                  <Link to={"/best-selling"}>All Products</Link>{" "}
                </span>
              </p>
            </div>
            <div className="relative">
              <LeftNavigationButton swiperRef={swiperRef} />
              <RightNavigartionButton swiperRef={swiperRef} />

              <Swiper
                modules={[Navigation, Pagination]}
                onSwiper={(swiper: any) => (swiperRef.current = swiper)}
                spaceBetween={20}
                autoHeight={false}
                slidesPerView={2}
                breakpoints={{
                  640: { slidesPerView: 4 },
                }}
                loop
                className="w-full h-full"
              >
                {offerProducts?.data?.result.map((product, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard key={index} product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </MaxWidth>
        </SectionPadding>
      )}
    </>
  );
}
