import { useState, useEffect } from "react";
import { databases, storage } from "../../lib/appwrite";
import { ID,Query } from "appwrite";
import toast from "react-hot-toast";
import Cropper from "react-easy-crop";

import { 
FaUserTie,
FaMapMarkerAlt,
FaTools,
FaCamera,
FaStar,
FaCheckCircle 

} from "react-icons/fa";

import { MdWork } from "react-icons/md";


export default function JoinTechnician() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: [],
    service: [],
    otherService: "",
    experience: "",
    image: null,
    reviewImage: null
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [reviewPreview, setReviewPreview] = useState(null);
  const [loading,setLoading] = useState(false);
  const [submitted,setSubmitted] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
const [zoom, setZoom] = useState(1);
const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
const [showCrop, setShowCrop] = useState(false);
const [otherArea,setOtherArea] = useState("")
const [showAreas, setShowAreas] = useState(false);
const [showServices, setShowServices] = useState(false);

  useEffect(() => {

  if(submitted){

    setTimeout(() => {
      window.location.href = "/";
    },10000)

  }

},[submitted])



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAreaChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({ ...form, area: [...form.area, value] });
    } else {
      setForm({
        ...form,
        area: form.area.filter((a) => a !== value)
      });
    }
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({ ...form, service: [...form.service, value] });
    } else {
      setForm({
        ...form,
        service: form.service.filter((s) => s !== value)
      });
    }
  };

  



const handleImageChange = (e) => {

  const file = e.target.files[0]

  if(!file) return

  const imageUrl = URL.createObjectURL(file)

  setForm({...form,image:file})
  setPreviewUrl(imageUrl)

  setShowCrop(true)   // crop mode open

}


  const handleReviewImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
   const renamedFile = new File(
  [file],
  `${form.phone}-review.${file.type.split("/")[1]}`,
  { type: file.type }
)

setForm({ ...form, reviewImage: renamedFile })
      setReviewPreview(URL.createObjectURL(file));
    }
  };

const handleCrop = async () => {

  const image = new Image()
  image.src = previewUrl

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  const { width, height, x, y } = croppedAreaPixels

  canvas.width = width
  canvas.height = height

  ctx.drawImage(
    image,
    x,
    y,
    width,
    height,
    0,
    0,
    width,
    height
  )

  canvas.toBlob((blob) => {

    const croppedFile = new File(
  [blob],
  `${form.phone}-profile.jpg`,
  { type: "image/jpeg" }
)
    setForm({...form,image:croppedFile})
    setPreviewUrl(URL.createObjectURL(blob))
    setShowCrop(false)

  },"image/jpeg")

}

const handleSubmit = async (e) => {
  e.preventDefault();
  const finalAreas = form.area.includes("Other")
  ? [...form.area.filter(a=>a!=="Other"), otherArea]
  : form.area
  const data = {
    ...form,
    area: finalAreas
  }

  if (!form.name || !form.phone) {
    toast.error("Name and Phone are required!");
    return;
  }

  if (!/^[0-9]{10}$/.test(form.phone)) {
    toast.error("Enter valid 10 digit phone number");
    return;
  }

  if (form.area.length === 0) {
    toast.error("Select at least one area");
    return;
  }

  if (form.service.length === 0) {
    toast.error("Select at least one service");
    return;
  }

  try {

    setLoading(true);

    const existing = await databases.listDocuments(
      "69ac4ed70008af2f855e",
      "technicians",
      [Query.equal("phone", form.phone)]
    );

    if (existing.documents.length > 0) {
      toast.error("Technician already registered with this phone");
      setLoading(false);
      return;
    }

    let imageFileId = null;
    let reviewFileId = null;

    if (form.image) {
      const uploadedFile = await storage.createFile(
        "69ac636d0036515c92f1",
        ID.unique(),
        form.image
      );

      imageFileId = uploadedFile.$id;
    }

    if (form.reviewImage) {
      const reviewUpload = await storage.createFile(
        "69ac636d0036515c92f1",
        ID.unique(),
        form.reviewImage
      );

      reviewFileId = reviewUpload.$id;
    }

    const services =
      form.service.includes("Other") && form.otherService
        ? [...form.service.filter((s) => s !== "Other"), form.otherService]
        : form.service;

    await databases.createDocument(
      "69ac4ed70008af2f855e",
      "technicians",
      ID.unique(),
      {
        name: form.name,
        phone: form.phone,
         area: finalAreas,
        service: services,
        experience: form.experience,
         image: imageFileId,
        reviewScreenshot: reviewFileId,
        freeCalls: reviewFileId ? 3 : 0,
        date: new Date().toLocaleString()
      }
    );

    setSubmitted(true);
    toast.success("Request Submitted");

  } catch (err) {
    console.error(err);
    toast.error("Error submitting request");
  }

  setLoading(false);
};




