
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data/productsData";
import toast from "react-hot-toast";
import { FiMinus, FiPlus } from "react-icons/fi";
import { SHOP } from "../config"; // SHOP.lat, SHOP.lon, SHOP.mobile
import { showToast } from "../utils/toastHelper";
// Calculate distance between two coordinates
const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Delivery charge based on distance
const getDeliveryCharge = (distance) => {
  if (distance <= 2) return 50;
  const extraKm = Math.ceil(distance - 2);
  return 50 + extraKm * 20;
};

export default function Products({ cart, setCart }) {
  const [selectedOption, setSelectedOption] = useState({});
  const [activeTab, setActiveTab] = useState("All Products");
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [distance, setDistance] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [address, setAddress] = useState(""); // auto-fill address
const [mapUrl, setMapUrl] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchText = query.get("q")?.toLowerCase() || "";

  const categories = [
    "All Products",
    "Bulbs",
    "Switches",
    "Sockets",
    "Fans",
    "Regulators",
    "Wires",
    "Accessories",
  ];


  
  /* ---------- FILTER PRODUCTS ---------- */
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeTab === "All Products" || product.category === activeTab;
    const productName = product.name.toLowerCase();
    const searchWords = searchText.trim().split(" ");
    const searchMatch = searchWords.every((word) => productName.includes(word));
    
    return categoryMatch && searchMatch;
  });

  /* ---------- CART OPERATIONS ---------- */
  const addToCart = (product) => {
    const option = selectedOption[product.name] || product.options[0];
    const item = {
      name: `${product.name} (${option.label})`,
      price: option.price,
      img: option.img || product.img,
    };
    const exist = cart.find((c) => c.name === item.name);
    if (exist) {
      setCart(
        cart.map((c) =>
          c.name === item.name ? { ...c, qty: c.qty + 1 } : c
        )
      );
      // toast.success("Quantity Updated");
      showToast("Quantity Updated", "success", "update-quantity")
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
      // toast.success("Item Added");
      showToast("Item Added", "success", "add-item");
    }
  };

  const increaseQty = (name) =>
    setCart(cart.map((item) => (item.name === name ? { ...item, qty: item.qty + 1 } : item)));
  const decreaseQty = (name) =>
    setCart(
      cart
        .map((item) => (item.name === name ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );

  const totalPrice = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  /* ---------- AUTO LOCATION & DELIVERY ---------- */

useEffect(() => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      setMapUrl(`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`);
      const dist = getDistanceKm(SHOP.lat, SHOP.lon, latitude, longitude);
      setDistance(dist);
      setDeliveryCharge(getDeliveryCharge(dist));

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        if (data.display_name) setAddress(data.display_name);
      } catch (err) {
        console.log("Address fetch failed");
      }
    },
    () => {
      
    showToast("Please allow location for delivery calculation", "error", "location-error");
    }
  );
}, []);


