/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/react"; // ✅ Import SwiperType correctly
import "swiper/css/bundle";

import LeftNavigationButton from "../../ui/LeftNavigationButton";
import RightNavigartionButton from "../../ui/RightNavigartionButton";
import ImageZoom from "../../ui/ImageZoom";
import { useGetSingleproductDataQuery } from "../../../redux/api/productApi/ProductApi";
import { useParams } from "react-router-dom";
import {
  useCartPostMutation,
  useCartRemoveMutation,
  useGetSinglecartDataQuery,
} from "../../../redux/api/cartApi/CartApi";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { openModal } from "../../../redux/features/auth/loginRegistrationSlice";

const Details = ({handleSimillerProduct} : any) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const { id } = useParams(); // Assuming id is the product id from the URL. You can change this based on your requirements.
  const { data: productDetails } = useGetSingleproductDataQuery({
    id,
  });
  
  useEffect(()=> {
    handleSimillerProduct(productDetails)
  },[productDetails])


  const [currentImage, setCurrentImage] = useState(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const { data: userCartData } = useGetSinglecartDataQuery();
  const [cartProduct, setCartProduct] = useState(null);
  const [cartPost, { isLoading: posting }] = useCartPostMutation();
  const [cartRemove, { isLoading: removing }] = useCartRemoveMutation();
  useEffect(() => {
    setCartProduct(
      userCartData?.data?.products?.find(
        (p: any) => p.product._id === productDetails?.data?._id
      )
    );
  }, [userCartData]);

  const handleAddToCart = async (status: any) => {
    if (!user) return dispatch(openModal("login"));

    try {
      if (status === "addToCart") {
        await cartPost({
          product: productDetails?.data?._id,
          quantity: 1,
          price:productDetails?.data?.product?.productOfferPrice || productDetails?.data?.productSellingPrice,
        }).unwrap();
      } else if (status === "removeToCart") {
        await cartRemove({
          product: productDetails?.data?._id,
        }).unwrap();
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      Swal.fire("Warning!", `${error?.data?.message}`, "warning");
    }
  };
  return (
    <div className="flex gap-4 p-4 items-start justify-center md:flex-row flex-col">
      {/* Product Image Section */}
      <div className="flex-1 flex flex-col gap-4 justify-center items-center  max-w-[500px]">
        {/* Image Zoom */}
        <div className="h-96 cursor-move w-96 border border-gray-200 flex items-center justify-center">
          <ImageZoom
            image={
              currentImage
                ? currentImage
                : productDetails?.data?.productFeatureImage
                ? productDetails?.data?.productFeatureImage
                : productDetails?.data?.productImages?.[0]
            }
          />
        </div>

        {/* Thumbnail Slider */}
        <div className="relative  w-2/3">
          <LeftNavigationButton swiperRef={swiperRef} />
          <RightNavigartionButton swiperRef={swiperRef} />

          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={(swiper: any) => (swiperRef.current = swiper)}
            spaceBetween={10}
            slidesPerView={3}
          >
            {productDetails?.data?.productImages?.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => setCurrentImage(img)}
                  className=" cursor-pointer h-20 border border-gray-200"
                >
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex-1 border border-gray-200 rounded-lg p-6  bg-white">
        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-900">
          {productDetails?.data?.productName}
        </h1>

        {/* Brand & Category */}
        <p className="text-lg text-gray-500 mt-1">
          <span className="font-semibold">Brand:</span>{" "}
          {productDetails?.data?.productBrand?.name} |
          <span className="font-semibold"> Category:</span>{" "}
          {productDetails?.data?.productCategory?.name}
        </p>

        {/* Product Description */}
        <p className="text-md text-gray-700 mt-3 leading-relaxed">
          {productDetails?.data?.productDescription}
        </p>

        {/* Pricing Details */}
        <div className="mt-4">
          <p className="text-xl font-semibold text-green-600">
            ${productDetails?.data?.productSellingPrice}
          </p>
          {productDetails?.data?.productOfferPrice > 0 && (
            <p className="text-md text-gray-500 line-through">
              ${productDetails?.data?.productOfferPrice}
            </p>
          )}
        </div>

        {/* SKU, Weight, Unit */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-600">
          <p>
            <span className="font-medium">SKU:</span>{" "}
            {productDetails?.data?.skuCode}
          </p>
      
        </div>

        {/* Stock Status */}
        <p
          className={`mt-4 text-lg font-semibold ${
            productDetails?.data?.productStock > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {productDetails?.data?.productStock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* Color Options */}
        {productDetails?.data?.variantcolor?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-gray-700 font-semibold mb-2">
              Choose a Color:
            </h3>
            <div className="flex gap-3">
              {productDetails?.data?.variantcolor.map((color, index) => (
                <span
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer transition hover:border-blue-500"
                  style={{ backgroundColor: color.colorCode }}
                ></span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4">
          {productDetails?.data?.productStock > 0 ? (
            <div>
              {cartProduct ? (
                <div className="flex items-center gap-2">
                  <button
                    disabled={removing}
                    onClick={() => handleAddToCart("removeToCart")}
                    className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                  >
                    <Minus size={25} />
                  </button>
                  <div>{cartProduct?.quantity || 0}</div>
                  <button
                    disabled={posting}
                    onClick={() => handleAddToCart("addToCart")}
                    className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                  >
                    <Plus size={25} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart("addToCart")}
                  className="mt-6 px-6 cursor-pointer py-3 text-white bg-gradient-to-r from-blue-500 to-blue-700 border border-blue-500 rounded-lg transition relative overflow-hidden shadow-md shadow-blue-500/50 hover:scale-105 hover:shadow-blue-400 active:scale-95"
                >
                  <span className="relative z-10 text-lg font-bold tracking-wide">
                    Add to Cart
                  </span>
                  {/* Glow Effect */}
                  <span className="absolute inset-0 bg-blue-400 opacity-50 blur-2xl animate-ping"></span>
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
