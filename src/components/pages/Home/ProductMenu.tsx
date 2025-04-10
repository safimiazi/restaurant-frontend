/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCategoryForSidebarQuery } from "../../../redux/api/categoryApi/CategoryApi";
import MaxWidth from "../../../wrapper/MaxWidth";
import SectionPadding from "../../../wrapper/SectionPadding";
import { Tag, ChefHat, Utensils, PlusCircle, AlertCircle } from "lucide-react";
import { CategoryFormater } from "../../common/CategoryFormater";
import { Button } from "antd";
import { Link } from "react-router-dom";

const ProductMenu = () => {
  const { data, isLoading } = useGetCategoryForSidebarQuery({
    isDelete: false,
  });
  const categories = CategoryFormater(data?.data?.result);



  if (isLoading) {
    return (
      <SectionPadding>
        <MaxWidth>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-pulse flex flex-col items-center">
              <ChefHat className="w-12 h-12 text-gray-300 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </MaxWidth>
      </SectionPadding>
    );
  }

  return (
    <SectionPadding>
      <MaxWidth>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Tag className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              Our Menu Categories
            </h2>
          </div>
        </div>

        {categories?.length ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-5">
              {categories?.map((category: any) => (
                <Link
                    to={`/products/${category.id}`}
                  key={category.id}
                  className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm h-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>

                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                        <Utensils className="w-10 h-10 text-blue-500" />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 z-20 p-3 text-center">
                      <h3 className="text-white font-semibold text-sm drop-shadow-md">
                        {category.name}
                      </h3>
                      <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-block px-2 py-1 text-xs bg-white/90 text-blue-600 rounded-full">
                          View Items
                        </span>
                      </div>
                    </div>

                    <div className="absolute top-2 right-2 z-20">
                      <div className="bg-white/90 text-blue-600 rounded-full p-1">
                        <PlusCircle className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </>
        ) : (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-dashed border-blue-200">
            <div className="max-w-md mx-auto">
              <div className="relative inline-block mb-4">
                <AlertCircle className="w-16 h-16 text-blue-400" />
                <ChefHat className="w-8 h-8 text-blue-600 absolute -bottom-2 -right-2 bg-white p-1 rounded-full border border-blue-200" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-3">
                Menu Categories Coming Soon!
              </h3>
              <p className="text-gray-600 mb-6">
                We're currently working on our delicious menu categories. Check
                back soon or explore our featured items below.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  type="primary"
                  className="bg-blue-500 hover:bg-blue-600 h-auto py-2"
                >
                  <Link to="/products" className="flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    Explore Featured Items
                  </Link>
                </Button>
                <Button className="h-auto py-2">
                  <Link to="/contact" className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4" />
                    Suggest a Category
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </MaxWidth>
    </SectionPadding>
  );
};

export default ProductMenu;
