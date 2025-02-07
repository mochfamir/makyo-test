import React, { useState } from "react";
import { Dropdown } from "./components/Dropdown/Dropdown";

const options = [
  { value: "rendang", label: "Rendang" },
  { value: "sate", label: "Sate" },
  { value: "gudeg", label: "Gudeg" },
  { value: "pempek", label: "Pempek" },
  { value: "nasi_goreng", label: "Nasi Goreng" },
];

function App() {
  const [value, setValue] = useState<string>();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Dropdown Component Demo
        </h1>
        <Dropdown
          options={options}
          value={value}
          onChange={setValue as any}
          placeholder="Select the dishes"
          multiple={true}
        />
      </div>
    </div>
  );
}

export default App;
