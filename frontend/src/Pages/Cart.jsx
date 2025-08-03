import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Contexts/ShopContext';
import Title from '../components/Title';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, CartItems, UbdateQuantity, Navigate, t, language } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isRemoving, setIsRemoving] = useState(null);

  useEffect(() => {
    const tempData = [];
    for (const items in CartItems) {
      for (const item in CartItems[items]) {
        if (CartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: CartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [CartItems]);

  const handleRemoveItem = (id, size) => {
    setIsRemoving(`${id}-${size}`);
    setTimeout(() => UbdateQuantity(id, size, 0), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mb-10">
        <Title text1={t('YOUR')} text2={t('CART')} />
        <p className="text-gray-500 mt-2">
          {cartData.length} {cartData.length === 1 ? t('ITEM') : t('ITEMS')} {t('IN_YOUR_CART')}
        </p>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {cartData.length > 0 ? (
            <>
              {cartData.map((item) => {
                if (isRemoving === `${item._id}-${item.size}`) return null;

                const product = products.find(p => p._id === item._id);
                if (!product) return null;

                return (
                  <motion.div
                    key={`${item._id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="md:col-span-7 flex items-start gap-4">
                      <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                        />
                      </motion.div>
                      <div>
                        <h3 className="font-medium text-lg">{product.name_ar && language === 'ar' ? product.name_ar : product.name}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {t('SIZE')}: {item.size}
                          </span>
                          <span className="text-blue-600 font-medium">
                            {currency}{product.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-3 flex items-center justify-start md:justify-center">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => UbdateQuantity(item._id, item.size, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value > 0) {
                              UbdateQuantity(item._id, item.size, value);
                            }
                          }}
                          className="w-12 text-center border-t-0 border-b-0 outline-none"
                        />
                        <button
                          onClick={() => UbdateQuantity(item._id, item.size, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-end">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveItem(item._id, item.size)}
                        className="p-2 text-gray-400 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <img src={assets.bin_icon} alt={t('REMOVE')} className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Full-width CartTotal with enhanced animations */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    type: "spring",
                    stiffness: 120,
                    damping: 12
                  }
                }}
                className="mt-16 w-full bg-gray-50 p-6 rounded-xl shadow-sm"
              >
                <CartTotal />
                
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.4 }
                  }}
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: "#111",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping:10
                    }}
                    className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium"
                    onClick={() => Navigate('/place-order')}
                  >
                    {t('PROCEED_TO_CHECKOUT')}
                  </motion.button>
                </motion.div>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  type: "spring",
                  stiffness: 100
                }
              }}
              className="text-center py-16"
            >
              <motion.img
                src={assets.empty_cart}
                alt={t('EMPTY_CART')}
                className="w-40 mx-auto mb-6 opacity-70"
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3
                  }
                }}
              />
              <h3 className="text-xl font-medium text-gray-600 mb-2">{t('YOUR_CART_IS_EMPTY')}</h3>
              <p className="text-gray-500">{t('LOOKS_LIKE_NOTHING_ADDED')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Cart;