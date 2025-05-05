import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    loginFailure: (state,action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logOut:(state)=>{
      state.user = null
    },setError:(state)=>{
      state.error = false
    },
    setLoading:(state)=>{
      state.isLoading = true
    }
  },
});

export const { setError,loginFailure, loginStart, loginSuccess ,logOut,setLoading, registerStart, registerFailure, registerSuccess} = userSlice.actions;

export default userSlice.reducer;
