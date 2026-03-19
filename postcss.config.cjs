module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { HelmetProvider } from "react-helmet-async";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import Categories from "./pages/Categories";
// import Contact from "./pages/Contact";
// import WhatsAppPopup from "./components/WhatsappProps";
// import { useState, useEffect } from "react";

// import { Toaster } from "react-hot-toast";
// import ACRepairCost from "./pages/ACRepairCost";
// import ServiceAreas from "./pages/ServiceAreas";
// import JoinTechnician from "./pages/technician/JoinTechnician";
// import Help from "./pages/technician/Help";
// // import SplashScreen from "./components/SplashScreen";
// import Services from "./pages/Services";
// import { services } from "./data/servicesData";





// export default function App() {
//   const [isCartOpen, setIsCartOpen] = useState(false);

  
//   const [cart, setCart] = useState(() => {
//   const savedCart = localStorage.getItem("cart");
//   return savedCart ? JSON.parse(savedCart) : [];
// });


// useEffect(() => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }, [cart]);

//   return (
//     <HelmetProvider>
       
//     <BrowserRouter>

   
//       {/* <Navbar cart={cart} setIsCartOpen={setIsCartOpen}/> */}
//       {/* <Navbar cart={cart}  setCart={setCart}  isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} /> */}
      
//       {/* <Route path="/search" element={<SearchResults />} /> */}
//       <Route path="/" element={<div>Hello World</div>} />
//       <Toaster position="top-center" />
//       <WhatsAppPopup/>
//       <Routes>
//         <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
//         <Route path="/products" element={<Products cart={cart} setCart={setCart} />}/>
//         <Route path="/services" element={<Services services={services} />} />
//         <Route path="/categories" element={<Categories/>}/>
//         <Route path="/contact" element={<Contact/>}/>
//         <Route path="/help" element={<Help />} />
//         <Route path="/service-areas" element={<ServiceAreas />} />
//         <Route path="/join-technician" element={<JoinTechnician />} />

       



//                   <Route path="/ac-repair-cost-jaipur" element={<ACRepairCost />} />

//       </Routes>
//       {/* <CartDrawer
//   isOpen={isCartOpen}
//   setIsCartOpen={setIsCartOpen}
//   cart={cart}
//   total={cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
// /> */}
//     </BrowserRouter>
  
//     </HelmetProvider>
//   );
// }