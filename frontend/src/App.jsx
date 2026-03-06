import { useState } from "react";

function App() {

  const [cars, setCars] = useState([]);
  const [type, setType] = useState("supercars");

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
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        Car Collection
      </h1>

      {/* Apple Style Toggle */}
      <div className="flex justify-center mb-10">

  <div className="relative flex bg-gray-200 rounded-full p-1 w-64">

    {/* Sliding pill */}
    <div
      className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow transition-all duration-300 ${
        type === "supercars" ? "left-1" : "left-[calc(50%+0px)]"
      }`}
    ></div>

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
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{car.name}</h2>
            <p className="text-gray-600 mt-2">{car.brand}</p>
            <p className="text-gray-500">{car.price}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default App;