import { useState, useEffect } from "react";

export default function Cars({ mode }) {
  const [cars, setCars] = useState([]);
  const [type, setType] = useState("supercars");

  useEffect(() => {
    loadCars("supercars");
  }, []);

  const loadCars = async (selectedType) => {
    try {
      const res = await fetch(`http://localhost:3000/api/cars/${selectedType}`);
      const data = await res.json();

      setCars(data);
    } catch (error) {
      console.error("Error loading cars:", error);
    }
  };

  const switchType = (selectedType) => {
    setType(selectedType);
    loadCars(selectedType);
  };

  return (
    <div className={`${mode === "light" ? "text-black" : "text-white"}`}>
      <h1 className="text-3xl font-bold text-center mb-10">Car Collection</h1>

      {/* Apple Style Toggle */}

      <div className="flex justify-center mb-12">
        <div
          className={`relative flex rounded-full p-1 w-64 transition ${
            mode === "light" ? "bg-gray-300" : "bg-[#2c2c2e]"
          }`}
        >
          {/* sliding pill */}

          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full shadow transition-all duration-300 ${
              mode === "light" ? "bg-white" : "bg-[#505053]"
            } ${type === "supercars" ? "left-1" : "left-[calc(50%+0px)]"}`}
          />

          <button
            onClick={() => switchType("supercars")}
            className="relative flex-1 text-center py-2 font-medium z-10"
          >
            Supercars
          </button>

          <button
            onClick={() => switchType("hypercars")}
            className="relative flex-1 text-center py-2 font-medium z-10"
          >
            Hypercars
          </button>
        </div>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow hover:shadow-lg transition ${
              mode === "light"
                ? "bg-white text-black"
                : "bg-[#1c1c1e] text-white"
            }`}
          >
            <h2 className="text-xl font-semibold">{car.name}</h2>

            <p
              className={`mt-2 ${
                mode === "light" ? "text-gray-600" : "text-[#d1d1d6]"
              }`}
            >
              {car.brand}
            </p>

            <p
              className={`${
                mode === "light" ? "text-gray-500" : "text-[#8e8e93]"
              }`}
            >
              {car.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
