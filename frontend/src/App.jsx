import { useState } from "react";

function App() {

  const [cars, setCars] = useState([]);

  const loadCars = async () => {
    try {
      const res = await fetch("http://localhost:3000/");
      const data = await res.json();

      setCars(data);

    } catch (error) {
      console.error("Error loading cars:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        Supercars
      </h1>

      <div className="flex justify-center mb-10">
        <button
          onClick={loadCars}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Load Cars
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {cars.map((car, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{car.name}</h2>
            <p className="text-gray-600 my-2">{car.make}</p>
            <p className="text-gray-500 my-2">{car.price}</p>
            <p className="text-gray-500 my-2">{car.launch_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;



// name
// "Bugatti Mistral"
// make
// "Bugatti"
// model
// "Mistral"
// price
// 5000000
// launch_year
// 2022