/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import MaxWidth from "../../wrapper/MaxWidth";
import { useGetAllCarouselPhotoQuery } from "../../redux/api/CarouselApi";

export const Carousel = () => {
  const { data, isLoading } = useGetAllCarouselPhotoQuery({});

  if (isLoading) return (
    <MaxWidth>
      <div className="h-80 w-full bg-gray-200 rounded-2xl flex items-center justify-center">
        <div className="text-xl text-gray-500">Loading carousel...</div>
      </div>
    </MaxWidth>
  );

  // Empty state with nice design
  if (!data?.data?.result?.length) return (
    <MaxWidth>
      <div className="h-80 w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl flex flex-col items-center justify-center gap-4 p-8 text-center">
        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-medium text-gray-600">No carousel items available</h3>
        <p className="text-gray-500">We couldn't find any images to display in the carousel</p>
      </div>
    </MaxWidth>
  );

  return (
    <MaxWidth>
      <div className="-z-20">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
          }}
          loop={true}
          className="rounded-2xl shadow-lg -z-20"
        >
          {data.data.result.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full max-h-80 flex items-center justify-center bg-gray-100 rounded-2xl overflow-hidden">
                <Image
                  src={item?.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover -z-20"
                  preview={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MaxWidth>
  );
};