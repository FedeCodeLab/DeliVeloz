// ? routes y componentes
import About from "./views/about/About";
import Home from "./views/home/Home";
import Detail from "./views/detail/Detail";
import Products from "./views/products/Products";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Blog from "./views/blog/Blog";
import Carrito from "./views/carrito/Carrito";
import FormLogin from "./components/formLogin/FormLogin";
import FormRegister from "./components/formRegister/FormRegister";
import DashboardAdmin from "./views/admin/DashboardAdmin";
import EditProduct from "./components/admin/EditProduct";

// ? -------------------- Hooks

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// ? ------------------- Firebase

import { AuthProvider } from "./context/AuthContext";

function App() {
  //  ? ---------------- Modal

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  // ? ---------------- UseEffect para cerrar modales con scape

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        closeLoginModal();
        closeRegisterModal();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // ? ---------------- Hooks y estados

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const login = useSelector((state) => state.login);

  // ? ---------------- Comprobación de sesión

  useEffect(() => {
    const currentPath = pathname.toLowerCase();
    const isLogin = currentPath === "/login";
    const isRegister = currentPath === "/register";

    if (login && (isLogin || isRegister)) {
      navigate("/home");
    }
  }, [login, pathname, navigate]);

  return (
    <AuthProvider>
      <main className="bg-alabaster-50 min-h-screen overflow-x-hidden">
        <Header
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
        </Routes>
        <Footer />
        {isLoginModalOpen && <FormLogin closeModal={closeLoginModal} />}
        {isRegisterModalOpen && (
          <FormRegister closeModal={closeRegisterModal} />
        )}
      </main>
    </AuthProvider>
  );
}

export default App;
