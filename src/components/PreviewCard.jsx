import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const PreviewCard = ({ shoe }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const add = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    // Check if SAME item (ID + Size) exists.
    const shoeInCart = cart.some((item) => item.id === shoe.id && item.selectedSize === selectedSize);

    if (shoeInCart) {
      toast.error("Item with this size already in cart");
    } else {
      // Create a copy of shoe with selected size
      const shoeWithSize = {
        ...shoe,
        selectedSize,
        cartId: Date.now() + Math.random()
      };
      dispatch(addToCart(shoeWithSize));
      toast.success("Added to cart");
    }
  };

  const img = shoe.original_picture_url;
  const price = shoe.retail_price_cents;
  const desc = shoe.story_html;
  const name = shoe.name;
  const brand = shoe.brand_name;
  const gender = shoe.gender[0];

  const sizes = [6, 7, 8, 9, 10, 11, 12]; // Mock sizes

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] py-12 md:py-20 flex justify-center items-center">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* Image Side */}
          <div className="w-full md:w-1/2 bg-gray-100 dark:bg-[#252525] relative p-8 md:p-16 flex items-center justify-center">
            <div className="absolute top-6 left-6 z-10">
              <span className="bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                {gender}'s {brand}
              </span>
            </div>
            <img
              src={img}
              alt={name}
              className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Details Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-[900] text-gray-900 dark:text-white mb-4 leading-tight">
              {name}
            </h1>

            <div className="text-4xl font-bold text-green-500 mb-8">
              ₹ {price}
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Select Size (US)</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-200 border-2
                                    ${selectedSize === size
                        ? 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-500/30'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                {desc ? desc.replace(/<[^>]*>?/gm, "") : "Experience ultimate comfort and style with this premium pair."}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={add}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg active:scale-95 transform duration-150"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:border-gray-400'}`}
              >
                {isWishlisted ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
