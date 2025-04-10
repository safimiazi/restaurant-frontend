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
import { Spin, Empty } from "antd";
import { ArrowRight, Tag } from "lucide-react";

export default function OfferProductsSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { data: bestSellingProducts, isLoading } = useGetFilterProductsQuery({
    pageIndex: 1,
    pageSize: 8,
    isDelete: false,
    isOffer: true,
  });

  return (
    <SectionPadding>
      <MaxWidth>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Tag className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
              Offer Products
            </h2>
          </div>
          <p className="text-blue-500 hover:underline transition-colors duration-500 cursor-pointer">
            <span className="flex items-center gap-1">
              <Link to={"/offer-products"}>More</Link>
              <ArrowRight className="w-4 h-4" />
            </span>
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spin size="large" />
          </div>
        ) : bestSellingProducts?.data?.result?.length ? (
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
              {bestSellingProducts.data.result.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard key={index} product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-50 to-blue-50 rounded-lg p-8 text-center">
            <Empty
              image={
                <svg
                  className="w-20 h-20 mx-auto text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              imageStyle={{ height: 80 }}
              description={
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    No offer products available
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Currently there are no products on special offer. Check back
                    later!
                  </p>
                  <Link
                    to="/products"
                    className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Browse All Products
                  </Link>
                </div>
              }
            />
          </div>
        )}
      </MaxWidth>
    </SectionPadding>
  );
}