if(submitted){
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-white px-4">

      <div className="bg-zinc-800/70 backdrop-blur-md border border-zinc-700 p-10 rounded-2xl text-center max-w-md shadow-2xl">

        <div className="flex justify-center mb-6 animate-bounce">
          <div className="bg-green-500/20 p-5 rounded-full">
            <FaCheckCircle className="text-green-400 text-4xl"/>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">
  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
    Application Submitted
  </span>
  <span className="ml-2">🎉</span>
</h1>

        <p className="text-lg text-gray-200">
          Thank you for joining our technician network.
        </p>

        <p className="text-gray-400 mt-2">
          Our team will review your request and contact you soon.
        </p>

        <p className="text-sm text-gray-500 mt-4">
          Redirecting to home page in 5 seconds...
        </p>

      </div>

    </div>
  )
}

return (
  <div className="min-h-screen bg-gradient-to-b from-white to-zinc-900 text-black py-10 px-4">

    <div className="max-w-3xl mx-auto">

      <div className="text-center mb-10">

<div className="flex justify-center mb-4">
<div className="bg-blue-600 p-4 rounded-full shadow-lg">
<FaUserTie className="text-white text-3xl"/>
</div>
</div>

<h1 className="text-4xl font-bold">Join as Technician</h1>

<p className="text-gray-700 mt-2">
Start earning by providing home appliance services in Jaipur
</p>

<div className="flex justify-center gap-4 mt-4 flex-wrap">

<div className="bg-white shadow px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
<FaTools className="text-blue-500"/> Professional Work
</div>

<div className="bg-white shadow px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
<MdWork className="text-green-500"/> Daily Leads
</div>

<div className="bg-white shadow px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
<FaStar className="text-yellow-500"/> Grow Business
</div>

</div>

</div>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-xl text-white"
      >

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none"
          />

          {/* <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none"
          /> */}
          <input
  name="phone"
  type="tel"
  inputMode="numeric"
  placeholder="Phone Number"
  value={form.phone}
  onChange={(e) => {
    let value = e.target.value;

    // ❌ agar letters ya symbols
    if (/\D/.test(value)) {
      toast.error("Only numbers allowed", { id: "only-number" });
      return;
    }

    // ❌ agar 10 digit se zyada
    if (value.length > 10) {
      toast.error("Only 10 digits allowed", { id: "max-digit" });
      return;
    }

    setForm({ ...form, phone: value });
  }}
  className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none"
/>

        </div>

        <div>
  <h3 
    onClick={() => setShowAreas(!showAreas)}
    className="font-semibold mb-3 text-lg flex items-center justify-between gap-2 cursor-pointer"
  >
    <span className="flex items-center gap-2">
      <FaMapMarkerAlt className="text-blue-500"/> Service Areas
    </span>

    <span>{showAreas ? "▲" : "▼"}</span>
  </h3>

  {showAreas && (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

      {[
        "Sodala","Jagatpura","Mansarovar","Civil Lines",
        "Vaishali Nagar","Kartarpura Phatak","Shyam Nagar",
        "Malviya Nagar","Triveni Nagar","C Scheme",
        "Gurjar Ki Thadi","Nandpuri Colony","Sudarshanpura",
        "Ganesh Nagar","Devi Nagar","Geejgarh Vihar",
        "Mahesh Nagar Phatak","Tonk Phatak"
      ].map((area) => (

        <label
          key={area}
          className="flex items-center gap-2 bg-zinc-800 p-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
        >
          <input
            type="checkbox"
            value={area}
            checked={form.area.includes(area)}
            onChange={handleAreaChange}
          />

          {area}
        </label>

      ))}

      {/* OTHER OPTION */}
      <label className="flex items-center gap-2 bg-zinc-800 p-2 rounded-lg hover:bg-blue-600 transition">
        <input
          type="checkbox"
          checked={form.area.includes("Other")}
          onChange={(e)=>{
            if(e.target.checked){
              setForm({...form, area:[...form.area,"Other"]})
            }else{
              setForm({...form, area:form.area.filter(a=>a!=="Other")})
            }
          }}
        />
        Other
      </label>

      {/* OTHER INPUT */}
      {form.area.includes("Other") && (
        <input
          type="text"
          placeholder="Enter your area"
          className="col-span-full bg-zinc-900 border border-zinc-700 p-2 rounded-lg"
          onChange={(e)=>setOtherArea(e.target.value)}
        />
      )}

    </div>
  )}
</div>

      <div>
  <h3 
    onClick={() => setShowServices(!showServices)}
    className="font-semibold mb-3 text-lg flex items-center justify-between cursor-pointer"
  >
    <span className="flex items-center gap-2">
      <FaTools className="text-green-500"/> Services You Provide
    </span>

    <span>{showServices ? "▲" : "▼"}</span>
  </h3>

  {showServices && (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

      {[
        "AC Repair",
        "Fridge Repair",
        "Washing Machine",
        "Chimney Repair",
        "Microwave Repair",
        "RO Service",
        "Other"
      ].map((service) => (

        <label
          key={service}
          className="flex items-center gap-2 bg-zinc-800 p-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
        >
          <input
            type="checkbox"
            value={service}
            checked={form.service.includes(service)}
            onChange={handleServiceChange}
          />

          {service}
        </label>

      ))}

      {/* OTHER INPUT */}
      {form.service.includes("Other") && (
        <input
          name="otherService"
          placeholder="Enter Other Service"
          value={form.otherService}
          onChange={handleChange}
          className="col-span-full p-2 rounded-lg bg-zinc-900 border border-zinc-700"
        />
      )}

    </div>
  )}
</div>  

        {form.service.includes("Other") && (
          <input
            name="otherService"
            placeholder="Enter Other Service"
            value={form.otherService}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
          />
        )}

        <input
          name="experience"
          placeholder="Experience (years)"
          value={form.experience}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />

{/* {image upload} */}

<div className="bg-zinc-800 border border-zinc-700 p-6 rounded-2xl shadow-lg">

  {/* Heading */}
  <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
    <FaCamera className="text-blue-500"/>
    Upload Your Photo
  </h3>

  <div className="flex flex-col items-center gap-5">

    {/* Preview */}
    <div className="w-full flex justify-center">

      {!showCrop && (
        <div className="relative w-44 h-44 rounded-full border-4 border-blue-500/40 bg-zinc-900 overflow-hidden flex items-center justify-center shadow-xl">

          {previewUrl ? (
            <img
              src={previewUrl}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-gray-400">

              <div className="text-4xl mb-1">🧑‍🔧</div>
              <p className="text-sm">Technician Photo</p>

            </div>
          )}

        </div>
      )}

      {showCrop && (
        <div className="w-full max-w-sm flex flex-col gap-4">

          {/* Crop Area */}
          <div className="relative w-full h-64 bg-black rounded-xl overflow-hidden">

            <Cropper
              image={previewUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedArea, croppedPixels) => {
                setCroppedAreaPixels(croppedPixels);
              }}
            />

          </div>

          {/* Crop Button */}
          <button
            type="button"
            onClick={handleCrop}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Apply Crop
          </button>

        </div>
      )}

    </div>

    {/* Upload Button */}
    <label className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition px-6 py-2 rounded-lg text-sm font-semibold shadow-md">

      Upload Photo

      <input
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleImageChange}
        className="hidden"
      />

    </label>

    {/* Help Text */}
    <p className="text-xs text-gray-400 text-center max-w-xs leading-relaxed">
      Upload a clear photo so customers can easily identify you during service visits.
    </p>

  </div>

