
// export default Top;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Button, Spin } from "antd";
import {
  Search,
  Heart,
  ShoppingCart,
  MenuIcon,
  GitCompare,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Account from "../ui/Account";
import { useCompare } from "../../hooks/CompareContext";
import { useGetSinglewishlistDataQuery } from "../../redux/api/wishlistApi/WishlistApi";
import { useGetSinglecartDataQuery } from "../../redux/api/cartApi/CartApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetSearchProductsQuery } from "../../redux/api/productApi/ProductApi";
import { useState, useEffect, useRef } from "react";
import TopNav from "./TopNav";

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

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useGetSearchProductsQuery(
    { search: searchTerm }
    // { skip: searchTerm.length < 2 } // Don't search for very short terms
  );

  const { compareList } = useCompare();
  const { data: wishlistData } = useGetSinglewishlistDataQuery({});
  const { data: userCartData } = useGetSinglecartDataQuery(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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
    <div className="sticky top-0 z-40 bg-white shadow-sm">
    <div className="container mx-auto px-4 py-3 md:px-6 lg:px-8">
      <div className="flex items-center justify-between space-x-4">
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden z-50 p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <MenuIcon className="h-6 w-6 text-gray-700" />
        </button>
  
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <div className="flex items-center">
            <img 
              src="/brand-logo.png" 
              width="110px" 
              height="auto" 
              alt="Brand Logo"
              className="hover:opacity-90 transition-opacity"
            />
          </div>
        </NavLink>
  
        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-6 lg:mx-8" ref={searchRef}>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.length > 1 && setShowResults(true)}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
  
            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                {isLoading ? (
                  <div className="p-4 flex justify-center">
                    <Spin size="default" />
                  </div>
                ) : isError ? (
                  <div className="p-4 text-center text-red-500">
                    Error loading results
                  </div>
                ) : searchResults?.data?.products.length ? (
                  <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {searchResults.data.products.map((product: any) => (
                      <NavLink
                        key={product._id}
                        to={`/details/${product._id}`}
                        onClick={() => setShowResults(false)}
                      >
                        <div className="p-3 hover:bg-blue-50 transition-colors duration-150 flex items-center gap-3">
                          <img
                            src={product.productFeatureImage}
                            alt={product.productName}
                            className="w-12 h-12 object-contain rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">
                              {product.productName}
                            </h4>
                            <p className="text-sm text-gray-500 truncate">
                              {product.productBrand?.name} • {product.productCategory?.name}
                            </p>
                          </div>
                          <div className="text-blue-600 font-medium">
                            ${product.productPrice}
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
  
        {/* Right Side Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-5">
          {/* Compare */}
          <div className="flex flex-col items-center group">
            <Badge color="blue" count={compareList?.length}>
              <button 
                onClick={() => setCompareOpen(true)}
                className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-all duration-200"
              >
                <GitCompare className="h-5 w-5" />
              </button>
            </Badge>
            <span className="text-xs text-gray-600 mt-1 group-hover:text-blue-600">Compare</span>
          </div>
  
          {/* Wishlist */}
          <div className="flex flex-col items-center group">
            <Badge color="blue" count={wishlistData?.data?.products?.length}>
              <button 
                onClick={() => setWishlistOpen(true)}
                className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-all duration-200"
              >
                <Heart className="h-5 w-5" />
              </button>
            </Badge>
            <span className="text-xs text-gray-600 mt-1 group-hover:text-blue-600">Wishlist</span>
          </div>
  
          {/* Cart */}
          <div className="flex flex-col items-center group">
            <Badge color="blue" count={userCartData?.data?.products?.length}>
              <button 
                onClick={showCart}
                className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            </Badge>
            <span className="text-xs text-gray-600 mt-1 group-hover:text-blue-600">Cart</span>
          </div>
  
          {/* Account */}
          {user && <Account />}
        </div>
  
        {/* Mobile Login/Register */}
        <div className="md:hidden flex items-center space-x-2">
          <Button 
            color="primary" 
            variant="text"
            size="small"
            className="px-3 py-1.5 text-sm"
          >
            Login
          </Button>
          <Button 
            color="primary" 
            variant="solid"
            size="small"
            className="px-3 py-1.5 text-sm"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  
    {/* Mobile Search/Top Nav */}
    <div className="border-t border-gray-100">
      <TopNav
        showResults={showResults}
        searchResults={searchResults}
        searchRef={searchRef}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
    </div>
  </div>
  );
};

export default Top;
