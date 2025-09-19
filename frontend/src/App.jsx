import React, { useState } from "react";
import SEMForm from "./components/SEMForm";
import Results from "./components/Results";

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">SEM Planner Tool</h1>
        <SEMForm setResults={setResults} />
        {results && <Results data={results} />}
      </div>
    </div>
  );
}

export default App;
