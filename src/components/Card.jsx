import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Card = ({ shoe }) => {
  const cart = useSelector((state) => state.cart);
  const img = shoe.original_picture_url;
  const price = shoe.retail_price_cents;
  const desc = shoe.story_html;
  const id = shoe.id;
  const name = shoe.name;

  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if item is already in cart (without checking size, or maybe we allow duplicates now since we use cartId?)
    // The previous logic prevented adding same item ID twice. 
    // Now we want to allow it if we want multiple "rows" or just rely on the UI logic.
    // However, if we want to prevent duplicates for "Card" (Direct add) we can; but for a better UX let's allow adding multiple capable items if logic permits.
    // Given the unique cartId, duplicates are allowed in the store.
    // The previous check was:
    const shoeInCart = cart.some((item) => item.id === shoe.id);

    if (shoeInCart) {
      toast.error("Item already in cart");
    } else {
      const shoeWithId = { ...shoe, cartId: Date.now() + Math.random() };
      dispatch(addToCart(shoeWithId));
      toast.success("Added to cart");
    }
  };

  return (
    <Link to={`/preview/${id}`} className="block group">
      <div className="bg-white dark:bg-[#1f1b24] rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 relative h-[400px] flex flex-col justify-between">

        {/* Image Section */}
        <div className="relative h-[220px] flex items-center justify-center bg-gray-50 dark:bg-[#2a2a2a] rounded-xl overflow-hidden mb-4 group-hover:bg-gray-100 dark:group-hover:bg-[#333] transition-colors">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-110 transition-transform duration-500"
          />
          {/* Quick Add Button */}
          <button
            onClick={add}
            className="absolute bottom-4 right-4 bg-white dark:bg-black text-black dark:text-white p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-green-500 hover:text-white dark:hover:bg-green-500"
            title="Add to Cart"
          >
            <FaShoppingCart />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate text-lg" title={name}>
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 h-10">
            {desc ? desc.replace(/<[^>]*>?/gm, "") : "No description available."}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white">
              ₹ {price}
            </span>
            <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full uppercase tracking-wider">
              In Stock
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
