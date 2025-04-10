/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const TopNav = ({
  searchRef,
  searchTerm,
  isLoading,
  isError,
  searchResults,
  showResults,
  setShowResults,
  handleSearchChange,
  clearSearch,
} : any) => {
  return (

  

    <div className="flex-1 border-b border-gray-200  flex items-center justify-between pb-1 px-4 md:px-10 bg-white shadow-sm relative" ref={searchRef}>
      {/* Mobile Search Bar - Always visible */}
      <div className="relative py-1 w-full block md:hidden">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2  pl-12 pr-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-base"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => searchTerm.length > 1 && setShowResults(true)}
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={20}
        />
        {searchTerm && (
          <X
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            size={20}
            onClick={clearSearch}
          />
        )}
      </div>

  

      {/* Search Results Dropdown - Shared for both mobile and desktop */}
      {showResults && (
        <div className="absolute z-50 mt-1 w-[calc(100%-2rem)] md:w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
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
  );
};

export default TopNav;