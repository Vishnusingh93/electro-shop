

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const navigate = useNavigate();

  const shop = {
    name: "Guddu Electronic Shop",
    address: "Swej Farm, Mjrp Road, Nandhpuri, Jaipur, India",
    mobile: "9057506998",
    email: "info@electroshop.com",
    googleMapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.30068490677!2d75.78229329999999!3d26.8939508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db50032eb91cf%3A0xef72649aa5954047!2sGuddu%20electronic%20and%20electronics!5e0!3m2!1sen!2sin!4v1770398142032!5m2!1sen!2sin",
  };

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 flex flex-col md:flex-row gap-8 bg-gray-50 min-h-screen">

      {/* LEFT SIDE */}
      <div className="flex-1 space-y-4">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold">
          {shop.name}
        </h1>

        {/* ABOUT PARAGRAPH */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          We provide reliable home appliance repair services in Jaipur including 
          AC repair, washing machine repair, fridge repair and microwave repair. 
          Our expert technicians offer same-day service for cooling issues, gas filling, 
          compressor repair, and all types of electrical appliance problems. 
          We serve areas like Mansarovar, Sodala, Vaishali Nagar and nearby locations 
          with fast and affordable service.
        </p>

        {/* CONTACT INFO */}
        <div className="space-y-2 text-sm sm:text-base">
          <p>
            <strong>Address:</strong> {shop.address}
          </p>

          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-blue-600" />
            <a href={`tel:${shop.mobile}`} className="text-blue-600">
              {shop.mobile}
            </a>
          </p>

          <p className="flex items-center gap-2">
            <FaEnvelope className="text-blue-600" />
            <a href={`mailto:${shop.email}`} className="text-blue-600">
              {shop.email}
            </a>
          </p>
        </div>

        {/* BUTTON */}
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
  ⚠️ Agar koi worker ya technician aapse badtameezi karta hai ya service me koi problem hoti hai, 
  to please yaha complaint karein. Hum aapki complaint ko seriously lete hain.
</p>
        <button
          className="mt-4 w-full sm:w-fit bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition font-medium"
          onClick={() => navigate("/help")}
        >
          Submit Complaint / Help
        </button>
      </div>

      {/* RIGHT SIDE MAP */}
      <div className="flex-1">
        <iframe
          src={shop.googleMapEmbed}
          className="w-full h-[250px] sm:h-[300px] md:h-[450px] rounded-xl shadow"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

    </div>
  );
}