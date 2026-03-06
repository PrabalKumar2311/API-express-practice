import { useState } from 'react'
import Cars from "./Cars"


function App() {

  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <>
    <div className={`min-h-screen ${mode === "light" ? "bg-gray-200" : "bg-black"} p-10`}>

      <div className="flex justify-end mb-4">
        <button
          onClick={toggleMode}
          className={`px-4 py-2 rounded-full ${mode === "light" ? "bg-white text-black" : "text-white bg-[#2c2c2e]"}`}
        >
          {mode === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    <Cars mode={mode}/>
      </div>

    </>
  )
}

export default App;