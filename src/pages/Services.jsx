

import React,{useState} from "react";
import toast from "react-hot-toast";
import { SHOP } from "../config";
import { useLocation } from "react-router-dom";


function Services({ services }) {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchText = query.get("q")?.toLowerCase() || "";

  const params = new URLSearchParams(location.search);
const searchName = params.get("q");
const [lang, setLang] = useState("en"); 

 
const filteredServices = !searchText
  ? services
  : services.filter((s) =>
      s.name.toLowerCase().includes(searchText) ||
      s.tags?.some((tag) =>
        tag.toLowerCase().includes(searchText)
      )
    );

  return (
    <section className="px-4 py-6 md:p-10">
      

      <h2 className="text-2xl font-bold mb-2 ">
        Our Services
      </h2>
   
<div className="flex gap-3 mb-2">

  <button
    onClick={() => setLang("en")}
    className={`px-5 py-2 rounded-full font-semibold border transition-all duration-300 cursor-pointer 
    ${lang === "en"
      ? "bg-blue-600 text-white shadow-md"
      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-gray-300"
    }`}
  >
    🇬🇧 English
  </button>

  <button
    onClick={() => setLang("hi")}
    className={`px-5 py-2 rounded-full font-semibold border transition-all duration-300 cursor-pointer
    ${lang === "hi"
      ? "bg-green-600 text-white shadow-md"
      : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border-gray-300"
    }`}
  >
    🇮🇳 Hindi
  </button>

</div>

       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

        {filteredServices.map((s) => (

          <div
            key={s.name}

            onClick={() => {

              const phone = SHOP.phone;

              if (!phone) {
                toast.error("WhatsApp number not configured");
                return;
              }

  const serviceName = searchName || s.name;

const msg =
lang === "hi"
  ? `नमस्ते, मुझे ${serviceName} की सर्विस चाहिए। कृपया संपर्क करें।`
  : `Hello, I would like to book ${serviceName} service. Please contact me.`;

              window.open(
                `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
                "_blank"
              );

              toast.success(`${searchName || s.name} booking opened on WhatsApp`);

            }}

            className="bg-white shadow-md rounded-xl p-3 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >

            <img
              src={s.img}
              alt={s.name}
              className="h-28 sm:h-32 md:h-36 w-full object-cover rounded"
            />

           
            <h3 className="text-center mt-2 font-semibold">
  {searchName || s.name}
</h3>

          </div>
          

        ))}

      </div>
      

    </section>

  );

}

export default Services;