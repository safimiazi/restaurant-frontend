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

  if (isLoading) return <div>Loading...</div>;
  if (!data?.data?.result?.length) return <div>No carousel items found</div>;

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