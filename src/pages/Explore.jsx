import React, { useState, useEffect, useMemo } from "react";
import Card from "../components/Card";
import { data } from "../assets/data";
import { FaFilter, FaSearch } from "react-icons/fa";

const Explore = () => {
  const sneakers = data.sneakers;

  // States for filters
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [priceRange, setPriceRange] = useState(50000); // Max price
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Extract unique brands and genders
  const brands = ["All", ...new Set(sneakers.map(s => s.brand_name))];
  const genders = ["All", "men", "women", "youth"]; // Standardizing genders locally if needed, but using data values is better

  // Filter Logic
  const filteredItems = useMemo(() => {
    return sneakers.filter((s) => {
      // Basic validation
      if (!s.retail_price_cents || !s.story_html) return false;

      // Brand Filter
      if (selectedBrand !== "All" && s.brand_name !== selectedBrand) return false;

      // Gender Filter
      if (selectedGender !== "All" && !s.gender.includes(selectedGender)) return false;

      // Price Filter (cents to rupees or whatever currency, assuming 1 USD = 83 INR roughly for display, but logic here checks cents)
      // Let's assume priceRange is in INR and we convert cents (USD cents) to INR approx.
      // 100 cents = 1 USD.
      // Let's simplfy: just check against raw value or normalize.
      // Display uses `retail_price_cents` directly as `₹`. So I will treat `retail_price_cents` as `RS`.
      if (s.retail_price_cents > priceRange) return false;

      // Search Filter
      if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      return true;
    });
  }, [selectedBrand, selectedGender, priceRange, searchQuery, sneakers]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] flex flex-col md:flex-row">

      {/* Mobile Filter Toggle */}
      <div className="md:hidden p-4 bg-white dark:bg-[#1e1e1e] sticky top-20 z-30 shadow-md flex justify-between items-center">
        <span className="font-bold dark:text-white">{filteredItems.length} Products</span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          <FaFilter /> Filters
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`fixed md:sticky top-0 md:top-20 bg-white dark:bg-[#1e1e1e] w-3/4 md:w-1/4 h-screen md:h-[calc(100vh-80px)] overflow-y-auto p-6 transition-transform transform z-40 border-r border-gray-100 dark:border-gray-800
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 bottom-0 shadow-2xl md:shadow-none`}
      >
        <div className="flex justify-between items-center md:hidden mb-6">
          <h2 className="text-xl font-bold dark:text-white">Filters</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-2xl">&times;</button>
        </div>

        <div className="space-y-8">
          {/* Search */}
          <div>
            <h3 className="font-bold mb-4 dark:text-white uppercase tracking-wider text-sm">Search</h3>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
              />
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h3 className="font-bold mb-4 dark:text-white uppercase tracking-wider text-sm">Brand</h3>
            <div className="flex flex-col gap-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(brand)}
                    className="accent-green-500 w-4 h-4"
                  />
                  <span className={`text-sm group-hover:text-green-500 transition-colors ${selectedBrand === brand ? 'text-green-500 font-bold' : 'text-gray-600 dark:text-gray-400'}`}>
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div>
            <h3 className="font-bold mb-4 dark:text-white uppercase tracking-wider text-sm">Gender</h3>
            <div className="flex flex-wrap gap-2">
              {genders.map(gender => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase border transition-all
                                ${selectedGender === gender
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                      : 'border-gray-300 dark:border-gray-700 text-gray-500 hover:border-black dark:hover:border-white'
                    }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-bold mb-4 dark:text-white uppercase tracking-wider text-sm">
              Max Price: ₹ {priceRange}
            </h3>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-green-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Products Grid */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-[900] text-gray-900 dark:text-white uppercase italic">
              {selectedBrand === "All" ? "All Sneakers" : selectedBrand}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Showing {filteredItems.length} results</p>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((shoe) => (
              <Card key={shoe.id} shoe={shoe} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <h3 className="text-2xl font-bold dark:text-white mb-2">No sneakers found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
            <button
              onClick={() => {
                setSelectedBrand("All");
                setSelectedGender("All");
                setPriceRange(50000);
                setSearchQuery("");
              }}
              className="mt-4 text-green-500 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
