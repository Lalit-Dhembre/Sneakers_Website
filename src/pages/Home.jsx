import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { data } from "../assets/data";
import Card from "../components/Card";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const sneakers = data.sneakers;

  // Get 4 random featured sneakers
  const featured = sneakers
    .filter((s) => s.retail_price_cents !== null && s.story_html !== null)
    .slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#121212] transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-green-400/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 z-10 flex flex-col-reverse lg:flex-row items-center justify-between h-full pt-20">

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-6 lg:gap-8 mt-10 lg:mt-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-[1000] leading-tight text-gray-900 dark:text-white tracking-tighter">
              STEP INTO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                THE FUTURE.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              Discover the most exclusive sneaker collection. From timeless classics to futuristic drops, find the pair that defines you.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/explore")}
                className="group bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Shop Now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-[300px] md:w-[500px] lg:w-[650px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full animate-pulse"></div>
              <img
                src="./hero-img.png"
                alt="Hero Sneaker"
                className="w-full h-full object-contain drop-shadow-2xl animate-bounce-slow hover:scale-105 transition-transform duration-700 z-10 relative"
                style={{ animationDuration: '3s' }}
              />
            </div>
            {/* Decorative Text Behind */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[100px] md:text-[200px] font-[1000] text-gray-100 dark:text-[#1a1a1a] select-none -z-10 tracking-widest opacity-50">
              AIR
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#181818]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-[900] text-gray-900 dark:text-white mb-2">TRENDING NOW</h2>
              <div className="h-1.5 w-24 bg-green-500 rounded-full"></div>
            </div>
            <Link to="/explore" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-green-500 transition border-b-2 border-transparent hover:border-green-500 pb-1">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((shoe) => (
              <Card key={shoe.id} shoe={shoe} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-20 container mx-auto px-4 md:px-8">
        <div className="bg-black rounded-3xl overflow-hidden relative h-[400px] flex items-center">
          <div className="absolute inset-0 opacity-40">
            <img src="https://images.unsplash.com/photo-1556906781-9a412961d289?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Banner" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 px-8 md:px-20 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-[900] text-white mb-6 uppercase italic">
              Run Different.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Elevate your game with our new performance collection.
              Engineered for speed, designed for style.
            </p>
            <button
              onClick={() => navigate("/explore")}
              className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-green-500 hover:text-white transition-colors"
            >
              Check Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