</div>

{/* {review image} */}

<div className="bg-zinc-800/80 border border-zinc-700 p-6 rounded-2xl shadow-xl space-y-5 backdrop-blur">

  {/* Header */}
  <div className="flex items-center gap-3">
    <div className="bg-yellow-400/20 p-2 rounded-lg">
      <FaStar className="text-yellow-400 text-xl"/>
    </div>
    <h3 className="font-semibold text-lg">Google Review Bonus</h3>
  </div>

  {/* Description */}
  <p className="text-sm text-gray-300 leading-relaxed">
    Give a Google review and get  
    <span className="text-green-400 font-semibold"> 3 FREE service calls</span>.
  </p>

  {/* Review Button */}
  <a
    href="https://www.google.com/search?q=guddu+electronics#lrd=0x396db50032eb91cf:0xef72649aa5954047,1"
    target="_blank"
    rel="noopener noreferrer"
    className="block text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition py-3 rounded-xl font-semibold shadow-lg"
  >
    ⭐ Give Google Review
  </a>

  {/* Screenshot Preview */}
  {reviewPreview && (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-3">
      <p className="text-xs text-gray-400 mb-2">Review Screenshot</p>

      <img
        src={reviewPreview}
        className="rounded-lg border border-zinc-700 max-h-48 object-cover w-full"
      />
    </div>
  )}

  {/* Upload Section */}


  <div className="space-y-3">

  <p className="text-sm font-medium text-gray-300">
    Upload <span className="text-green-400 font-semibold">Review Screenshot</span>
    <span className="text-gray-500 ml-1">(Optional)</span>
  </p>

  {/* Upload Button */}
  <label className="flex items-center justify-center w-full py-3 border border-zinc-700 rounded-xl bg-zinc-900 hover:bg-zinc-800 cursor-pointer transition">

    <span className="flex items-center gap-2 text-green-400 font-semibold">
📤 Upload Review Screenshot
</span>

    <input
      type="file"
      accept="image/*"
      onChange={handleReviewImageChange}
      className="hidden"
    />

  </label>

  <p className="text-xs text-gray-400 leading-relaxed">
    After submitting your Google review, upload the screenshot here to receive
    <span className="text-green-400 font-semibold"> 3 free service calls</span>.
  </p>

</div>

</div>

<button
  disabled={loading}
  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] transition py-3 rounded-lg font-semibold text-lg shadow-lg disabled:opacity-50"
>
  {loading ? "Submitting..." : "Submit Application"}
</button>

<div className="text-sm text-blue-100 mt-4 space-y-2 text-center">
           <p><strong>Note 1:</strong> Har customer complaint / service call par service charge lag sakta hai.</p>
           <p><strong>Note 2:</strong> Technician ko customer se confirm karna hoga.</p>
          <p><strong>Note 3:</strong> Galat info ya badtameezi par technician system se remove ho sakta hai.</p>
         </div>

      </form>

    </div>

  </div>
);
}