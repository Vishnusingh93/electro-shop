import React from "react";
import Footer from "../components/Footer";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import GoogleQR from "../assets/google-qr.png";

export default function ServiceAreas() {

  const phone = "9057506998";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="bg-blue-600 text-white py-10 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          AC Repair & Appliance Home Service in Jaipur
        </h1>

        <p className="mt-3 text-sm sm:text-lg">
          Fast & Reliable Same-Day Home Service Available
        </p>

        {/* BUTTONS */}
    
<div className="mt-5 flex justify-center gap-3">

  <a
    href={`tel:${phone}`}
    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-5 py-3 rounded-lg shadow transition text-sm font-medium"
  >
    <FaPhoneAlt />
    Call Now
  </a>

  <a
    href={`https://wa.me/91${phone}`}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-5 py-3 rounded-lg shadow transition text-sm font-medium"
  >
    <FaWhatsapp />
    WhatsApp
  </a>

</div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        <h2 className="text-xl sm:text-2xl font-bold mb-3">
          🗺️ We Provide Home Service In:
        </h2>

        <p className="mb-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          Guddu Electronics provides professional AC repair, fridge repair,
          washing machine repair and other appliance services across Jaipur.
          Our trained technicians provide fast doorstep service in the
          following areas:
        </p>

        {/* AREAS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-gray-800">

          {[
            "Sodala","Jagatpura","Mansarovar","Civil Lines",
            "Vaishali Nagar","Kartarpura Phatak","Shyam Nagar",
            "Malviya Nagar","Triveni Nagar","C Scheme",
            "Gurjar Ki Thadi","Nandpuri Colony","Sudarshanpura",
            "Ganesh Nagar","Devi Nagar","Geejgarh Vihar",
            "Mahesh Nagar Phatak","Tonk Phatak"
          ].map((area, index) => (
            <div
              key={index}
              className="bg-white shadow-sm p-3 rounded text-center text-sm sm:text-base hover:shadow-md transition"
            >
              {area}, Jaipur
            </div>
          ))}

        </div>

        {/* EXTRA INFO */}
        <div className="mt-10 bg-blue-50 p-4 sm:p-6 rounded-lg text-center shadow-sm max-w-3xl mx-auto">
          <p className="text-gray-700 text-sm sm:text-lg leading-relaxed">
            If your area is not listed above, don’t worry! We also provide home 
            service in nearby locations of Jaipur. Contact us today for fast 
            booking and expert AC & appliance repair services at your doorstep.
          </p>
        </div>

        {/* CALL SECTION */}
        <div className="mt-10 text-center bg-white p-5 sm:p-6 rounded-lg shadow">
          <h3 className="text-lg sm:text-xl font-bold mb-2">
            Need Immediate Appliance Repair?
          </h3>

          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Call us now for fast and reliable home service anywhere in Jaipur.
          </p>


          <a
  href={`tel:${phone}`}
  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow transition text-sm font-medium min-w-[160px]"
>
  <FaPhoneAlt />
  Call {phone}
</a>
        </div>

        {/* GOOGLE QR */}
        <div className="mt-12 text-center bg-white p-6 sm:p-8 rounded-xl shadow-md max-w-md mx-auto">
          <h3 className="text-lg sm:text-xl font-bold mb-3">
            ⭐ Check Us Out on Google
          </h3>

          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Scan the QR code to view our Google profile and leave a review.
          </p>

          <img
            src={GoogleQR}
            alt="Google Review QR"
            className="w-40 sm:w-56 mx-auto rounded-lg"
          />

          <p className="mt-4 font-semibold text-gray-800 text-sm sm:text-base">
            Guddu Electronics & Electronics
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}