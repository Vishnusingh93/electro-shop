
import { Snowflake, WashingMachine, Refrigerator, Microwave, Tv, Fan } from "lucide-react";
import toast from "react-hot-toast";
import { FaWhatsapp} from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
export default function ServiceCategories() {

  const services = [
    { 
      name: "AC Repair", 
      icon: <Snowflake size={40} />, 
      active: true,
      desc: "Split & Window AC repair, gas filling, cooling issue fix."
    },
    { 
      name: "Washing Machine Repair", 
      icon: <WashingMachine size={40} />, 
      active: true,
      desc: "Front load & top load washing machine repair service."
    },
    { 
      name: "Fridge Repair", 
      icon: <Refrigerator size={40} />, 
      active: true,
      desc: "Cooling problem,  compressor repair & gas refill."
    },
    { 
      name: "Microwave Repair", 
      icon: <Microwave size={40} />, 
      active: true,
      desc: "Not heating, spark issue, display & power problem fix."
    },
    { 
      name: "TV Repair", 
      icon: <Tv size={40} />, 
      active: false 
    },
    { 
      name: "Fan Repair", 
      icon: <Fan size={40} />, 
      active: false 
    }
  ];

  const whatsappNumber = "919057506998"; 

  const handleWhatsApp = (serviceName) => {
    const message = `Service Booking - Guddu Electronics

Name:
Area (Jaipur):
Problem:

Service Required: ${serviceName}

Please confirm visit time.`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
   
    window.open(url, "_blank");
    toast.success(`${serviceName} booking opened on WhatsApp`);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-4">
        Home Appliance Repair Services in Jaipur
      </h1>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        We provide same-day AC repair, fridge repair, washing machine repair 
        and microwave repair services in Sodala, Mansarovar, Jagatpura, 
        Vaishali Nagar and nearby areas of Jaipur.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {services.map((service) => (
          <div
            key={service.name}
            className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition relative"
          >

            {!service.active && (
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                Coming Soon
              </span>
            )}

            <div className="flex justify-center text-blue-600 mb-3">
              {service.icon}
            </div>

            <h3 className="font-semibold text-lg mb-2">
              {service.name}
            </h3>

            {service.desc && (
              <p className="text-sm text-gray-600 mb-3">
                {service.desc}
              </p>
            )}

           {service.active ? (
  <div className="flex justify-center gap-3 mt-3">

    {/* Call Button */}
    <a
  href="tel:+919057506998"
  className="bg-blue-600 w-full flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium shadow active:scale-95"
>
  <FaPhoneAlt className="text-sm" />
  Call
</a>

    {/* WhatsApp Button */}
    <button
  onClick={() => handleWhatsApp(service.name)}
className="bg-green-600 w-full flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 active:scale-95 transition text-sm font-medium">
  <FaWhatsapp className="text-lg" />
  WhatsApp
</button>

  </div>
) : (
  <button className="mt-3 bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed">
    Coming Soon
  </button>
)}

          </div>
        ))}

      </div>
    </div>
  );
}