
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import PurchaseCartForm from "./PurchaseCartForm";
import { SHOP } from "../config";
import { showToast } from "../utils/toastHelper";

import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

export default function PurchaseCart({ cart, setCart, total }) {


const [showForm, setShowForm] = useState(false);
const [form, setForm] = useState({});
const [distance, setDistance] = useState(0);
const [deliveryCharge, setDeliveryCharge] = useState(0);
const [address, setAddress] = useState("");
 
const [mapUrl, setMapUrl] = useState("");

const textareaRef = useRef(null);

useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }
}, [address]);

  const increaseQty = (name) => {
    const updated = cart.map((item) =>
      item.name === name ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updated);
  };

  const decreaseQty = (name) => {
    const updated = cart
      .map((item) =>
        item.name === name ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    setCart(updated);
  };

  const removeItem = (name) => {
    const updated = cart.filter((item) => item.name !== name);
    setCart(updated);
    // toast.success("Item removed");
    showToast("Item removed", "success", "remove-item");
  };

const getCurrentLocation = () => {

  if (!navigator.geolocation) {
    // toast.error("Geolocation not supported");
    showToast("Geolocation not supported", "error", "geo-unsupported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {

      const { latitude, longitude } = position.coords;
setMapUrl(`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`);
      const R = 6371;
      const dLat = (latitude - SHOP.lat) * Math.PI / 180;
      const dLon = (longitude - SHOP.lon) * Math.PI / 180;

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(SHOP.lat * Math.PI / 180) *
        Math.cos(latitude * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c;

      setDistance(dist);

      let charge = 50;
      if (dist > 1) {
        charge = 50 + Math.ceil(dist - 1) * 20;
      }

      setDeliveryCharge(charge);

      // ADDRESS FETCH
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await res.json();

        if (data.display_name) {
          setAddress(data.display_name);
        }

      } catch {
        // toast.error("Address fetch failed");
        showToast("Address fetch failed", "error", "address-failed");
      }

      // toast.success("Location detected");
      showToast("Location detected", "success", "location-detected");

    },
   (error) => {
      // error callback wrapped properly
      showToast("Location permission denied", "error", "location-denied");
    }
  );
};


return (
  <div className="w-full h-full flex flex-col">

    {/* SCROLL AREA */}
    <div className="flex-1 overflow-y-auto p-3 space-y-4 pb-28">

      {/* CART ITEMS */}
      {cart.map((item) => (
        <div
          key={item.name}
          className="flex items-center gap-3 border rounded-xl p-3 shadow-sm bg-white"
        >
          {item.img && (
            <img
              src={item.img}
              alt={item.name}
              className="w-14 h-14 object-contain border rounded-md"
            />
          )}

          <div className="flex-1">
            <p className="font-semibold text-sm">{item.name}</p>
            <p className="text-xs text-gray-500">
              ₹{item.price} × {item.qty}
            </p>
            <p className="text-sm font-bold text-green-600">
              ₹{item.price * item.qty}
            </p>
          </div>

          {/* <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQty(item.name)}
              className="bg-red-500 text-white px-2 rounded hover:bg-red-700"
            >
              −
            </button>

            <span>{item.qty}</span>

            <button
              onClick={() => increaseQty(item.name)}
              className="bg-green-500 text-white px-2 rounded hover:bg-green-700 "
            >
              +
            </button>
          </div> */}

          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">

  <button
    onClick={() => decreaseQty(item.name)}
    className="p-1 rounded-full hover:bg-red-100 text-red-500 transition"
  >
    <FiMinus size={16} />
  </button>

  <span className="text-sm font-semibold min-w-[20px] text-center">
    {item.qty}
  </span>

  <button
    onClick={() => increaseQty(item.name)}
    className="p-1 rounded-full hover:bg-green-100 text-green-600 transition"
  >
    <FiPlus size={16} />
  </button>

</div>
<button
  onClick={() => removeItem(item.name)}
  className="text-black-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
>
  <FiTrash2 />
</button>
        </div>
      ))}

      {/* ADDRESS + MAP */}
      {cart.length > 0 && (
        <div className="bg-gray-50 border rounded-xl p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-sm">📍 Delivery Address</h3>

            <button
              onClick={getCurrentLocation}
              className="text-xs bg-blue-500 text-white px-3 py-1 rounded"
            >
              Use Current Location
            </button>
          </div>

<textarea
  ref={textareaRef}
  className="border p-2 w-full rounded text-sm resize-none leading-relaxed"
  rows={1}
  placeholder="Enter address"
  value={address}
  onChange={(e) => {
    setAddress(e.target.value);
  }}
/>

          {mapUrl && (
            <div className="mt-2">
              <iframe
                src={mapUrl}
                className="w-full h-36 rounded"
              ></iframe>
            </div>
          )}
        </div>
      )}

    </div>

    {/* FIXED BOTTOM */}
    {cart.length > 0 && (
      <div className="border-t bg-white sticky bottom-0 shadow-[0_-6px_16px_rgba(0,0,0,0.1)] p-4 space-y-3">

        {distance > 0 && (
          <div className="bg-gray-50 border rounded-lg p-2 text-sm space-y-1">
            <div className="flex justify-between text-gray-600">
              <span>Distance</span>
              <span>{distance.toFixed(2)} km</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-green-600">₹{total + deliveryCharge}</span>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold active:scale-95 transition"
        >
          Purchase
        </button>

      </div>
    )}

    {/* FORM */}
    {showForm && (
      <PurchaseCartForm
        cart={cart}
        total={total}
        form={form}
        setForm={setForm}
        onClose={() => setShowForm(false)}
      />
    )}

  </div>
);
}