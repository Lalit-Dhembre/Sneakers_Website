import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logo, gif } from "../assets/data";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const location = useLocation();

  const mobile = () => {
    setClick(!click);
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative hover:text-green-500 transition-colors duration-300 font-medium ${isActive ? 'text-green-500' : ''}`}
      >
        {children}
        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : ''}`}></span>
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          {/* Assuming logo/gif are available, keeping them. If not, fallback to text */}
          <div className="text-3xl font-[1000] dark:text-white tracking-tighter">
            SNKR.
            <span className="font-extrabold text-sm text-green-500 group-hover:text-green-400 transition-colors">hub</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-sm text-gray-700 dark:text-gray-200 uppercase tracking-widest">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/explore">Explore</NavLink></li>
        </ul>

        {/* Cart & Mobile Toggle */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative group p-2">
            <FaShoppingCart className="text-xl text-gray-700 dark:text-white group-hover:text-green-500 transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-[10px] w-5 h-5 flex justify-center items-center rounded-full text-white font-bold border-2 border-white dark:border-[#121212]">
                {cart.length}
              </span>
            )}
          </Link>

          <button onClick={mobile} className="md:hidden text-gray-700 dark:text-white hover:text-green-500 transition p-2">
            {click ? <FaTimes className="text-2xl" /> : <GiHamburgerMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#121212] border-b border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out transform origin-top ${click ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
        <ul className="flex flex-col p-6 gap-4 text-center text-gray-700 dark:text-white font-semibold uppercase tracking-widest">
          <li className="hover:text-green-500 transition py-2" onClick={() => setClick(false)}>
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-green-500 transition py-2" onClick={() => setClick(false)}>
            <Link to="/explore">Explore</Link>
          </li>
          <li className="hover:text-green-500 transition py-2" onClick={() => setClick(false)}>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
