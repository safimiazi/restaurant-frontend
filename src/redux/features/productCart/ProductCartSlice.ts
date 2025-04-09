// src/redux/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  product: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "totalPrice">>) => {
      const { product, quantity, price } = action.payload;
      const existingItem = state.items.find(item => item.product === product);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          product,
          quantity,
          price,
          totalPrice: quantity * price,
        });
      }
    },
    updateQuantity: (state, action: PayloadAction<{product: string; quantity: number}>) => {
      const { product, quantity } = action.payload;
      const item = state.items.find(item => item.product === product);
      
      if (item) {
        item.quantity = quantity;
        item.totalPrice = quantity * item.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;