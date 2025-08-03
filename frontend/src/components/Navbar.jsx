import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShopContext } from "../Contexts/ShopContext";
import { X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { setShowSearch, getCartCount, language, toggleLanguage } = useContext(ShopContext);

  const navLinks = [
    { path: "/",  name: language === 'ar' ? 'الرئيسية': 'Home' },
    { path: "/Collections", name: language === 'ar' ? 'مجموعات': 'collections' },
    { path: "/About", name: language === 'ar' ? 'حول': 'About' },
    { path: "/Contact",name: language === 'ar' ? 'التواصل': 'Contact' }
  ];

  const profileLinks = [
    { path: "/Login", name: language === 'ar' ? 'تسجيل الدخول' : 'Log In' },
    { name: language === 'ar' ? 'ملفي الشخصي' : 'My Profile' },
    { name: language === 'ar' ? 'تاريخ الطلبات' : 'Order History' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md"
    >
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <motion.img
                  src={assets.logo}
                  alt="Logo"
                  className="h-9"
                  whileHover={{
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.6 }
                  }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex h-full">
              <ul className="flex space-x-1 h-full">
                {navLinks.map((link) => (
                  <li key={link.path} className="h-full">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `relative flex items-center h-full px-5 font-medium ${isActive ? "text-black" : "text-gray-500 hover:text-black"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.name}
                          {isActive && (
                            <motion.div
                              layoutId="activeNavLink"
                              className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 to-purple-300"
                              initial={false}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                              }}
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <motion.button
                onClick={() => setShowSearch(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <img src={assets.search_icon} className="w-5" alt="Search" />
              </motion.button>

              {/* Profile */}
              <div className="relative">
                <motion.button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <img src={assets.profile_icon} className="w-5" alt="Profile" />
                </motion.button>

                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100"
                    >
                      <NavLink>


                        {profileLinks.map((link) =>
                          link.path ? (
                            <NavLink
                              to={link.path}
                              key={link.path}
                              onClick={() => setProfileMenuOpen(false)}
                              className="w-full"
                            >
                              <motion.div
                                whileHover={{
                                  backgroundColor: "#643173",
                                  color: "white",
                                  transition: { duration: 0.5 }
                                }}
                                className="w-full text-left px-4 py-3 text-sm text-gray-700 flex items-center gap-3"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></span>
                                {link.name}
                              </motion.div>
                            </NavLink>
                          ) : (
                            <motion.button
                              key={link.name}
                              whileHover={{
                                backgroundColor: "#643173",
                                color: "white",
                                transition: { duration: 0.5 }
                              }}
                              className="w-full text-left px-4 py-3 text-sm text-gray-700 flex items-center gap-3"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></span>
                              {link.name}
                            </motion.button>
                          )
                        )}
                        {/* Language Toggle Button */}
                        <motion.button
                          onClick={() => { toggleLanguage(); setProfileMenuOpen(false); }}
                          whileHover={{ backgroundColor: "#643173", color: "white", transition: { duration: 0.5 } }}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 flex items-center gap-3 border-t"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></span>
                          {language === 'ar' ? 'English' : 'العربية'}
                        </motion.button>
                      </NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <img src={assets.cart_icon} className="w-5" alt="Cart" />
                  {getCartCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {getCartCount()}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={mobileMenuOpen ? assets.cross_icon : assets.menu_icon}
                  className="w-5"
                  alt="Menu"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 w-full bg-white rounded-b-3xl shadow-lg px-6 py-8"
            >
              {/* Close Button */}
              <div className="flex justify-end">
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-800">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mt-6 flex flex-col space-y-4 items-center">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="w-full"
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block text-lg px-6 py-3 text-center rounded-xl transition-all duration-200 font-medium ${isActive
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;