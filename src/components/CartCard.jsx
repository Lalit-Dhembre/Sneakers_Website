import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/slices/CartSlice";
import toast from "react-hot-toast";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();

  const remove = (itemIdx) => {
    dispatch(removeFromCart(itemIdx));
    toast.error("Removed item from cart");
  };

  const increase = (id) => {
    dispatch(increaseQty(id));
  };

  const decrease = (id) => {
    if (item.qty === 1) {
      dispatch(removeFromCart(id));
      toast.error("Removed item from cart");
    } else {
      dispatch(decreaseQty(id));
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 bg-white dark:bg-[#1f1b24] shadow-sm rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
      {/* Product Info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="w-24 h-24 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-2 flex items-center justify-center flex-shrink-0">
          <img
            src={item.original_picture_url}
            alt={item.name}
            className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-gray-800 dark:text-white text-base md:text-lg max-w-[200px] truncate" title={item.name}>
            {item.name || "Sneaker"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {item.gender ? item.gender[0] : 'Unisex'} • {item.brand_name}
          </p>
          {item.selectedSize && (
            <span className="text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded w-fit">
              Size: {item.selectedSize}
            </span>
          )}
          <div className="font-bold text-green-600 dark:text-green-400 md:hidden mt-2">
            ₹ {item.retail_price_cents}
          </div>
        </div>
      </div>

      {/* Controls & Price (Desktop) */}
      <div className="flex items-center justify-between w-full md:w-auto md:gap-8 mt-4 md:mt-0">
        {/* Quantity Controls */}
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-1">
          <button
            className="w-8 h-8 rounded-md bg-white dark:bg-[#333] text-gray-600 dark:text-white font-bold shadow-sm hover:bg-gray-100 dark:hover:bg-[#444] transition-colors"
            onClick={() => decrease(item.cartId)}
          >
            -
          </button>
          <span className="text-sm font-bold w-4 text-center dark:text-white">{item.qty}</span>
          <button
            className="w-8 h-8 rounded-md bg-white dark:bg-[#333] text-gray-600 dark:text-white font-bold shadow-sm hover:bg-gray-100 dark:hover:bg-[#444] transition-colors"
            onClick={() => increase(item.cartId)}
          >
            +
          </button>
        </div>

        {/* Price */}
        <div className="hidden md:block font-bold text-lg text-gray-800 dark:text-white w-24 text-right">
          ₹ {item.retail_price_cents * item.qty}
        </div>

        {/* Delete */}
        <button
          onClick={() => remove(item.cartId)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors"
        >
          <AiFillDelete className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
