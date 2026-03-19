import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import WhatsAppPopup from "./components/WhatsappProps";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ACRepairCost from "./pages/ACRepairCost";
import ServiceAreas from "./pages/ServiceAreas";
import JoinTechnician from "./pages/technician/JoinTechnician";
import Help from "./pages/technician/Help";
import Services from "./pages/Services";
import { services } from "./data/servicesData";
import CartDrawer from "./components/CartDrawer";
import SplashScreen from "./components/SplashScreen";


export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(true);
useEffect(() => {
  const seen = sessionStorage.getItem("seenSplash");

  if (seen) {
    setLoading(false);
  } else {
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("seenSplash", "true");
    }, 2000);
  }
}, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

 
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <HelmetProvider>
      <Toaster position="top-center" />
      <WhatsAppPopup />

      <Navbar
        cart={cart}
        setCart={setCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/products" element={<Products cart={cart} setCart={setCart} />} />
        <Route path="/services" element={<Services services={services} />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/join-technician" element={<JoinTechnician />} />
        <Route path="/ac-repair-cost-jaipur" element={<ACRepairCost />} />
      </Routes>

      <CartDrawer
        isOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        setCart={setCart}
        total={total}
      />
    </HelmetProvider>
  );
}