/* eslint-disable @typescript-eslint/no-explicit-any */
export const CategoryFormater = (data: any) => {
  console.log("data: ", data); // Log the formatted categories

    const categories = data
      ?.filter((item: any) => item.type === "parent")
      ?.map((category: any) => {
        console.log("111: ", category); // Log each category
        return {
          id: category._id, // Include category ID
          name: category.name,
          image: category.image,
          subcategories: category.categories
            ?.filter((item: any) => item.type === "category")
            ?.map((subcategory: any) => {
              console.log("222: ", subcategory); // Log each subcategory
              return {
                id: subcategory._id, // Include subcategory ID
                name: subcategory.name,
                image: subcategory.image,
                subcategories: subcategory.subcategories?.map((subsubcategory: any) => {
                  return {
                    id: subsubcategory._id, // Include subsubcategory ID
                    name: subsubcategory.name,
                    image: subsubcategory.image,
                  };
                }),
              };
            }),
        };
      });
  console.log("333: ", categories); // Log the formatted categories
    return categories;
  };