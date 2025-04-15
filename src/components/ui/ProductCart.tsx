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

  <div className="flex flex-col flex-grow">



  {/* Product Information Section */}
  <div className="flex flex-col flex-grow">
    {/* SKU and Sales Count */}
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs text-gray-500">SKU: {product?.skuCode}</span>
      {product?.salesCount > 0 && (
        <span className="text-xs text-gray-500">{product.salesCount} sold</span>
      )}
    </div>
    <Tooltip title={"View Details"} placement="top">

   {/* Product Name */}
   <Link to={`/details/${product?._id}`} className="group">
      <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
        {product?.productName}
      </h3>
    </Link>

    </Tooltip>
 

    {/* Brand and Category */}
    <div className="flex items-center justify-between mt-1">
      <div className="flex items-center gap-2">
        {product?.productBrand?.image && (
          <img
            src={product.productBrand.image}
            alt={product.productBrand.name}
            className="w-6 h-6 rounded-full object-cover"
          />
        )}
        <span className="text-sm text-gray-600">{product?.productBrand?.name}</span>
      </div>
      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
        {product?.productCategory?.name}
      </span>
    </div>

    {/* Variants */}
    {product?.productVariants?.length > 0 && (
      <div className="mt-2">
        <p className="text-xs text-gray-500 mb-1">Available:</p>
        <div className="flex flex-wrap gap-1">
          {product.productVariants.map((variant: any) => (
            <span 
              key={variant._id}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {variant.name}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Pricing */}
    <div className="mt-3 mb-2">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-gray-900">
          ৳{product?.productOfferPrice > 0 ? product.productOfferPrice : product?.productSellingPrice}
        </span>
        {product?.productOfferPrice > 0 && product?.productOfferPrice < product?.productSellingPrice && (
          <span className="text-sm line-through text-gray-400">
            ৳{product?.productSellingPrice}
          </span>
        )}
      </div>
  
    </div>

    {/* Stock Status */}
    <div className="mb-3">
      {product?.productStock > 0 ? (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm text-green-600">
            In Stock ({product.productStock} available)
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-sm text-red-600">Out of Stock</span>
        </div>
      )}
    </div>


  </div>

 {/* Action Buttons */}
<div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
  {/* Wishlist Button */}
  <Tooltip title={isInWishlist ? "Already wishlisted" : "Add to Wishlist"}>
    <button
      onClick={handleAddToWishlist}
      disabled={isInWishlist}
      className={`p-2 cursor-pointer rounded-full transition-all duration-300 ${isInWishlist 
        ? 'bg-pink-50 text-pink-500 hover:bg-pink-100' 
        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-pink-500'}`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        size={20} 
        className={isInWishlist ? "fill-current" : ""}
      />
    </button>
  </Tooltip>

  {/* Quick View Button */}
  <Tooltip title="Quick View">
    <button
      onClick={() => setModalOpen(true)}
      className="p-2 cursor-pointer rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300"
    >
      <Eye size={20} />
    </button>
  </Tooltip>

  {/* Compare Button */}
  <Tooltip title="Compare Product">
    <button
      onClick={() => addToCompare(product)}
      className="p-2 cursor-pointer rounded-full bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-500 transition-all duration-300"
    >
      <GitCompare size={20} />
    </button>
  </Tooltip>


  {/* Cart Controls */}
  {product?.productStock > 0 && (
    <div>
      {cartProduct ? (
        <div className="flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1">
          <button
            disabled={removing}
            onClick={() => handleAddToCart("removeToCart")}
            className="text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="text-sm font-medium text-blue-700 min-w-[20px] text-center">
            {cartProduct?.quantity || 0}
          </span>
          <button
            disabled={posting}
            onClick={() => handleAddToCart("addToCart")}
            className="text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      ) : (
        <Tooltip title="Add to Cart">
          <button
            disabled={posting}
            onClick={() => handleAddToCart("addToCart")}
            className="p-2 cursor-pointer rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </Tooltip>
      )}
    </div>
  )}
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


