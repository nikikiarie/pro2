import { loginFailure, loginStart, loginSucess, registerStart, setError } from "./userSlice";
// import { publicRequest } from "../makeRequest";
import axios from  'axios';

import {
  addProductSuccess,
  addProuctFailure,
  addProuctStart,
  deleteProductSuccess,
  deleteProuctFailure,
  deleteProuctStart,
} from "./productSlice";
import { publicRequest } from "../makeRequest";

// export const login = async (dispatch, user, navigate, pathname) => {
//   dispatch(loginStart());
//   dispatch(setError());

//   try {
//     const res = await publicRequest.post("/api/auth/login", user);
//     console.log(res.data);

//     dispatch(loginSucess(res.data));
//     pathname ? navigate(pathname) : navigate("/");
//   } catch (err) {
//     dispatch(loginFailure(err.response.data.message));
//   }
// };
export const login = async (dispatch, user, navigate, pathname) => {
  dispatch(loginStart());  // This sets isLoading to true
  dispatch(setError());    // This clears any previous errors

  try {
    const res = await publicRequest.post("/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    pathname ? navigate(pathname) : navigate("/");
  } catch (err) {
    dispatch(loginFailure(err.response?.data?.message || "Login failed"));
    // Note: Added optional chaining and fallback error message
  }
};

export const register = async (user, dispatch) => {
  console.log(user);
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/api/auth/register", user);
    // const res = await publicRequest.post("/api/auth/register", user);
    console.log(res.data)
    dispatch(registerSuccess(res.data));
    return res.data;
  } catch (err) {
    console.log(err)
    dispatch(registerFailure(err?.response?.data?.message || "Registration failed"));
    throw err; 
  }
};




export const addProduct = async (dispatch, product, token) => {
  dispatch(addProuctStart());
  try {
    const res = await axios.post(`/api/products/`, product, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(addProductSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch(addProuctFailure());
  }
};

export const editUser = async (id, user, token, setData) => {
  try {
    const res = await axios.put(`/api/users/${id}`, user, {
      headers: { token: `Bearer ${token}` },
    });
    console.log(res.data);
    setData(res.data);
  } catch (error) {}
};

export const deleteProduct = async (dispatch, id, token) => {
  dispatch(deleteProuctStart());
  try {
    const res = await axios.delete(`/api/products/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
    console.log(res.data);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProuctFailure(id));
  }
};
