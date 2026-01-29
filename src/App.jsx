import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart, Explore, Home, Preview } from "./pages/index";

import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-gray-50 dark:bg-[#121212] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/preview/:id" element={<Preview />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
