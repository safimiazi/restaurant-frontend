/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Spin } from "antd";
import { useGetbrandDataQuery } from "../../../redux/api/brandApi/BrandApi";
import MaxWidth from "../../../wrapper/MaxWidth";
import SectionPadding from "../../../wrapper/SectionPadding";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const BrandSection = () => {
  const { data, isLoading } = useGetbrandDataQuery({
    isDelete: false,
  });

  const brands = data?.data?.result || [];

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <SectionPadding>
          <MaxWidth>
            <div className="py-12">
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
                Our Brands
              </h2>{" "}
              <Swiper
                slidesPerView={2}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 6,
                    spaceBetween: 40,
                  },
                  1280: {
                    slidesPerView: 8,
                    spaceBetween: 50,
                  },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {brands.map((brand) => (
                  <SwiperSlide key={brand._id}>
                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-24 object-contain"
                      />
                      <p className="mt-2 text-sm font-medium text-gray-700">
                        {brand.name}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </MaxWidth>
        </SectionPadding>
      )}
    </>
  );
};

export default BrandSection;
