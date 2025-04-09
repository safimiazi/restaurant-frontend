/* eslint-disable @typescript-eslint/no-explicit-any */
export const CategoryFormater = (data: any) => {
    const categories = data
      ?.filter((item: any) => item.type === "parent")
      ?.map((category: any) => {
        return {
          id: category._id, // Include category ID
          name: category.name,
          subcategories: category.categories
            ?.filter((item: any) => item.type === "category")
            ?.map((subcategory: any) => {
              return {
                id: subcategory._id, // Include subcategory ID
                name: subcategory.name,
                subcategories: subcategory.subcategories?.map((subsubcategory: any) => {
                  return {
                    id: subsubcategory._id, // Include subsubcategory ID
                    name: subsubcategory.name,
                  };
                }),
              };
            }),
        };
      });
  
    return categories;
  };