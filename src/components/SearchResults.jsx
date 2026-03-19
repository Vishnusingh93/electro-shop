import { useLocation } from "react-router-dom";
import { products } from "../data/productsData";
import { services } from "../data/servicesData";
import { MdSearchOff } from "react-icons/md";
export default function SearchResults() {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchText = query.get("q")?.toLowerCase() || "";
  
  if (!searchText) {
  return <p className="p-10">Please search something...</p>;
}

  // const productResults = products.filter(p =>
  //   p.name.toLowerCase().includes(searchText)
  // );

  // const serviceResults = services.filter(s =>
  //   s.name.toLowerCase().includes(searchText)
  // );
  
  const productResults = products.filter(p =>
  p.name.toLowerCase().includes(searchText) ||
  p.category?.toLowerCase().includes(searchText) ||
  p.tags?.some(tag => tag.toLowerCase().includes(searchText))
);

const serviceResults = services.filter(s =>
  s.name.toLowerCase().includes(searchText) ||
  s.category?.toLowerCase().includes(searchText) ||
  s.tags?.some(tag => tag.toLowerCase().includes(searchText))
);

  return (

    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
  {productResults.length + serviceResults.length} results for "{searchText}"
</h1>

      {/* PRODUCTS */}
      {productResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">Products</h2>

          <div className="grid md:grid-cols-3 gap-6">

            {productResults.map((p,i) => (

              <div
                key={i}
                className="bg-white shadow p-4 rounded"
              >

                <img
                  src={p.img}
                  alt={p.name}
                  className="h-32 w-full object-contain"
                />

                <h3 className="mt-2 font-semibold">
                  {p.name}
                </h3>

              </div>

            ))}

          </div>
        </>
      )}

      {/* SERVICES */}
      {serviceResults.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-10 mb-4">
            Services
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {serviceResults.map((s,i) => (

              <div
                key={i}
                className="bg-white shadow p-4 rounded"
              >

                <img
                  src={s.img}
                  alt={s.name}
                  className="h-32 w-full object-cover"
                />

                <h3 className="mt-2 font-semibold">
                  {s.name}
                </h3>

              </div>

            ))}

          </div>
        </>
      )}
      

{productResults.length === 0 && serviceResults.length === 0 && (
  <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
    
    <MdSearchOff className="text-6xl mb-4 text-gray-400" />

    <p className="text-xl font-semibold">
      No results found
    </p>

    <p className="text-sm mt-2">
      Try searching something else for "<span className="font-medium text-gray-700">{searchText}</span>"
    </p>

  </div>
)}

    </div>
  );
}