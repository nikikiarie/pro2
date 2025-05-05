import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
    isFetching: false,
    isError: false,
  },
  reducers: {
    getProuctsStart: (state,action) => {
      console.log(action.payload);
      state.isFetching = true;
      state.isError = false;
      state.products = action.payload
    },
    getProductsSuccess: (state, action) => {
      state.isFetching = false;

      state.products = action.payload;
    },
    getProuctsFailure: (state) => {
      state.isFetching = false;
      state.isError = true
    },
    addProuctStart: (state) => {
      state.isFetching = true;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;

      state.products.push(action.payload);
    },
    addProuctFailure: (state) => {
      state.isFetching = false;
      state.isError = true
    },
    
    deleteProuctStart: (state) => {
      state.isFetching = true;
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter((item)=>item._id !== action.payload)
    },
    deleteProuctFailure: (state) => {
      state.isFetching = false;
      state.isError = true
    },
    stateIsLoading:(state)=>{
state.isFetching = true
    }
  },
});


export const {stateIsLoading,addProuctFailure,addProductSuccess,addProuctStart,getProuctsFailure,getProuctsStart,getProductsSuccess,deleteProductSuccess,deleteProuctFailure,deleteProuctStart} = productSlice.actions


export default  productSlice.reducer
