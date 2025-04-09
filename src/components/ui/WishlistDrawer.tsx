/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { HeartFilled } from "@ant-design/icons";
import { Drawer, message, Tag, Space, Typography, Image, Button } from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import {
  useGetSinglewishlistDataQuery,
  useWishlistDeleteMutation,
} from "../../redux/api/wishlistApi/WishlistApi";
import { ArrowLeft, ArrowRight } from "lucide-react";
import truncateText from "../../utils/truncateText";
import { useRef } from "react";
import Swal from "sweetalert2";

const { Title } = Typography;

const WishlistDrawer = ({ onClose, open }: any) => {
  const { data: wishlistData, isLoading, error } = useGetSinglewishlistDataQuery({
  });

  const [wishlistDelete] = useWishlistDeleteMutation();

  const swiperRefs = useRef<any[]>([]); // ✅ Array of refs

  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await wishlistDelete({ userId : "60b8d6d5f4b88a001f07b82e",  productId }).unwrap();
      Swal.fire("Good job!", `${res?.message || "Product removed from wishlist"}`, "success");
      message.success("Product removed from wishlist");
    } catch (err: any) {
      Swal.fire("Warning!", `${err?.data?.message || "Something went wrong"}`, "warning");
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Drawer
      title={
        <Space>
          <HeartFilled style={{ color: "#ff4d4f" }} />
          <Title level={5} style={{ margin: 0 }}>Your Wishlist</Title>
          {wishlistData?.data?.products && (
            <Tag color="blue">{wishlistData.data.products.length} items</Tag>
          )}
        </Space>
      }
      placement="left"
      onClose={handleClose}
      open={open}
      width={350}
    >
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading wishlist data</div>}
      {!isLoading && !error && wishlistData?.data?.products?.length === 0 && (
        <div>No products in your wishlist</div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {wishlistData?.data?.products?.map((product: any, inx: number) => {
          if (!swiperRefs.current[inx]) {
            swiperRefs.current[inx] = null; // ✅ Initialize ref properly
          }

          return (
            <div
              key={inx}
              className="border hover:shadow transition-shadow duration-300 group flex flex-col border-gray-200 rounded-xl p-4 h-full bg-white relative"
            >
              {/* Image Section */}
              <div className="relative w-full h-40 rounded-2xl flex items-center justify-center mb-2 overflow-hidden">
                <Swiper
                  modules={[Navigation, Pagination]}
                  onSwiper={(swiper) => (swiperRefs.current[inx] = swiper)} // ✅ Assign correct ref
                  spaceBetween={10}
                  slidesPerView={1}
                  loop
                >
                  {product?.productFeatureImage && (
                    <SwiperSlide>
                      <Image
                        src={product.productFeatureImage}
                        alt="Feature Image"
                        className="w-full h-full object-cover"
                        preview={false}
                      />
                    </SwiperSlide>
                  )}
                  {product?.productImages?.map((img: string, index: number) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                        preview={false}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Navigation Buttons */}
              <div className="mb-2 w-full relative flex justify-center items-center gap-5">
                <div onClick={() => swiperRefs.current[inx]?.slidePrev()} className="cursor-pointer">
                  <ArrowLeft className="text-gray-500" />
                </div>
                <div onClick={() => swiperRefs.current[inx]?.slideNext()} className="cursor-pointer">
                  <ArrowRight className="text-gray-500" />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold">{truncateText(product?.productName, 20)}</h3>
                <p className="text-sm text-gray-600">{truncateText(product?.productDescription, 50)}</p>

                {/* Brand with Logo */}
                <div className="flex items-center gap-2 mt-2">
                  {product?.productBrand?.image && (
                    <img src={product.productBrand.image} alt="Brand" className="w-6 h-6 rounded-full" />
                  )}
                  <p className="text-sm text-gray-500">{product?.productBrand?.name}</p>
                </div>
                <p className="text-sm text-gray-500">Category: {product?.productCategory?.name}</p>

                {/* Price Section */}
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-lg font-bold">${product?.productSellingPrice}</p>
                </div>

                {/* Delete Button */}
                <Button className="mt-2 bg-blue-500" onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};

export default WishlistDrawer;
