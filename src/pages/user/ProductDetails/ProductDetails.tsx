/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Details from "../../../components/pages/ProductDetails/Details";
// import ProductReviews from "../../../components/pages/ProductDetails/ProductReviews";
// import SimilarProducts from "../../../components/pages/ProductDetails/SimilarProducts";
import { useGetProductByCategoryQuery } from "../../../redux/api/productApi/ProductApi";
import MaxWidth from "../../../wrapper/MaxWidth";

const ProductDetails = () => {
  const [productCategoryId, setProductCategoryId] = useState(null);
  const { data: products } = useGetProductByCategoryQuery({
    isDelete: false,
    id: productCategoryId,
  });

  const handleSimillerProduct = (product: any) => {
    setProductCategoryId(product?.productCategory?._id);
  };

  console.log("handleSimillerProduct", products)
  return (
    <MaxWidth>
      <div>
        <Details handleSimillerProduct={handleSimillerProduct} />
        {/* <ProductReviews />
        <SimilarProducts /> */}
      </div>
    </MaxWidth>
  );
};

export default ProductDetails;
