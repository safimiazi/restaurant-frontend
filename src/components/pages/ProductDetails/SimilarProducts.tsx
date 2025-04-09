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

const products = [
  {
    name: 'Apple iMac 27"',
    description:
      "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
    price: "$1199",
    colors: ["black", "blue", "pink", "green"],
    image: [
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
  {
    name: 'Apple iMac 27"',
    description:
      "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
    price: "$1199",
    colors: ["black", "blue", "pink", "green"],
    image: [
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
  {
    name: 'Apple iMac 27"',
    description:
      "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
    price: "$1199",
    colors: ["black", "blue", "pink", "green"],
    image: [
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
  {
    name: 'Apple iMac 27"',
    description:
      "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
    price: "$1199",
    colors: ["black", "blue", "pink", "green"],
    image: [
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
  {
    name: 'Apple iMac 27"',
    description:
      "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
    price: "$1199",
    colors: ["black", "blue", "pink", "green"],
    image: [
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
  {
    name: 'Apple iMac 27"',
    description:
      "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
    price: "$1199",
    colors: ["black", "blue", "pink", "green"],
    image: [
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
  {
    name: 'Apple iMac 27"',
    description:
      "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
    price: "$1199",
    colors: ["black", "blue", "pink", "green"],
    image: [
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
];
export default function SimilarProducts() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <SectionPadding>
      <MaxWidth>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            Similar Products
          </h2>
          <p className="text-blue-500 hover:underline transition-colors duration-500 cursor-pointer">
            All Products
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
              640: { slidesPerView: 5 },
            }}
            loop
            className="w-full h-full"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard key={index} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MaxWidth>
    </SectionPadding>
  );
}


