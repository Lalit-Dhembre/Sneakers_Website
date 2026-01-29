import React, { useState, useEffect } from "react";
import CartCard from "../components/CartCard";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkoutCart } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setSubtotal(
      cart.reduce((acc, curr) => acc + curr.retail_price_cents * curr.qty, 0)
    );
  }, [cart]);

  const shipping = subtotal > 10000 ? 0 : 500; // Free shipping over 10000
  const total = subtotal + (cart.length > 0 ? shipping : 0);

  const checkout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    toast.success("Order Placed Successfully!");
    localStorage.removeItem("localCart");
    dispatch(checkoutCart());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] py-12">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-[900] text-gray-900 dark:text-white mb-8">
          YOUR CART <span className="text-gray-400 text-lg font-normal">({cart.length} Items)</span>
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm">
            <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" className="w-40 h-40 opacity-50 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your bag is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm text-center">Looks like you haven't found your perfect pair yet.</p>
            <Link to="/explore">
              <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all shadow-lg">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              {cart.map((cartItem) => (
                <CartCard key={cartItem.id} item={cartItem} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-[#1e1e1e] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900 dark:text-white">₹ {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {shipping === 0 ? <span className="text-green-500">Free</span> : `₹ ${shipping}`}
                    </span>
                  </div>
                  <div className="border-b border-gray-100 dark:border-gray-700 py-2"></div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>₹ {total}</span>
                  </div>
                </div>

                <button
                  onClick={checkout}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all shadow-lg active:scale-95"
                >
                  Checkout
                </button>

                <p className="text-xs text-center text-gray-400 mt-4">
                  Secure Checkout - 100% Satisfaction Guaranteed
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