const updateCurrentAddress = () => {

  if (!navigator.geolocation) {
    showToast("Geolocation not supported", "error", "geo-unsupported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
       setMapUrl(`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`);
      console.log("LAT:", latitude, "LON:", longitude); // debug

      const dist = getDistanceKm(SHOP.lat, SHOP.lon, latitude, longitude);
      setDistance(dist);
      setDeliveryCharge(getDeliveryCharge(dist));

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        console.log("ADDRESS:", data); // debug

        if (data.display_name) {
          setAddress(data.display_name);
          showToast("Location updated", "success", "location-updated");
        } else {
          showToast("Address not found", "error", "address-missing");
        }
      } catch (err) {
        console.error(err);
        showToast("Address fetch failed", "error", "address-failed");
      }
    },
    (error) => {
      console.error(error);

      if (error.code === 1) {
        showToast("Permission denied. Please allow location", "error", "perm-denied");
      } else if (error.code === 2) {
        showToast("Location unavailable", "error", "loc-unavailable");
      } else if (error.code === 3) {
        showToast("Location request timeout", "error", "timeout");
      } else {
        showToast("Something went wrong", "error", "unknown-error");
      }
    }
  );
};

  /* ---------- WHATSAPP ORDER ---------- */
  const handleWhatsAppOrder = (name, contact, addr) => {
    if (cart.length === 0) return toast.error("Cart is empty");
    if (!name || !contact || !addr) return toast.error("Fill all details");

    const phone = SHOP.mobile;
    let message = `🛒 New Order\n\nName: ${name}\nContact: ${contact}\nAddress: ${addr}\nDistance: ${distance.toFixed(
      2
    )} km\nDelivery: ₹${deliveryCharge}\n\nItems:\n`;
    cart.forEach((item) => {
      message += `${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
    });
    message += `\nTotal: ₹${totalPrice + deliveryCharge}`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
    setCart([]);
    setShowPurchaseForm(false);
  };

  return (
    <div className="px-4 py-6 md:px-10 md:py-10 flex flex-col md:flex-row gap-6">
      {/* LEFT PRODUCTS */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6">Products</h2>

        {/* CATEGORY TABS */}
        <div className="flex gap-4 mb-6 flex-wrap cursor-pointer">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {filteredProducts.map((p, i) => {
    const selected = selectedOption[p.name] || p.options[0];
    const price = selected.price;
    const mrp = selected.mrp;
    const image = selected.img || p.img;

    // NEW: Calculate discount
    const discount = mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

    return (
      <div
        key={i}
        className="bg-white shadow-md rounded-xl p-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
      >
        {/* DISCOUNT BADGE */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow">
            {discount}% OFF
          </span>
        )}

        {/* COMING SOON BADGE */}
        {!p.active && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            Coming Soon
          </span>
        )}

        {/* PRODUCT IMAGE */}
        {image && (
          <img
            src={image}
            alt={p.name}
            className="h-32 w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        )}

        {/* PRODUCT INFO */}
        <h3 className="mt-2 font-semibold">{p.name}</h3>
        {p.warranty && <p className="text-green-600 text-sm">{p.warranty}</p>}

        {/* OPTIONS SELECT */}
        <select
          className="border p-2 w-full mt-2 cursor-pointer"
          onChange={(e) =>
            setSelectedOption({
              ...selectedOption,
              [p.name]: p.options.find((o) => o.label === e.target.value),
            })
          }
          disabled={!p.active}
        >
          {p.options.map((op, idx) => (
            <option key={idx} value={op.label}>
              {op.label}
            </option>
          ))}
        </select>

        {/* PRICE */}
        <div className="mt-2">
          {mrp && (
            <span className="text-gray-400 line-through mr-2">₹{mrp}</span>
          )}
          <span className="font-bold text-lg text-blue-600">₹{price}</span>
        </div>

        {/* ADD TO CART BUTTON */}
        {p.active ? (
          <button
            onClick={() => addToCart(p)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 mt-2 rounded-full shadow-md transition-all duration-300"
          >
            Add To Cart
          </button>
        ) : (
          <button className="bg-gray-300 text-gray-600 w-full py-2 mt-2 rounded cursor-not-allowed">
            Coming Soon
          </button>
        )}
      </div>
    );
  })}
</div>
      </div>

      {/* RIGHT CART */}
      <div className="w-full md:w-96 bg-gray-100 p-4 rounded-xl shadow-md sticky top-6 h-fit flex flex-col gap-2">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>

        <button
          onClick={updateCurrentAddress}
          className="bg-blue-500 text-white text-sm px-3 py-1 rounded mb-2 hover:bg-blue-600"
        >
          📍 Use Current Location
        </button>
        {/* ADDRESS DISPLAY */}
{address && (
  <div className="bg-gray-50 border rounded-xl p-3 mb-2 text-sm text-gray-700">
    <span className="font-semibold">Delivery Address:</span>
    <p className="mt-1">{address}</p>
    {mapUrl && (
  <div className="mt-2">
    <iframe
      src={mapUrl}
      className="w-full h-40 rounded-lg border"
      loading="lazy"
    ></iframe>
  </div>
)}
  </div>
)}


        {cart.length === 0 && <p>No items in cart</p>}

        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {cart.map((c, i) => (
            <div key={i} className="flex justify-between items-center bg-white p-2 rounded">
              <div className="flex items-center gap-3">
                {c.img && <img src={c.img} alt={c.name} className="w-12 h-12 object-contain border rounded" />}
                <div>
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-xs text-gray-500">₹{c.price} each</p>
                </div>
              </div>

             
              <div className="flex items-center border rounded-lg overflow-hidden">

  <button
    onClick={() => decreaseQty(c.name)}
    className="px-3 py-1 bg-red-50 text-red-500 hover:bg-red-100 transition"
  >
    <FiMinus />
  </button>

  <span className="px-3 font-semibold">
    {c.qty}
  </span>

  <button
    onClick={() => increaseQty(c.name)}
    className="px-3 py-1 bg-green-50 text-green-600 hover:bg-green-100 transition"
  >
    <FiPlus />
  </button>

</div>
            </div>
          ))}
        </div>

         {/* Delivery Info and Total */}
  {cart.length > 0 && distance > 0 && (
    <div className="bg-gray-50 border rounded-xl p-3 mt-3 space-y-1">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Distance</span>
        <span>{distance.toFixed(2)} km</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Delivery Charge</span>
        <span>₹{deliveryCharge}</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{totalPrice + deliveryCharge}</span>
      </div>
    </div>
  )}
  {/* Purchase Button */}
  {cart.length > 0 && (
    <button
      onClick={() => setShowPurchaseForm(true)}
      className="bg-green-600 text-white w-full py-2 mt-3 rounded"
    >
      Purchase Now
    </button>
  )}
      </div>

      {/* PURCHASE FORM MODAL */}
      {showPurchaseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Enter Delivery Details</h2>
            <PurchaseForm
              onClose={() => setShowPurchaseForm(false)}
              handleWhatsAppOrder={handleWhatsAppOrder}
              defaultAddress={address}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- PURCHASE FORM ---------- */
function PurchaseForm({ onClose, handleWhatsAppOrder, defaultAddress }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [addr, setAddr] = useState(defaultAddress || "");

  useEffect(() => {
    setAddr(defaultAddress || "");
  }, [defaultAddress]);

  return (
    <div className="flex flex-col gap-2">
      <input
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
        placeholder="Contact Number"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <textarea
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
        placeholder="Address"
        rows={3}
        value={addr}
        onChange={(e) => setAddr(e.target.value)}
      />
      <div className="flex gap-2 mt-2 cursor-pointer">
        <button
          onClick={() => handleWhatsAppOrder(name, contact, addr)}
          className="bg-green-600 text-white py-2 px-4 rounded flex-1 cursor-pointer"
        >
          Send via WhatsApp
        </button>
        <button
          onClick={onClose}
          className="bg-gray-400 text-white py-2 px-4 rounded flex-1 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
