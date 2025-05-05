import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const isAdmin = useSelector((state) => state.user?.user?.isAdmin);

  // Admin route guard: Redirect to login if not authenticated as admin
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;