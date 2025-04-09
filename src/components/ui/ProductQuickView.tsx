/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Modal, Image } from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import {
  useCartPostMutation,
  useCartRemoveMutation,
  useGetSinglecartDataQuery,
} from "../../redux/api/cartApi/CartApi";
import { Minus, Plus } from "lucide-react";
import { useGetSinglewishlistDataQuery } from "../../redux/api/wishlistApi/WishlistApi";

const ProductQuickView = ({ isOpen, onClose, product }: any) => {
  const [cartPost, { isLoading: posting }] = useCartPostMutation();
  const [cartRemove, { isLoading: removing }] = useCartRemoveMutation();
  const { data: userCartData } = useGetSinglecartDataQuery(null);
  const [isInWishlist, setIsWishListed] = useState(false);
  const { data: wishlistData } = useGetSinglewishlistDataQuery({
  });
  const swiperRef = useRef<SwiperType | null>(null);
  const discountPrice = product?.productOfferPrice
    ? product?.productSellingPrice - product?.productOfferPrice
    : null;

  const [cartProduct, setCartProduct] = useState(null);
  console.log(cartProduct);
  useEffect(() => {
    setCartProduct(
      userCartData?.data?.products?.find(
        (p: any) => p.product._id === product._id
      )
    );
  }, [userCartData]);

  useEffect(() => {
    if (wishlistData?.data?.products) {
      setIsWishListed(
        wishlistData.data.products.some((p) => p._id === product._id)
      );
    }
  }, [wishlistData, product._id]);

  const handleAddToCart = async (status: any) => {
    try {
      if (status === "addToCart") {
        await cartPost({
          product: product._id,
          quantity: 1,
          price: product?.productOfferPrice || product?.productSellingPrice,
        }).unwrap();
      } else if (status === "removeToCart") {
        await cartRemove({
          product: product._id,
        }).unwrap();
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      Swal.fire("Warning!", `${error?.data?.message}`, "warning");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const res = await wishlistPost({
        user: "60b8d6d5f4b88a001f07b82e",
        product: product._id,
      }).unwrap();
      Swal.fire("Good job!", `${res.message}`, "success");
    } catch (error) {
      Swal.fire("Warning!", `${error?.data?.message}`, "warning");
      console.error("Failed to add to wishlist", error);
    }
  };

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} centered>
      <div className="flex flex-col border-gray-200 rounded-xl p-4 h-full">
        {/* Image Section */}
        <div className="relative w-full h-60 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={(swiper: any) => (swiperRef.current = swiper)}
            spaceBetween={10}
            slidesPerView={1}
            loop
            navigation
          >
            {product?.productImages?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Image
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    preview={false}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{product?.productName}</h3>
          <p className="text-sm text-gray-600">{product?.productDescription}</p>

          {/* SKU and Category */}
          <p className="text-sm text-gray-500">SKU: {product?.skuCode}</p>
          <p className="text-sm text-gray-500">
            Category: {product?.productCategory?.name}
          </p>

          {/* Brand */}
          <div className="flex items-center gap-2 mt-2">
            {product?.productBrand?.image && (
              <img
                src={product?.productBrand?.image}
                alt="Brand"
                className="w-6 h-6 rounded-full"
              />
            )}
            <p className="text-sm text-gray-500">
              {product?.productBrand?.name}
            </p>
          </div>

          {/* Price Section */}
          <div className="mt-2 flex items-center gap-2">
            {discountPrice ? (
              <>
                <p className="text-lg font-bold text-blue-500">
                  ${discountPrice}
                </p>
                <p className="text-sm line-through text-gray-500">
                  ${product?.productSellingPrice}
                </p>
              </>
            ) : (
              <p className="text-lg font-bold">
                ${product?.productSellingPrice}
              </p>
            )}
          </div>

          {/* Stock & Purchase Point */}
          <p className="text-sm text-gray-500">
            Stock: {product?.productStock} {product?.productUnit?.name}
          </p>
          <p className="text-sm text-gray-500">
            Purchase Point: {product?.productPurchasePoint}
          </p>

          {/* Color Options */}
          {product?.variantcolor?.length > 0 && (
            <div className="flex gap-2 mt-2">
              <p className="text-sm text-gray-500">Available Colors:</p>
              {product?.variantcolor?.map((color, index) => (
                <span
                  key={index}
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: color?.colorCode }}
                ></span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handleAddToWishlist}
              className="py-2 px-4 rounded border text-blue-500"
            >
              {" "}
              {isInWishlist ? "Wishlisted" : "Wishlist"}
            </button>
            <div>
              {product?.productStock > 0 ? (
                <div>
                  {cartProduct ? (
                    <div className="flex items-center gap-2">
                      <button
                        disabled={removing}
                        onClick={() => handleAddToCart("removeToCart")}
                        className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                      >
                        <Minus size={15} />
                      </button>
                      <div>{cartProduct?.quantity || 0}</div>
                      <button
                        disabled={posting}
                        onClick={() => handleAddToCart("addToCart")}
                        className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  ) : (
                    <div onClick={() => handleAddToCart("addToCart")}>
                      <button
                        disabled={posting}
                        className="py-2 px-4 cursor-pointer rounded bg-blue-500 text-white"
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductQuickView;
