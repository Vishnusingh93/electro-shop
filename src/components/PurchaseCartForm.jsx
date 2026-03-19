import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { SHOP } from "../config";

export default function PurchaseCartForm({ cart, total, form, setForm, onClose }) {
  const [showForm, setShowForm] = useState(true);
  const [distance, setDistance] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const getDistanceKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getDeliveryCharge = (distance) => {
    if (distance <= 2) return 50;
    const extraKm = Math.ceil(distance - 2);
    return 50 + extraKm * 20;
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const dist = getDistanceKm(SHOP.lat, SHOP.lon, latitude, longitude);
        setDistance(dist);
        setDeliveryCharge(getDeliveryCharge(dist));

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.display_name) {
            setForm(prev => ({ ...prev, address: data.display_name }));
          }
        } catch {
          toast.error("Address fetch failed");
        }
      },
      () => toast.error("Please allow location")
    );
  }, []);

  const purchaseWhatsApp = () => {
    if (cart.length === 0) return toast.error("Cart is empty");
    if (!form.name || !form.mobile || !form.address) return toast.error("Fill all fields");
    if (!/^[6-9]\d{9}$/.test(form.mobile)) return toast.error("Invalid mobile number");

    const orderId = "ORD" + Date.now();
    const orderList = cart.map((item, i) => `${i + 1}. ${item.name} x${item.qty} = ₹${item.price * item.qty}`).join("\n");
    const msg = `🧾 *New Order*\nOrder ID: ${orderId}\n👤 ${form.name}\n📱 ${form.mobile}\n🏠 ${form.address}\n📏 Distance: ${distance.toFixed(2)} km\n🛒 Items:\n${orderList}\n🚚 Delivery: ₹${deliveryCharge}\n💰 Total: ₹${total + deliveryCharge}`;

    window.open(`https://wa.me/${SHOP.mobile}?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Order Sent!");
    onClose();
  };

  return (
    <>
       (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Enter Delivery Details</h2>

            <input
              className="border p-2 w-full mb-3"
              placeholder="Name"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-3"
              placeholder="Contact Number"
              value={form.mobile || ""}
              maxLength={10}
              onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, "") })}
            />

            <p className="text-sm text-gray-500 mb-1">📍 Delivery Address</p>
            <textarea
              className="border p-2 w-full mb-4 rounded"
              placeholder="Address"
              rows={3}
              value={form.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <div className="flex gap-3">
              <button
                onClick={purchaseWhatsApp}
                className="bg-green-600 text-white py-2 rounded flex-1 cursor-pointer hover:bg-green-800"
              >
                Send via WhatsApp
              </button>
              <button
                onClick={() => { setShowForm(false); onClose(); }}
                className="bg-gray-400 text-white py-2 rounded flex-1 cursor-pointer hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )
    </>
  );
}