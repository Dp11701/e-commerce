import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: number;
  price: number;
  quantity: number;
  totalPrice: number;
  name: string;
  cover: string;
}

interface CartState {
  itemsList: CartItem[];
  totalQuantity: number;
}

const initialState: CartState = {
  itemsList: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;

      // Check if item already exists
      const existingItem = state.itemsList.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          _id: newItem._id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          cover: newItem.cover,
        });
        state.totalQuantity++;
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const _id = action.payload;
      const existingItem = state.itemsList.find((item) => item._id === _id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.itemsList = state.itemsList.filter((item) => item._id !== _id);
          state.totalQuantity--;
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
