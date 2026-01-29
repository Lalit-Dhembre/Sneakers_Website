import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-[#1a1a1a] pt-16 pb-8 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-[1000] dark:text-white block mb-4">
                            SNKR.<span className="font-extrabold text-sm text-green-500">hub</span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                            The ultimate destination for sneaker enthusiasts. Discover the latest drops, exclusive collaborations, and premium classics.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialLink icon={<FaFacebookF />} />
                            <SocialLink icon={<FaTwitter />} />
                            <SocialLink icon={<FaInstagram />} />
                            <SocialLink icon={<FaLinkedinIn />} />
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 dark:text-white">Shop</h4>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link to="/explore" className="hover:text-green-500 transition">New Arrivals</Link></li>
                            <li><Link to="/explore" className="hover:text-green-500 transition">Best Sellers</Link></li>
                            <li><Link to="/explore" className="hover:text-green-500 transition">Men's Shoes</Link></li>
                            <li><Link to="/explore" className="hover:text-green-500 transition">Women's Shoes</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 dark:text-white">Support</h4>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="#" className="hover:text-green-500 transition">Help Center</a></li>
                            <li><a href="#" className="hover:text-green-500 transition">Returns & Exchanges</a></li>
                            <li><a href="#" className="hover:text-green-500 transition">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-green-500 transition">Order Tracker</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 dark:text-white">Stay in the loop</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2a2a2a] border-none focus:ring-2 focus:ring-green-500 outline-none dark:text-white text-sm"
                            />
                            <button className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 rounded-lg hover:opacity-90 transition transform active:scale-95">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400 text-center md:text-left">
                        © {new Date().getFullYear()} SNKR.hub. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-gray-400">
                        <a href="#" className="hover:text-gray-600 dark:hover:text-gray-200">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-600 dark:hover:text-gray-200">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ icon }) => (
    <a
        href="#"
        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2a2a2a] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all duration-300"
    >
        {icon}
    </a>
);

export default Footer;
