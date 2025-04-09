/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "antd";
import { GitCompare, Heart, ShoppingCart } from "lucide-react";
import Account from "../ui/Account";
import { useCompare } from "../../hooks/CompareContext";
import { useGetSinglewishlistDataQuery } from "../../redux/api/wishlistApi/WishlistApi";
import { useGetSinglecartDataQuery } from "../../redux/api/cartApi/CartApi";

const BottomNav = ({ showCart, setWishlistOpen, setCompareOpen }: any) => {
  const { compareList } = useCompare();
  const { data: wishlistData } = useGetSinglewishlistDataQuery({
    
  });
      const { data: userCartData } = useGetSinglecartDataQuery(null);
  
  return (
    <div className="py-4 md:z-[1000] border-t border-gray-200 fixed bottom-0 w-full bg-white flex justify-around items-center md:hidden shadow-lg">
      <Badge color="blue" count={wishlistData?.data?.products?.length}>
        <div className="p-2 rounded-full bg-gray-200">
          <Heart
            onClick={() => setWishlistOpen(true)}
            className="text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
            size={24}
          />
        </div>
      </Badge>
      <Account/>
      <Badge color="blue" count={compareList?.length}>
        <div className="p-2 rounded-full bg-gray-200">
          <GitCompare
            className="text-gray-600 hover:text-blue-500 transition  duration-300 cursor-pointer"
            size={24}
            onClick={()=> setCompareOpen(true)}
          />
        </div>
      </Badge>
      <Badge color="blue" count={userCartData?.data?.products?.length}>
        <div className="p-2 rounded-full bg-gray-200">
          <ShoppingCart
            className="text-gray-600 hover:text-blue-500 transition  duration-300 cursor-pointer"
            size={24}
            onClick={showCart}
          />
        </div>
      </Badge>
    </div>
  );
};

export default BottomNav;
