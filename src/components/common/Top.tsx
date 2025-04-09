// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Badge } from "antd";
// import {
//   Search,
//   Heart,
//   ShoppingCart,
//   MenuIcon,
//   GitCompare,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import Account from "../ui/Account";
// import { useCompare } from "../../hooks/CompareContext";
// import { useGetSinglewishlistDataQuery } from "../../redux/api/wishlistApi/WishlistApi";
// import { useGetSinglecartDataQuery } from "../../redux/api/cartApi/CartApi";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { useGetSearchProductsQuery } from "../../redux/api/productApi/ProductApi";

// const Top = ({
//   setIsMobileMenuOpen,
//   isMobileMenuOpen,
//   showCart,
//   setWishlistOpen,
//   setCompareOpen,
// }: any) => {
//   const { user } = useSelector((state: RootState) => state.auth);
// const {data} = useGetSearchProductsQuery({
//   pageIndex, pageSize, search
// })
//   const { compareList } = useCompare();
//   const { data: wishlistData } = useGetSinglewishlistDataQuery({});
//   const { data: userCartData } = useGetSinglecartDataQuery(null);

//   return (
//     <div className="h-16  border-b border-gray-200  flex items-center justify-between px-4 md:px-10 bg-white shadow-sm">
//       <button
//         type="button"
//         className="md:hidden z-50 p-2  mr-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//       >
//         <MenuIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//       </button>

//       {/* Left: Logo */}
//       <NavLink to={"/"}>
//         <div className="text-2xl font-bold hover:cursor-pointer text-gray-800">
//           {/* 🛍️ MyShop */}
//           <img src="/brand-logo.png" width="120px" height="10px" alt="" />
//         </div>
//       </NavLink>
//       {/* Middle: Search Bar */}
//       <div className="flex-1 mx-4  md:flex">
//         <div className="relative w-full">
//           <input
//             type="text"
//             placeholder="Search for products..."
//             className="w-full p-2 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//           />
//           <Search
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//             size={18}
//           />
//         </div>
//       </div>

//       {/* Right: Wishlist, Login, Cart (Hidden in Mobile) */}
//       <div className="hidden md:flex gap-6 items-center">
//         <Badge color="blue" count={compareList?.length}>
//           <div className="p-2 rounded-full bg-gray-200">
//             <GitCompare
//               className="text-gray-600 hover:text-blue-500 transition  duration-300 cursor-pointer"
//               size={24}
//               onClick={() => setCompareOpen(true)}
//             />
//           </div>
//         </Badge>
//         <Badge color="blue" count={wishlistData?.data?.products?.length}>
//           <div className="p-2 rounded-full bg-gray-200">
//             <Heart
//               onClick={() => setWishlistOpen(true)}
//               className="text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
//               size={24}
//             />
//           </div>
//         </Badge>

//         <Badge color="blue" count={userCartData?.data?.products?.length}>
//           <div className="p-2 rounded-full bg-gray-200">
//             <ShoppingCart
//               className="text-gray-600 hover:text-blue-500 transition  duration-300 cursor-pointer"
//               size={24}
//               onClick={showCart}
//             />
//           </div>
//         </Badge>
//         {user && user !== null &&(<Account />)}
//       </div>
//     </div>
//   );
// };

// export default Top;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "antd";
import { Search, Heart, ShoppingCart, MenuIcon, GitCompare, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import Account from "../ui/Account";
import { useCompare } from "../../hooks/CompareContext";
import { useGetSinglewishlistDataQuery } from "../../redux/api/wishlistApi/WishlistApi";
import { useGetSinglecartDataQuery } from "../../redux/api/cartApi/CartApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetSearchProductsQuery } from "../../redux/api/productApi/ProductApi";
import { useState, useEffect, useRef } from "react";

const Top = ({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  showCart,
  setWishlistOpen,
  setCompareOpen,
}: any) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { data: searchResults, isLoading, isError } = useGetSearchProductsQuery(
    { search: searchTerm },
    // { skip: searchTerm.length < 2 } // Don't search for very short terms
  );

  const { compareList } = useCompare();
  const { data: wishlistData } = useGetSinglewishlistDataQuery({});
  const { data: userCartData } = useGetSinglecartDataQuery(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(e.target.value.length > 1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-10 bg-white shadow-sm relative">
      <button
        type="button"
        className="md:hidden z-50 p-2 mr-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <MenuIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Left: Logo */}
      <NavLink to={"/"}>
        <div className="text-2xl font-bold hover:cursor-pointer text-gray-800">
          <img src="/brand-logo.png" width="120px" height="10px" alt="" />
        </div>
      </NavLink>

      {/* Middle: Search Bar with Results */}
      <div className="flex-1 mx-4 md:flex" ref={searchRef}>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 pl-10 pr-8 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm.length > 1 && setShowResults(true)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          {searchTerm && (
            <X
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              size={18}
              onClick={clearSearch}
            />
          )}

          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : isError ? (
                <div className="p-4 text-center text-red-500">Error loading results</div>
              ) : searchResults?.data?.products.length ? (
                <div className="divide-y divide-gray-100">
                  {searchResults.data.products.map((product: any) => (
                    <NavLink 
                      key={product._id} 
                      to={`/details/${product._id}`}
                      onClick={() => setShowResults(false)}
                    >
                      <div className="p-3 hover:bg-gray-50 flex items-center gap-3">
                        <img 
                          src={product.productFeatureImage} 
                          alt={product.productName}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{product.productName}</div>
                          <div className="text-sm text-gray-500">
                            {product.productBrand?.name} • {product.productCategory?.name}
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">No products found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Wishlist, Login, Cart (Hidden in Mobile) */}
      <div className="hidden md:flex gap-6 items-center">
        <Badge color="blue" count={compareList?.length}>
          <div className="p-2 rounded-full bg-gray-200">
            <GitCompare
              className="text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
              size={24}
              onClick={() => setCompareOpen(true)}
            />
          </div>
        </Badge>
        <Badge color="blue" count={wishlistData?.data?.products?.length}>
          <div className="p-2 rounded-full bg-gray-200">
            <Heart
              onClick={() => setWishlistOpen(true)}
              className="text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
              size={24}
            />
          </div>
        </Badge>
        <Badge color="blue" count={userCartData?.data?.products?.length}>
          <div className="p-2 rounded-full bg-gray-200">
            <ShoppingCart
              className="text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
              size={24}
              onClick={showCart}
            />
          </div>
        </Badge>
        {user && user !== null && <Account />}
      </div>
    </div>
  );
};

export default Top;