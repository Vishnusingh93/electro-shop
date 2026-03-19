
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { FaMapMarkedAlt, FaCat } from "react-icons/fa";
import { FaHome, FaBoxOpen, FaThLarge, FaPhoneAlt, FaUserCog } from "react-icons/fa";
import { motion } from "framer-motion";
import WhatsAppPopup from "./WhatsappProps";
import logo from "../assets/electro-shop.png";
import { FiSearch, FiMenu } from "react-icons/fi";
import { products } from "../data/productsData";
import { services } from "../data/servicesData";
import CartDrawer from "./CartDrawer";
import { IoIosArrowForward, } from "react-icons/io";
import { useLocation } from "react-router-dom";

export default function Navbar({ cart = [], setCart,isCartOpen, setIsCartOpen }) {
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("sit");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({ name: "", mobile: "", address: "" });
  const navigate = useNavigate();
   const location = useLocation();

  const words = [
    "AC Repair", "Fridge Repair", "LED Bulb", "AC Install",
    "Extension Board", "AC Gas Refill", "Ceiling Fan",
    "Electric Wire", "AC Service", "Washing Repair", "Refrigerator"
  ];

  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typeSpeed = isDeleting ? 50 : 150 + Math.random() * 40;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholder(`Search for "${currentWord.slice(0, charIndex + 1)}"`);
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === currentWord.length) setIsDeleting(true);
      } else {
        setPlaceholder(`Search for "${currentWord.slice(0, charIndex - 1)}"`);
        setCharIndex(prev => prev - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
        }
      }
    }, typeSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  // Random cat animation
  useEffect(() => {
    const actions = ["sit", "walk", "sleep"];
    const interval = setInterval(() => {
      setAction(actions[Math.floor(Math.random() * actions.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    sit: { x: 0, y: 0 },
    walk: { x: [0, 12, -12, 0], transition: { duration: 2 } },
    sleep: { rotate: -25, y: 6 }
  };

  // Fuzzy search helpers
  function levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
        else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
    return matrix[b.length][a.length];
  }

  function fuzzyMatch(name, search) {
    name = name.toLowerCase();
    if (name.includes(search)) return true;
    if (search.length < 4) return false;
    return levenshtein(name, search) <= 2;
  }

  const [typingTimeout, setTypingTimeout] = useState(null);
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      const text = value.toLowerCase();
      if (text.length < 2) {
        setResults([]);
        return;
      }
      const productResults = products.flatMap(p => {
        const matches = [];
        if (fuzzyMatch(p.name, text) || fuzzyMatch(p.category || "", text)) matches.push({ type: "product", data: p, displayName: p.name });
        if (p.tags) p.tags.forEach(tag => { if (fuzzyMatch(tag, text)) matches.push({ type: "product", data: p, displayName: tag }); });
        return matches;
      });
      const serviceResults = services.flatMap(s => {
        const matches = [];
        if (fuzzyMatch(s.name, text) || fuzzyMatch(s.category || "", text)) matches.push({ type: "service", data: s, displayName: s.name });
        if (s.tags) s.tags.forEach(tag => { if (fuzzyMatch(tag, text)) matches.push({ type: "service", data: s, displayName: tag }); });
        return matches;
      });
      setResults([...productResults.slice(0, 5), ...serviceResults.slice(0, 5)]);
    }, 150);
    setTypingTimeout(timeout);
  };

  return (
    <>
      <nav className="bg-white shadow-md px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">

        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer select-none">
          <div className="relative flex items-center">
            <img src={logo} alt="Electro Shop" className="h-14 object-contain mt-2" style={{ transform: "scale(2)" }} />
            <motion.div variants={variants} animate={action} className="absolute -top-0 left-1/2 -translate-x-1/2 text-orange-500 text-lg">
              <FaCat />
            </motion.div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 order-3 md:order-none">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input type="text" value={search} onChange={handleSearch} placeholder={placeholder} className="border pl-10 pr-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          {results.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white shadow-lg rounded-lg z-[9999] max-h-80 overflow-y-auto">
              {results.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 cursor-pointer border-b transition"
                  onClick={() => {
                    setSearch(item.data.name);   
                    setResults([]);
                    if (item.type === "service") navigate(`/services?q=${item.displayName || search}`);
                    else navigate(`/products?q=${item.data.name|| search}`);
                  }}>
                  <img src={item.data.img} alt="" className="w-10 h-10 object-contain rounded" />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{item.displayName || item.data.name}</p>
                    <p className="text-xs text-gray-500">{item.type === "service" ? "Service" : item.data.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Areas */}
        <Link to="/service-areas" className="hidden md:flex items-center gap-2 relative group hover:text-blue-600 transition">
          <FaMapMarkedAlt className="w-5 h-5 text-green-600" />
          <span>Service Areas</span>
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Menu Links */}
<div className="hidden md:flex items-center gap-6 font-semibold flex-wrap">
  {[
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen /> },
    { name: "Categories", path: "/categories", icon: <FaThLarge /> },
    { name: "Contact", path: "/contact", icon: <FaPhoneAlt /> }
  ].map((item, i) => (
    <Link
      key={i}
      to={item.path}
      className={`relative group flex items-center gap-2 transition
        ${location.pathname === item.path ? "text-blue-600" : "hover:text-blue-600"}
      `}
    >
      <span className="text-sm">{item.icon}</span>
      {item.name}

      {/* underline */}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300
        ${location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"}
      `}
      ></span>
    </Link>
  ))}

  <Link
    to="/join-technician"
    className={`relative group flex items-center gap-2 transition
      ${location.pathname === "/join-technician" ? "text-blue-600" : "hover:text-blue-600"}
    `}
  >
    <FaUserCog className="text-sm" />
    Join Technician

    <span
      className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300
      ${location.pathname === "/join-technician" ? "w-full" : "w-0 group-hover:w-full"}
    `}
    ></span>
  </Link>
</div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 ml-auto md:ml-0">
          {/* Cart Icon + Slider */}
          <div className="relative">

  <HiShoppingCart
    onClick={() => setIsCartOpen(true)}
    className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer"
  />

  <CartDrawer
    isOpen={isCartOpen}
    setIsCartOpen={setIsCartOpen}
    cart={cart}
    setCart={setCart}
    total={cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
  />

</div>

          </div>

          {/* Mobile Menu */}
          <div className="md:hidden cursor-pointer" onClick={() => setMobileMenu(true)}>
            <FiMenu className="text-2xl" />
          </div>
        

        <WhatsAppPopup />
      </nav>

      {/* Mobile Slide Menu */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenu(false)}></div>

        

          <div
  className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl p-6 flex flex-col
  transform transition-transform duration-300
  ${mobileMenu ? "translate-x-0" : "-translate-x-full"}
`}
>

  {/* Header */}
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-lg font-bold text-gray-700">Menu</h2>

    <button
      onClick={() => setMobileMenu(false)}
      className="group text-black hover:text-blue-500 p-2"
    >
      <span className="inline-block transform transition-transform duration-300 group-hover:-rotate-180">
        <IoIosArrowForward />
      </span>
    </button>
  </div>

  {/* Links */}

  <div className="flex flex-col gap-2 font-medium">
  {[
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen /> },
    { name: "Categories", path: "/categories", icon: <FaThLarge /> },
    { name: "Contact", path: "/contact", icon: <FaPhoneAlt /> },
    { name: "Service Areas", path: "/service-areas", icon: <FaMapMarkedAlt /> },
    { name: "Join Technician", path: "/join-technician", icon: <FaUserCog /> }
  ].map((item, i) => (
    <Link
      key={i}
      to={item.path}
      onClick={() => setMobileMenu(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        ${
          location.pathname === item.path
            ? "bg-blue-100 text-blue-600 font-semibold"
            : "hover:bg-blue-50 hover:text-blue-600"
        }
      `}
    >
      <span className="text-lg">{item.icon}</span>
      {item.name}
    </Link>
  ))}
</div>

</div>
        </div>
      )}
      
    </>
  )
}