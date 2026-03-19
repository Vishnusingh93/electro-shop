import React, { useState } from "react";
import { databases } from "../../lib/appwrite"; // aapke project path ke hisaab se
import { ID } from "appwrite";
import toast from "react-hot-toast";
function Help() {
  const [form, setForm] = useState({
    complainantName: "",
    complainantPhone: "",
    targetName: "",
    targetPhone: "",
    targetService: "",
    description: ""
  });

  // Input change handle
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.complainantName || !form.complainantPhone || !form.targetName || !form.description) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.complainantPhone)) {
      toast.error("Enter valid 10 digit phone number for complainant");
      return;
    }

    try {
      await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,       // Database ID from env
  import.meta.env.VITE_APPWRITE_COLLECTION_ID, 
        ID.unique(),
        {
          ...form,
          date: new Date().toLocaleString(),
          status: "Pending"
        }
      );

      toast.success("Complaint submitted successfully");

      // Clear form
      setForm({
        complainantName: "",
        complainantPhone: "",
        targetName: "",
        targetPhone: "",
        targetService: "",
        description: ""
      });

    } catch (err) {
      console.log(err);
      toast.error("Error submitting complaint");
    }
  };

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Submit Complaint / Report</h2>
      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Complainant Details */}
        <h3 className="font-semibold">Your Details (Complainant)</h3>
        <input
          name="complainantName"
          placeholder="Your Name"
          value={form.complainantName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="complainantPhone"
          placeholder="Your Phone Number"
          value={form.complainantPhone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Target Person / Technician */}
        <h3 className="font-semibold mt-4">Person / Technician Details</h3>
        <input
          name="targetName"
          placeholder="Name of Person / Technician"
          value={form.targetName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="targetPhone"
          placeholder="Phone Number of Person / Technician"
          value={form.targetPhone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="targetService"
          placeholder="Service / Work Done"
          value={form.targetService}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Complaint Description */}
        <textarea
          name="description"
          placeholder="Describe the issue / complaint"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
          required
        ></textarea>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit Complaint
        </button>

        <p className="text-sm text-gray-600 mt-2">
          <strong>Note:</strong> Form fill karte waqt please correct information dein. 
          Aapke details aur jiske baare me complaint hai dono clear honi chahiye. 
          Hum aapke feedback ko seriously lenge aur zarurat padne par action lenge.
        </p>
      </form>
    </div>
  );
}

export default Help;
