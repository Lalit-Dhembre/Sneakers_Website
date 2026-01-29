import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromLocalStorage: (state, action) => {
      return [...state, ...action.payload];
    },
    checkoutCart: (state, action) => {
      return [];
    },
    addToCart: (state, action) => {
      // Check if item with same cartId exists (unlikely with random ID but good practice)
      // OR check if item with same ID AND Size exists? 
      // For this prototype, we'll just append, as unique IDs are generated at dispatch.
      // However, to strictly follow Redux, we should ideally check duplicates here if we want to increment qty instead of adding new row.
      // But current UI treats each add as a new row or separate entry (mostly).
      // Let's stick to appending for now, but rely on cartId for updates.
      return [...state, action.payload];
    },
    removeFromCart: (state, action) => {
      return state.filter((shoe) => action.payload !== shoe.cartId);
    },
    increaseQty: (state, action) => {
      return state.map((shoe) =>
        shoe.cartId === action.payload ? { ...shoe, qty: shoe.qty + 1 } : shoe
      );
    },
    decreaseQty: (state, action) => {
      return state.map((shoe) =>
        shoe.cartId === action.payload ? { ...shoe, qty: shoe.qty - 1 } : shoe
      );
    },
  },
});

export const {
  setCartFromLocalStorage,
  checkoutCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} = CartSlice.actions;
export default CartSlice.reducer;
