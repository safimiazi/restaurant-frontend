"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCartImageSlider = ({ thumbnail, images, video }: any) => {
  const swiperRef = useRef<any>(null);

  const media = [
    thumbnail,
    ...(Array.isArray(images) ? images : []),
    video,
  ].filter(Boolean);
  console.log("ddd", media);
  // Handle the slide actions
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="w-full relative">
      {/* Custom Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Swiper */}
      <Swiper
        ref={swiperRef} // Attach the ref here directly
        modules={[Navigation]} // Add Navigation module
        spaceBetween={10}
        className="rounded-lg overflow-hidden"
      >
        {media.map((file: string, index: number) => (
          <SwiperSlide key={index}>
            {file.endsWith(".mp4") ? (
              <video
                src={file}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="relative w-full h-64">
                <Image
                  src={file}
                  alt={`product-media-${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCartImageSlider;
