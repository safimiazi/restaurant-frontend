/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingCart,
  Eye,
  GitCompare,
  Plus,
  Minus,
} from "lucide-react";
import truncateText from "../../utils/truncateText";
import { Tooltip, Image } from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useEffect, useRef, useState } from "react";
import ProductQuickView from "./ProductQuickView";
import { useCompare } from "../../hooks/CompareContext";
import {
  useGetSinglewishlistDataQuery,
  useWishlistPostMutation,
} from "../../redux/api/wishlistApi/WishlistApi";
import Swal from "sweetalert2";
import {
  useCartPostMutation,
  useCartRemoveMutation,
  useGetSinglecartDataQuery,
} from "../../redux/api/cartApi/CartApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/features/auth/loginRegistrationSlice";
import { RootState } from "../../redux/store";

const ProductCard = ({ product }: any) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [wishlistPost] = useWishlistPostMutation();
  const { data: wishlistData } = useGetSinglewishlistDataQuery({
  });
  const [cartPost, { isLoading: posting }] = useCartPostMutation();
  const [cartRemove, { isLoading: removing }] = useCartRemoveMutation();
  const { data: userCartData } = useGetSinglecartDataQuery();
  const swiperRef = useRef<SwiperType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isInWishlist, setIsWishListed] = useState(false);
  const { addToCompare } = useCompare();
  const calculateDiscountPercentage = () => {
    if (!product?.productOfferPrice || !product?.productSellingPrice) return 0;
    
    const offerPrice = Number(product.productOfferPrice);
    const sellingPrice = Number(product.productSellingPrice);
    
    if (offerPrice <= 0 || sellingPrice <= 0) return 0;
    
    return Math.floor(((sellingPrice - offerPrice) / sellingPrice) * 100);
  };
  
  const discountPercentage = calculateDiscountPercentage();
  console.log("discountPercentage", discountPercentage)
  
  const [cartProduct, setCartProduct] = useState(null);
  useEffect(() => {
    setCartProduct(
      userCartData?.data?.products?.find(
        (p: any) => p.product._id === product._id
      )
    );
  }, [userCartData]);

  const handleAddToCart = async (status: any) => {

    if (!user) return dispatch(openModal("login"));

    try {
      if (status === "addToCart") {
        await cartPost({
          product: product?._id,
          quantity: 1,
          price:product?.productOfferPrice || product?.productSellingPrice,
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

  useEffect(() => {
    if (wishlistData?.data?.products) {
      setIsWishListed(
        wishlistData.data.products.some((p) => p._id === product._id)
      );
    }
  }, [wishlistData, product._id]);

  const handleAddToWishlist = async () => {
    if (!user) return dispatch(openModal("login"));
    try {
      const res = await wishlistPost({
        product: product._id,
      }).unwrap();
      Swal.fire("Good job!", `${res.message}`, "success");
    } catch (error) {
      Swal.fire("Warning!", `${error?.data?.message}`, "warning");
      console.error("Failed to add to wishlist", error);
    }
  };

  return (
<div className="border hover:shadow transition-shadow duration-300 group flex flex-col border-gray-200 rounded-xl p-4 h-full bg-white relative">
  {/* Product Image Section */}
  <div className="duration-300 group flex flex-col rounded-xl h-full bg-white relative">
    {/* Discount Badge */}
    {discountPercentage > 0 && (
  <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10">
    {discountPercentage}% OFF
  </span>
)}

    {/* Image Gallery with Swiper */}
    <div className="relative w-full h-40 rounded-2xl flex items-center justify-center mb-2 overflow-hidden group">
      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={10}
        slidesPerView={1}
        loop
      >
        {/* Feature Image */}
        {product?.productFeatureImage && (
          <SwiperSlide>
            <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src={product.productFeatureImage}
                alt="Feature Image"
                className="w-full h-full z-[4000] object-cover"
                preview={false}
              />
            </div>
          </SwiperSlide>
        )}

        {/* Product Images */}
        {product?.productImages?.map((img: string, index: number) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex items-center justify-center bg-gray-100 transition-transform duration-300 group-hover:scale-105">
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

    {/* Quick Action Buttons (Compare & Quick View) */}
    <div className="absolute z-50 bottom-2 left-1/2 transform -translate-x-1/2 translate-y-4 flex gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
      <Tooltip title="Quick View">
        <div
          onClick={() => setModalOpen(true)}
          className="p-2 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors"
        >
          <Eye className="text-white" size={15} />
        </div>
      </Tooltip>
      <Tooltip title="Compare">
        <div
          onClick={() => addToCompare(product)}
          className="p-2 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors"
        >
          <GitCompare className="text-white" size={15} />
        </div>
      </Tooltip>
    </div>
  </div>

  {/* Swiper Navigation Controls */}
  <div className="mb-2 w-full relative flex justify-center items-center gap-5">
    <button
      onClick={() => swiperRef.current?.slidePrev()}
      className="z-50 cursor-pointer transition hover:bg-gray-100 p-1 rounded-full"
      aria-label="Previous image"
    >
      <ArrowLeft className="text-gray-500" />
    </button>
    <button
      onClick={() => swiperRef.current?.slideNext()}
      className="z-50 cursor-pointer transition hover:bg-gray-100 p-1 rounded-full"
      aria-label="Next image"
    >
      <ArrowRight className="text-gray-500" />
    </button>
  </div>

  {/* Product Information Section */}
  <div className="flex flex-col flex-grow">
    {/* Basic Info */}
    <h3 className="text-lg font-semibold">
      {truncateText(product?.productName, 20)}
    </h3>
    <p className="text-sm text-gray-600">
      {truncateText(product?.productDescription, 50)}
    </p>

    {/* Brand Information */}
    <div className="flex items-center gap-2 mt-2">
      {product?.productBrand?.image && (
        <img
          src={product.productBrand.image}
          alt="Brand"
          className="w-6 h-6 rounded-full"
        />
      )}
      <p className="text-sm text-gray-500">{product?.productBrand?.name}</p>
    </div>
    
    {/* Category */}
    <div>
      <p className="text-sm text-gray-500">
        Category: {product?.productCategory?.name}
      </p>
    </div>
{/* Pricing */}
<div className="mt-2 flex items-center gap-2">
  {product?.productOfferPrice > 0 && product?.productOfferPrice < product?.productSellingPrice ? (
    <>
      <p className="text-lg font-bold text-blue-500">
        ${product?.productOfferPrice} {/* Show offer price */}
      </p>
      <p className="text-sm line-through text-gray-500">
        ${product?.productSellingPrice} {/* Show original price */}
      </p>
    </>
  ) : (
    <p className="text-lg font-bold">
      ${product?.productSellingPrice} {/* Show only original price */}
    </p>
  )}
</div>

    {/* Color Variants */}
    <div className="flex gap-2 mt-2">
      {product?.variantcolor?.map((color: any, index: number) => (
        <span
          key={index}
          className="w-6 h-6 rounded-full border border-gray-300"
          style={{ backgroundColor: color?.colorCode }}
          aria-label={color?.colorName}
        ></span>
      ))}
    </div>

    {/* Stock Status */}
    <div>
      {product?.productStock > 0 ? (
        <p className="text-green-500">In Stock</p>
      ) : (
        <p className="text-red-500">Out of Stock</p>
      )}
    </div>

    {/* Action Buttons */}
    <div className="mt-auto flex justify-between items-center pt-4">
      {/* Wishlist Button */}
      <Tooltip
        title={`${isInWishlist ? "Already Wishlisted" : "Add to Wishlist"}`}
      >
        <button
          disabled={isInWishlist}
          className="cursor-pointer hover:scale-110 transition-transform"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            onClick={handleAddToWishlist}
            className={`text-blue-500 transition duration-300 ${
              isInWishlist ? "fill-current" : ""
            }`}
            size={24}
          />
        </button>
      </Tooltip>

      {/* View Details Link */}
      <Link
        to={`/details/${product?._id}`}
        className="text-blue-500 hover:text-blue-600 cursor-pointer underline transition-colors"
      >
        Details
      </Link>

      {/* Cart Controls */}
      <div>
        {product?.productStock > 0 && (
          <div>
            {cartProduct ? (
              <div className="flex items-center gap-2">
                <button
                  disabled={removing}
                  onClick={() => handleAddToCart("removeToCart")}
                  className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <div>{cartProduct?.quantity || 0}</div>
                <button
                  disabled={posting}
                  onClick={() => handleAddToCart("addToCart")}
                  className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            ) : (
              <Tooltip title="Add to Cart">
                <button
                  disabled={posting}
                  onClick={() => handleAddToCart("addToCart")}
                  className="hover:scale-110 cursor-pointer transition-transform"
                  aria-label="Add to cart"
                >
                  <ShoppingCart
                    className="text-blue-500 transition duration-300"
                    size={24}
                  />
                </button>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Quick View Modal */}
  <ProductQuickView
    isOpen={modalOpen}
    onClose={() => setModalOpen(false)}
    product={product}
  />
</div>
  );
};

export default ProductCard;
