import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import GoogleQR from "../assets/google-qr.png";
import { FaWhatsapp, FaFacebook, FaInstagram, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="grid md:grid-cols-3 gap-8 p-8">

        {/* Shop Info */}
        <div>
          <h2 className="text-xl font-bold mb-3 text-yellow-400">
            ELECTRO SHOP
          </h2>

          <p className="flex items-center gap-2 mb-2">
  <FaMapMarkerAlt />
  <a
    href="https://www.google.com/search?q=Guddu+Electronic+Shop+Jaipur"
    target="_blank"
    className="hover:text-yellow-400"
  >
    Guddu Electronic Shop
  </a>
</p>

            <p className="flex items-center gap-2 mb-2">
  <FaPhoneAlt />
  <a
    href="tel:+918209340190"
    className="hover:text-yellow-400"
  >
    +91 8209340190
  </a>
</p>

         <p className="flex items-center gap-2">
  <FaEnvelope />
  <a
    href="mailto:electroshop@gmail.com"
    className="hover:text-yellow-400"
  >
    electroshop@gmail.com
  </a>
</p>
        </div>
        

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-yellow-400">
            Quick Links
          </h2>

         <ul className="space-y-2">
           <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
           <li><Link to="/products" className="hover:text-yellow-400">Products</Link></li>
           <li><Link to="/categories" className="hover:text-yellow-400">Categories</Link></li>
           <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
         </ul>
        </div>

         {/* Social Media */}
<div>
  <h2 className="text-lg font-semibold mb-3 text-yellow-400">
    Follow Us
  </h2>

<div className="flex items-start justify-between">

    {/* Social Icons */}
    <div className="flex gap-4 text-xl pr-4">
      <a href="https://wa.me/918209340190" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className="hover:text-green-400 cursor-pointer" />
      </a>

      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="hover:text-blue-400 cursor-pointer" />
      </a>

      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="hover:text-pink-400 cursor-pointer" />
      </a>
    </div>

    {/* Small QR Code */}
    <div className="text-center">
      <p className="text-xs text-gray-400 mb-1">
        Scan to Review
      </p>

      <a
        href="https://www.google.com/search?q=guddu+electronics#lrd=0x396db50032eb91cf:0xef72649aa5954047,1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={GoogleQR}
          alt="Google Review QR"
          className="w-40 h-40 bg-white p-1 rounded-md shadow hover:scale-105 transition"
        />
      </a>
    </div>

  </div>
</div>
        

      </div>
      
<div className="flex justify-center mt-6">
  <a
    href="https://www.google.com/search?q=guddu+electronics&oq=guddu#lrd=0x396db50032eb91cf:0xef72649aa5954047,1"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
  >
    <FaGoogle />
    
    Give Us Google Review
  </a>
</div>

      {/* Bottom Bar */}
      <div className="text-center border-t border-gray-700 py-3 text-sm">
        © {new Date().getFullYear()} Electro Shop. All Rights Reserved.
      </div>
    </footer>
  );
}