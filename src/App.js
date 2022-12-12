import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Home from "./components/Home/Home";
import { ProductProvider } from "./context/ProductContext/ProductState";
import { UserProvider } from "./context/UserContext/UserState";
import { OrdersProvider } from "./context/OrderContext/OrderState";
import { ReviewProvider } from "./context/ReviewContext/ReviewState";
import ProductOverview from "./components/ProductOverview/ProductOverview";
import Admin from "./components/Admin/Admin";
import AuthRoutes from "./utils/AuthRoutes";
import AdminRoutes from "./utils/AdminRoutes";


function App() {
  return (
    <div className="App">
      <ProductProvider>
        <ReviewProvider>
          <UserProvider>
            <OrdersProvider>
              <BrowserRouter>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product-overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route element={<AuthRoutes />}>
                      <Route path="/profile" element={<Profile />} />
                      <Route element={<AdminRoutes />}>
                        <Route path="/admin" element={<Admin />} />
                      </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/" />}  />
                  </Routes>
                </main>
                <Footer />
              </BrowserRouter>
            </OrdersProvider>
          </UserProvider>
        </ReviewProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
