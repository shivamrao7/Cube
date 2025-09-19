import React, { useState } from "react";

const LOCATIONS = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];

function SEMForm({ setResults }) {
  const [form, setForm] = useState({
    brand_url: "",
    competitor_url: "",
    locations: [],
    shopping_budget: "",
    search_budget: "",
    pmax_budget: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleLocationChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm((prev) => ({ ...prev, locations: options }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/generate_keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      alert("Error fetching results");
    }
    setLoading(false);
  };

  return (
    <form className="bg-white p-6 rounded shadow mb-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block font-medium mb-1">Brand Website URL</label>
        <input
          type="text"
          name="brand_url"
          value={form.brand_url}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Competitor Website URL</label>
        <input
          type="text"
          name="competitor_url"
          value={form.competitor_url}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Service Locations</label>
        <select
          multiple
          name="locations"
          value={form.locations}
          onChange={handleLocationChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Shopping Ads Budget</label>
          <input
            type="number"
            name="shopping_budget"
            value={form.shopping_budget}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            min={0}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Search Ads Budget</label>
          <input
            type="number"
            name="search_budget"
            value={form.search_budget}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            min={0}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">PMax Ads Budget</label>
          <input
            type="number"
            name="pmax_budget"
            value={form.pmax_budget}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            min={0}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full mt-4"
        disabled={loading}
      >
        {loading ? "Generating..." : "Submit"}
      </button>
    </form>
  );
}

export default SEMForm;
