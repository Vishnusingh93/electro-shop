

import { useState,useEffect } from "react";
import groupImage from "../assets/groups.png";
import Services from "./Services";
import Footer from "../components/Footer";
import { products } from "../data/productsData";
import { useNavigate } from "react-router-dom";
import PurchaseCart from "../components/PurchaseCart";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


export default function Home({cart, setCart}) {

  
  const [selectedOption, setSelectedOption] = useState({}); 
  const [isMobile, setIsMobile] = useState( false
  // typeof window !== "undefined" && window.innerWidth < 768
);
  const [mapUrl, setMapUrl] = useState("");
  const [coords, setCoords] = useState(null);

const getLocation = () => {

if (!navigator.geolocation) {
toast.error("Location not supported");
return;
}

navigator.geolocation.getCurrentPosition(

async (position) => {

const lat = position.coords.latitude;
const lon = position.coords.longitude;

setCoords({ lat, lon }); // map link के लिए store

try {

const res = await fetch(
`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
);

const data = await res.json();

const address = data.display_name || "Location detected";
setForm(prev => ({
...prev,
address: address
}));


setMapUrl(`https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`);

toast.success("Location Added");

} catch (err) {

toast.error("Failed to get address");

}

},

() => {
toast.error("Location permission denied");
}

);

};
//   useEffect(() => {

//   const handleResize = () => {
//     setIsMobile(window.innerWidth < 768);
//   };

//   window.addEventListener("resize", handleResize);

//   return () => window.removeEventListener("resize", handleResize);

// }, []);
  useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);

  handleResize(); // initial check
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  const [form, setForm] = useState({
       name: "",
    mobile: "",
    service:"",
    otherService:"",
    address: ""
  });
  const navigate = useNavigate();
  
 
  /* ---------------- SERVICES ---------------- */
  const services = [
    { name: "AC Repair", img: "https://plus.unsplash.com/premium_photo-1683134512538-7b390d0adc9e" },
    { name: "Washing Machine", img: "https://plus.unsplash.com/premium_photo-1661342474567-f84bb6959d9f" },
    { name: "Fridge Repair", img: "https://plus.unsplash.com/premium_photo-1661342490985-26da70d07a52" },
    { name: "Microwave Repair", img: "https://plus.unsplash.com/premium_photo-1683134578634-62c44b2feca6" }
  ];

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = (product) => {

  const option =
    selectedOption[product.name] || product.options[0];

  const itemName = `${product.name} (${option.label})`;
  const itemImage = option.img || product.img;

  const exist = cart.find(item => item.name === itemName);

  if (exist) {
    setCart(cart.map(item =>
      item.name === itemName
        ? { ...item, qty: item.qty + 1 }
        : item
    ));
        toast.success("Quantity Updated");
  } else {
    setCart([
      ...cart,
      {
        name: itemName,
        price: option.price,
        qty: 1,
        img: itemImage
      }
    ]);
     toast.success("Product Added To Cart");
  }
};


  /* ---------------- WHATSAPP BOOKING ---------------- */
  const sendWhatsApp = () => {
    
   
   if (!form.name || !form.mobile || !form.address || !form.service) {
    toast.error("Please fill all details");
    return;
  }
  
  if(form.service === "Other" && !form.otherService){
toast.error("Please type your service");
return;
}

 if (!/^[6-9]\d{9}$/.test(form.mobile)) {
  toast.error("Enter valid Indian mobile number");
  return;
}

    const phone = "919057506998";
    const serviceName =
form.service === "Other"
? form.otherService
: form.service;

const mapLink = coords
? `https://maps.google.com/?q=${coords.lat},${coords.lon}`
: "";
    const msg = `Repair Booking

👤 Name: ${form.name}
📱 Mobile: ${form.mobile}
🔧 Service: ${serviceName}
🏠 Address: ${form.address}

📍 Location:
${mapLink}`;

 
  window.open(
`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
"_blank",
"noopener,noreferrer"
);

    toast.success("Booking Sent On WhatsApp");
    setForm({
       name: "",
    mobile: "",
    service:"",
    otherService:"",
    address: ""
    })
    setMapUrl("");
setCoords(null);
  };

  /* ---------------- TOTAL ---------------- */
 const total = cart?.reduce((a,b)=>a + b.price * b.qty,0) || 0;

  return (
    <div>

      {/* HERO */}
      <div className="relative overflow-hidden">

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300"></div>

        <div className="absolute bottom-0 left-0 w-full -z-10">
          <svg
            className="w-full h-32"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#bfdbfe"
              d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,176C672,192,768,224,864,229.3C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="grid md:grid-cols-2 items-center p-10 relative z-10">
          <div>
 

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Your One-Stop Electronics & Appliance Repair Shop
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              We Sell & Repair All Major Home Appliances and Electronic Items.
            </p>

           <button
  onClick={() =>
    window.open("https://maps.google.com/?q=Guddu+Electronic+Jaipur")
  }
  className="bg-blue-600 text-white px-6 py-2 mt-6 rounded cursor-pointer hover:bg-blue-700 transition"
>
  Shop Now
</button>
<p className="mt-4 text-gray-700">
  📢 Check our latest{" "}
  <Link
    to="/ac-repair-cost-jaipur"
    className="text-blue-600 hover:text-blue-800 underline font-semibold"
  >
    AC, Fridge, Washing Machine & Microwave Repair Price List in Jaipur
  </Link>{" "}
  – Transparent pricing & no hidden charges.
</p>

          </div>
          

          <div className="flex justify-center mt-8 md:mt-0">
            <img
              src={groupImage}
              alt="Appliance Group"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <Services services={services} />

      {/* PRODUCTS */}
  
<section className="px-4 sm:px-6 lg:px-10 py-10 bg-gray-50">

<h2 className="text-xl sm:text-2xl font-bold mb-8 text-center sm:text-left">
  Electrical Items For Sale
</h2>

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">

{products.slice(0, isMobile ? 6 : 8).map((p, i) => {

  const selected = selectedOption[p.name] || p.options[0];
  const price = selected.price;
  const mrp = selected.mrp;

  const discount = mrp
    ? Math.round(((mrp - price) / mrp) * 100)
    : 0;

  return (

<div
key={i}
className="bg-white rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>

{/* IMAGE */}
<div className="relative bg-white flex items-center justify-center h-36 sm:h-44">

{discount > 0 && (


<span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded shadow">
{discount}% OFF
</span>
)}

<img
src={selected.img || p.img}
alt={p.name}
className="max-h-full object-contain transition"
/>

</div>

{/* INFO */}
<div className="p-3">

<h3 className="font-semibold text-sm sm:text-base line-clamp-2">
{p.name}
</h3>

{/* WARRANTY */}
{p.warranty && (
<p className="text-green-600 text-xs mt-1">
{p.warranty}
</p>
)}

{/* OPTION */}
<select
className="border w-full mt-2 p-1.5 text-sm rounded cursor-pointer"
onChange={(e) =>
setSelectedOption({
...selectedOption,
[p.name]: p.options.find(o => o.label === e.target.value),
})
}
>
{p.options.map((op, i) => (
<option key={i} value={op.label}>
{op.label}
</option>
))}
</select>

{/* PRICE */}
<div className="flex items-center mt-2 gap-2">

{mrp && (
<span className="text-gray-400 line-through text-xs">
₹{mrp}
</span>
)}

<span className="font-bold text-blue-600 text-base">
₹{price}
</span>

</div>

{/* BUTTON */}
<button
onClick={() => addToCart(p)}
className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-3 py-3 rounded-md text-sm transition"
>
Add To Cart
</button>

</div>

</div>

);
})}

</div>

{/* VIEW ALL */}
<div className="flex justify-center mt-10">

<button
onClick={() => navigate("/products")}
className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
>
View All Products
</button>

</div>

</section>

      {/* BOOKING + CART */}
     <section className="px-4 sm:px-6 lg:px-10 py-8 flex flex-col md:flex-row gap-6 items-start">


{/* BOOKING */}
<div className="bg-white p-5 sm:p-6 rounded-xl shadow-md w-full md:w-1/2">

<h2 className="font-bold text-lg sm:text-xl mb-4">
Repair Booking
</h2>

<input
placeholder="Your Name"
value={form.name}
className="border rounded-md p-2.5 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
onChange={e=>setForm({...form,name:e.target.value})}
/>

<input
placeholder="Mobile Number"
value={form.mobile}
maxLength={10}
className="border rounded-md p-2.5 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
onChange={(e) => {
const value = e.target.value.replace(/\D/g, "");
setForm({ ...form, mobile: value });
}}
/>

<select
value={form.service}
className="border rounded-md p-2.5 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
onChange={(e)=>setForm({...form,service:e.target.value})}
>

<option value="">Select Repair Service</option>
<option value="AC Repair">AC Repair</option>
<option value="Fridge Repair">Fridge Repair</option>
<option value="Washing Machine Repair">Washing Machine Repair</option>
<option value="Microwave Repair">Microwave Repair</option>
<option value="TV Repair">TV Repair</option>
<option value="Other">Other</option>

</select>
{form.service === "Other" && (

<input
placeholder="Type Your Service"
value={form.otherService}
className="border rounded-md p-2.5 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
onChange={(e)=>setForm({...form,otherService:e.target.value})}
/>

)}

<textarea

placeholder="Address"
value={form.address}
className="border rounded-md p-2.5 w-full mb-2 resize-none"
onChange={e=>setForm({...form,address:e.target.value})}
/>

<button
onClick={getLocation}
className="text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition mb-3"
>
Use Current Location
</button>
{mapUrl && (

<div className="mt-3">

<iframe
title="map"
src={mapUrl}
className="w-full h-40 sm:h-48 rounded-lg border"
loading="lazy"
></iframe>

</div>

)}

<button
onClick={sendWhatsApp}
className="bg-green-600 hover:bg-green-700 text-white w-full py-2.5 rounded-md transition cursor-pointer"
>
Book On WhatsApp
</button>

</div>

{/* CART */}
<div className="bg-white p-5 sm:p-6 rounded-xl shadow-md w-full md:w-1/2">

<PurchaseCart
cart={cart}
setCart={setCart}
total={total}
form={form}
setForm={setForm}
/>

</div>

</section>
     
      {/* ⭐ SEO CONTENT START */}
      <section className="px-10 pb-10 text-gray-700 leading-relaxed bg-gray-50">

        <h2 className="text-2xl font-bold mb-2">
          Electrical Shop in Jaipur
        </h2>

        <p>
          Guddu Electronic Shop provides high quality electrical products
          including bulbs, switches, fans, regulators, wires and accessories.
          We also provide AC repair, fridge repair and washing machine repair
          services in Jaipur.
        </p>
     

      </section>
      <Footer/>

    </div>
  );
}


