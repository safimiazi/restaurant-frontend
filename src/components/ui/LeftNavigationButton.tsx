/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArrowLeft } from "lucide-react";

const LeftNavigationButton = ({ swiperRef }: any) => {
  return (
    <div
      onClick={() => swiperRef.current?.slidePrev()}
      className="p-1 cursor-pointer rounded-full  bg-white border border-gray-200  z-50 absolute -left-5 top-1/2 transform -translate-y-1/2 py-2   transition"
    >
      <ArrowLeft className="text-blue-500" />
    </div>
  );
};

export default LeftNavigationButton;
