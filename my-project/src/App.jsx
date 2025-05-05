import { useSelector } from "react-redux";
import './index.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./pages/Cart";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Verify from "./pages/Verify";

import Unauthorized from "./pages/Unauthorized";
// import AdminHome from "./pages/admin/home/AdminHome";
// import Layout from "./components/admin/layout/Layout";
// import Users from "./pages/admin/users/Users";
// import User from "./pages/admin/user/User";
// import NewUser from "./pages/admin/newUser/NewUser";
// import AdminProducts from "./pages/admin/products/AdminProducts";
// import AdminProduct from "./pages/admin/product/AdminProduct";
// import NewProduct from "./pages/admin/newProduct/NewProduct";
import { ToastContainer } from "react-toastify";

function App() {
  const user = useSelector((state) => state.user?.user?.isAdmin);
  console.log(user);
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/:cat" element={<ProductList />} />
        <Route path="/success" element={<Success />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={user ? <Layout /> : <Navigate to="/unauthorized" />}>
          <Route path="/admin/home" element={<Home />} />
          {/* <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/user/:id" element={<User />} />
          <Route path="/admin/newUser" element={<NewUser />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/product/:id" element={<AdminProduct />} />
          <Route path="/admin/newProduct" element={<NewProduct />} /> */}
        </Route>

        {/* <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/user/:id" element={<AdminUser />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/product/:id" element={<AdminProduct />} />
          <Route path="/admin/newProduct" element={<AdminNewProduct />} />
          <Route path="/admin/newUser" element={<AdminNewUser />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
