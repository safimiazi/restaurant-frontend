// src/hooks/useCartActions.ts
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addToCart, clearCart, removeFromCart, updateQuantity } from "../redux/features/productCart/ProductCartSlice";

export const useCartActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    addToCart: (product: string, quantity: number, price: number) => 
      dispatch(addToCart({ product, quantity, price })),
    updateQuantity: (product: string, quantity: number) => 
      dispatch(updateQuantity({ product, quantity })),
    removeFromCart: (product: string) => dispatch(removeFromCart(product)),
    clearCart: () => dispatch(clearCart()),
  };
};