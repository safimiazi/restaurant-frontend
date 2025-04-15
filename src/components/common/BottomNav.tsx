import { Badge } from "antd";
import { GitCompare, Heart, ShoppingCart, User } from "lucide-react";
import { useCompare } from "../../hooks/CompareContext";
import { useGetSinglewishlistDataQuery } from "../../redux/api/wishlistApi/WishlistApi";
import { useGetSinglecartDataQuery } from "../../redux/api/cartApi/CartApi";

interface BottomNavProps {
  showCart: () => void;
  setWishlistOpen: (open: boolean) => void;
  setCompareOpen: (open: boolean) => void;
}

const BottomNav = ({ showCart, setWishlistOpen, setCompareOpen }: BottomNavProps) => {
  const { compareList } = useCompare();
  const { data: wishlistData } = useGetSinglewishlistDataQuery({});
  const { data: userCartData } = useGetSinglecartDataQuery(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-lg md:hidden">
      <div className="flex items-center justify-around py-2">
        {/* Wishlist */}
        <div className="flex flex-col items-center">
          <Badge 
            color="#3b82f6" 
            count={wishlistData?.data?.products?.length}
            className="text-xs font-medium"
            offset={[-5, 5]}
          >
            <button
              onClick={() => setWishlistOpen(true)}
              className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
            >
              <Heart size={20} strokeWidth={2} />
            </button>
          </Badge>
          <span className="text-xs text-gray-600 mt-1">Wishlist</span>
        </div>

        {/* Account */}
        <div className="flex flex-col items-center">
          <button
            className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <User size={20} strokeWidth={2} />
          </button>
          <span className="text-xs text-gray-600 mt-1">Account</span>
        </div>

        {/* Compare */}
        <div className="flex flex-col items-center">
          <Badge 
            color="#3b82f6" 
            count={compareList?.length}
            className="text-xs font-medium"
            offset={[-5, 5]}
          >
            <button
              onClick={() => setCompareOpen(true)}
              className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
            >
              <GitCompare size={20} strokeWidth={2} />
            </button>
          </Badge>
          <span className="text-xs text-gray-600 mt-1">Compare</span>
        </div>

        {/* Cart */}
        <div className="flex flex-col items-center">
          <Badge 
            color="#3b82f6" 
            count={userCartData?.data?.products?.length}
            className="text-xs font-medium"
            offset={[-5, 5]}
          >
            <button
              onClick={showCart}
              className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
            >
              <ShoppingCart size={20} strokeWidth={2} />
            </button>
          </Badge>
          <span className="text-xs text-gray-600 mt-1">Cart</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;