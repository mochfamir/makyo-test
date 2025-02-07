import React, { useState } from "react";
import { Dropdown } from "./components/Dropdown/Dropdown";

const options = [
  { value: "1", label: "React" },
  { value: "2", label: "Vue" },
  { value: "3", label: "Angular" },
  { value: "4", label: "Svelte" },
  { value: "5", label: "Next.js" },
];

function App() {
  const [value, setValue] = useState<string>("1");
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
          placeholder="Select a framework"
          multiple={true}
        />
      </div>
    </div>
  );
}

export default App;
