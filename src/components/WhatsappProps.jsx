import { useState, useRef, useEffect } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { SHOP } from "../config";

export default function WhatsAppPopup() {

  const [open, setOpen] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [other, setOther] = useState("");

  const popupRef = useRef();

 const phone = SHOP.phone

  const services = [
    "AC Repair & Services",
     "LED TV Repair",
    "Fridge Repair",
    "Washing Machine Repair",
    "Microwave Repair",
    "Fan Repair",
    "Geyser Repair",
    "Speaker Repair"
  ];

  // Outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
        setShowNumber(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sendMessage = (service) => {

      if (!phone) {
    toast.error("WhatsApp number not configured");
    return;
  }

  

    const msg = `Hello, I want ${service} service`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");

      toast.success("Opening WhatsApp...");
  };

  const sendOtherMessage = () => {
   if (!other) {
  toast.error("Please type service name");
  return;
}

    const msg = `Hello, I want ${other} repair service`;
    window.open(
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
  "_blank"
);
   
    toast.success("Opening WhatsApp...");

  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Popup */}
      {open && (
        <div
          ref={popupRef}
          className="bg-white shadow-xl rounded-xl p-4 w-64 transition-all duration-300"
        >
          <h3 className="font-bold mb-2 text-gray-700">
            Select Service
          </h3>

          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 hover:text-blue-700 transition"
            >
              {s}
            </button>
          ))}

          {/* Other input */}
          <input
            type="text"
            placeholder="Other Repair..."
            value={other}
            onChange={(e) => setOther(e.target.value)}
            className="border w-full p-2 rounded mt-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={sendOtherMessage}
            className="bg-green-500 hover:bg-green-600 text-white w-full py-2 mt-2 rounded transition cursor-pointer"
          >
            Send Other
          </button>
        </div>
      )}

      {/* Call Button */}
      <a
        href={`tel:${SHOP.phone}`}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition"
      >
        <FaPhoneAlt size={22} />
      </a>

      {/* WhatsApp Button + Number */}
      <div className="flex items-center gap-2">

        {/* Number Bubble */}
        {showNumber && (
          <div className="bg-white px-4 py-2 rounded-lg shadow font-semibold text-gray-700 transition-all duration-300">
           {SHOP.displayPhone}
          </div>
        )}

        <button
          onClick={() => {
            setShowNumber(!showNumber);
            setOpen(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition cursor-pointer"
        >
          <FaWhatsapp size={26} />
        </button>

      </div>

    </div>
  );
}