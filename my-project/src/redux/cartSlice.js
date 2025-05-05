import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  amount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index >= 0) {
        state.products[index].quantity = state.products[index].quantity + 1
        state.amount += action.payload.price ;
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
        state.quantity += 1;
        state.amount += action.payload.price * action.payload.quantity;
      }
    },
    decreaseProductAmount: (state, action) => {
      console.log(action.payload);
      state.products.map((item) => {
        if (item._id === action.payload._id) {
          if (item.quantity <= 1) {
            state.products = state.products.filter(
              (item) => item._id !== action.payload._id
            );
            state.quantity -= 1;
            state.amount -= action.payload.price;
          } else {
            item.quantity -= 1;
            state.amount -= action.payload.price;
          }
        }
        return item;
      });
    },
    increaseProductAmount: (state, action) => {
      console.log(action.payload);
      state.products.map((item) => {
        if (item._id === action.payload._id) {
          item.quantity += 1;
          state.amount += action.payload.price;
        }
        return item;
      });
    },
  },
});

export const { addToCart, increaseProductAmount, decreaseProductAmount } =
  cartSlice.actions;

export default cartSlice.reducer;
