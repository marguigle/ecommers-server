import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ProductList from "./pages/product/ProductList.jsx";
import ProductDetail from "./pages/product/ProductDetail.jsx";
import BlogList from "./pages/blog/BlogList.jsx";
import BlogDetail from "./pages/blog/BlogDetail.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Wishlist from "./pages/user/Wishlist.jsx";
import Profile from "./pages/user/Profile.jsx";
import Orders from "./pages/user/Orders.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminBlogs from "./pages/admin/AdminBlogs.jsx";
import AdminCategories from "./pages/admin/AdminCategories.jsx";
import ProductForm from "./pages/admin/ProductForm.jsx";
import BlogForm from "./pages/admin/BlogForm.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/products"
            element={
              <ProtectedRoute adminOnly>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/orders"
            element={
              <ProtectedRoute adminOnly>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/blogs"
            element={
              <ProtectedRoute adminOnly>
                <AdminBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/categories"
            element={
              <ProtectedRoute adminOnly>
                <AdminCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/products/new"
            element={
              <ProtectedRoute adminOnly>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/products/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/blogs/new"
            element={
              <ProtectedRoute adminOnly>
                <BlogForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/blogs/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <BlogForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
