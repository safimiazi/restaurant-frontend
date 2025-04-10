/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "antd";
import { GitCompare, Heart, ShoppingCart, User } from "lucide-react";
import { useCompare } from "../../hooks/CompareContext";
import { useGetSinglewishlistDataQuery } from "../../redux/api/wishlistApi/WishlistApi";
import { useGetSinglecartDataQuery } from "../../redux/api/cartApi/CartApi";

const BottomNav = ({ showCart, setWishlistOpen, setCompareOpen }: any) => {
  const { compareList } = useCompare();
  const { data: wishlistData } = useGetSinglewishlistDataQuery({});
  const { data: userCartData } = useGetSinglecartDataQuery(null);

  return (
    <div className="py-1 md:z-[1000] border-t border-gray-200 fixed bottom-0 w-full bg-white flex justify-around items-center md:hidden shadow-lg">
      {/* Wishlist Icon */}
      <Badge color="blue" count={wishlistData?.data?.products?.length}>
        <div className="flex flex-col items-center p-2 rounded-full  transition duration-300 cursor-pointer">
          <div className="p-2 rounded-full bg-gray-200">
            <Heart
              onClick={() => setWishlistOpen(true)}
              className="text-gray-600 hover:text-blue-500 transition duration-300"
              size={20} // Reduced icon size
            />
          </div>
          <span className="text-xs text-gray-600 mt-1">Wishlist</span>{" "}
          {/* Text below the icon */}
        </div>
      </Badge>
      <Badge color="blue" count={wishlistData?.data?.products?.length}>
        <div className="flex flex-col items-center p-2 rounded-full  transition duration-300 cursor-pointer">
          <div className="p-2 rounded-full bg-gray-200">
            <User
              onClick={() => setWishlistOpen(true)}
              className="text-gray-600 hover:text-blue-500 transition duration-300"
              size={20} // Reduced icon size
            />
          </div>
          <span className="text-xs text-gray-600 mt-1">Account</span>{" "}
          {/* Text below the icon */}
        </div>
      </Badge>

      {/* Compare Icon */}
      <Badge color="blue" count={compareList?.length}>
        <div className="flex flex-col items-center p-2 rounded-full  transition duration-300 cursor-pointer">
          <div className="p-2 rounded-full bg-gray-200">
            <GitCompare
              className="text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
              size={20} // Reduced icon size
              onClick={() => setCompareOpen(true)}
            />
          </div>
          <span className="text-xs text-gray-600 mt-1">Compare</span>{" "}
          {/* Text below the icon */}
        </div>
      </Badge>

      {/* Cart Icon */}
      <Badge color="blue" count={userCartData?.data?.products?.length}>
        <div className="flex flex-col items-center p-2 rounded-full  transition duration-300 cursor-pointer">
          <div className="p-2 rounded-full bg-gray-200">
            <ShoppingCart
              className="text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
              size={20} // Reduced icon size
              onClick={showCart}
            />
          </div>
          <span className="text-xs text-gray-600 mt-1">Cart</span>{" "}
          {/* Text below the icon */}
        </div>
      </Badge>
    </div>
  );
};

export default BottomNav;
