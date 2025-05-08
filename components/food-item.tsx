"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Tags } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import ProductCartImageSlider from "./pageComponent/productPage/ProductCartImageSlider";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function FoodItem({ item }: any) {
  const { addToCart } = useCart();
  const [selectedVariants, setSelectedVariants] = useState<Record<string, any>>({});

  const handleVariantSelect = (variantName: string, option: any) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: option
    }));
  };

  const calculateTotalPrice = () => {
    let total = Number(item.price);
    Object.values(selectedVariants).forEach((option: any) => {
      total += Number(option.price) || 0;
    });
    return total;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <Link href={`/food/${item.slug || item._id}`}>
        <CardContent className="p-0 flex-1">
          {/* Image/Video Slider */}
          <div className="relative  w-full">
            <ProductCartImageSlider
              thumbnail={item.thumbnail}
              images={item.images}
              video={item.video}
            />
          </div>

          {/* Product Details */}
          <div className="p-4 space-y-2">
            {/* Brand Info */}
            {item.brand && (
              <div className="flex items-center gap-2 mb-2">
                <div className="relative h-6 w-6 rounded-full overflow-hidden">
                  <Image
                    src={item.brand.brandImage}
                    alt={item.brand.brandName}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.brand.brandName}
                </span>
              </div>
            )}

            {/* Product Name and Price */}
            <div className="flex justify-between items-start">
              <h3 className="font-semibold line-clamp-1">{item.name}</h3>
              <p className="font-medium text-primary ml-2 whitespace-nowrap">
              ৳ {item.price.toFixed(2)}
                {item.discount > 0 && (
                  <span className="text-xs text-muted-foreground line-through ml-1">
                    ৳ {(item.price + item.discount).toFixed(2)}
                  </span>
                )}
              </p>
            </div>

            {/* Category & Subcategory */}
            <div className="flex flex-wrap gap-1">
              {item.category && (
                <Badge variant="outline" className="text-xs">
                  {item.category.name}
                </Badge>
              )}
              {/* {item.subcategories?.map((sub: any) => (
                <Badge key={sub._id} variant="outline" className="text-xs">
                  {sub.name}
                </Badge>
              ))} */}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>

         {/* Variants Section */}
      {item.variant?.map((variant: any) => (
        <div key={variant._id} className="p-4 border-t">
          <h4 className="font-medium mb-2">{variant.name}</h4>
          <div className="flex flex-wrap gap-2">
            {variant.attributeOption?.map((option: any) => (
              <button
                key={option._id}
                onClick={() => handleVariantSelect(variant.name, option)}
                className={`relative rounded-lg border p-2 w-24 h-24 flex flex-col items-center justify-center transition-all ${
                  selectedVariants[variant.name]?._id === option._id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-muted hover:border-primary"
                }`}
              >
                {option.image && (
                  <div className="relative w-12 h-12 mb-1">
                    <Image
                      src={option.image}
                      alt={option.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <span className="text-xs font-medium">{option.name}</span>
                {option.price > 0 && (
                  <span className="text-xs text-primary mt-1">
                    +৳ {option.price.toFixed(2)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

            {/* Featured Badge */}
            {item.isFeatured && (
              <div className="absolute top-2 left-2">
                <Badge variant="default">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
         {/* Price Summary */}
         <div className="p-4 border-t">
        <div className="flex justify-between font-medium">
          <span>Total:</span>
          <span>৳ {calculateTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart(item)}
          className="w-full"
          variant="outline"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}