import React, { useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../Contexts/ShopContext';
import { Link } from 'react-router-dom';

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 }
};

const buttonVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalContentVariants = {
  hidden: { scale: 0.9, y: 20 },
  visible: { scale: 1, y: 0 },
  exit: { scale: 0.9, y: -20 }
};

// Star rating as a separate component
const StarRating = ({ rating }) => (
  <div className="flex mr-1" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
    {[...Array(5)].map((_, i) => {
      let starClass = "text-gray-300";
      if (i < Math.floor(rating)) starClass = "text-yellow-400";
      if (i === Math.floor(rating) && rating % 1 >= 0.5) starClass = "text-yellow-400 opacity-70";
      return <span key={i} className={starClass}>★</span>;
    })}
  </div>
);

const ProductItem = React.memo(({ id, image, name, name_ar, description, description_ar, price, rating = 0 }) => {
  const { currency, addToCart, scrollToTop, t, language } = useContext(ShopContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const modalRef = useRef(null);

  // Image handling
  const primaryImage = Array.isArray(image) ? image[0] : image || '/images/default.png';
  const secondaryImage = Array.isArray(image) && image.length > 1 ? image[1] : null;

  // Language-aware display
  const displayName = language === 'ar' && name_ar ? name_ar : name;
  const displayDesc = language === 'ar' && description_ar ? description_ar : description;

  // Cart functions
  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image: primaryImage, quantity: 1 , rating});
  };

  // Price display with currency formatting
  let formattedPrice;
  try {
    formattedPrice = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency || 'USD'
    }).format(price);
  } catch {
    formattedPrice = `$${price}`;
  }

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isQuickViewOpen) {
      document.body.style.overflow = 'hidden';
      // Focus modal for accessibility
      if (modalRef.current) modalRef.current.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isQuickViewOpen]);

 

  return (
    <motion.div
      className="relative group"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={scrollToTop}
    >
      {/* Product Card */}
      <Link className="block text-gray-700 cursor-pointer" to={`/product/${id}`} aria-label={`${t('VIEW_DETAILS')} ${displayName}`}
        onClick={scrollToTop}
      >
        {/* Image Container */}
        <motion.div 
          className="relative overflow-hidden aspect-square bg-gray-50 rounded-lg"
          variants={imageVariants}
          initial="rest"
          whileHover="hover"
        >
          {/* Primary Image */}
          <motion.img
            className="absolute inset-0 w-full h-full object-cover"
            src={primaryImage}
            alt={displayName}
            style={{ opacity: isHovered && secondaryImage ? 0 : 1 }}
          />

          {/* Secondary Image */}
          {secondaryImage && (
            <motion.img
              className="absolute inset-0 w-full h-full object-cover"
              src={secondaryImage}
              alt={displayName + ' alternate'}
              style={{ opacity: isHovered ? 1 : 0 }}
            />
          )}

          {/* Quick View Button */}
          <motion.button
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-xs py-1 px-3 rounded-full shadow-md hover:bg-black hover:text-white transition-colors"
            variants={buttonVariants}
            animate={isHovered ? "visible" : "hidden"}
            aria-label={t('QUICK_VIEW')}
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              setIsQuickViewOpen(true);
            }}
          >
            {t('QUICK_VIEW')}
          </motion.button>

          {/* Sale Badge */}
          {price < 110 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {t('SALE')}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <h3 className="font-medium text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2" title={displayName}>
            {displayName}
          </h3>
          
          <div className="flex items-center">
            <StarRating rating={rating} />
            <span className="text-xs text-gray-500">({t('RATING')}: {rating.toFixed(1)})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-900">
              {formattedPrice}
            </p>
            {price > 100 && (
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                {t('FREE_SHIPPING')}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick Add Button */}
      <motion.button
        className="absolute bottom-20 right-2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
        variants={buttonVariants}
        animate={isHovered ? "visible" : "hidden"}
        onClick={handleQuickAdd}
        aria-label={t('ADD_TO_CART')}
        title={t('ADD_TO_CART')}
        tabIndex={0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </motion.button>

      {/* Quick View Modal */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsQuickViewOpen(false)}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            ref={modalRef}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setIsQuickViewOpen(false)}
                aria-label={t('CLOSE')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="space-y-4">
                <img 
                  src={primaryImage} 
                  alt={displayName} 
                  className="w-full h-64 object-contain"
                />
                
                <div>
                  <h3 className="text-xl font-bold">{displayName}</h3>
                  <div className="flex items-center mt-1">
                    <StarRating rating={rating} />
                    <span className="text-sm text-gray-500">({t('RATING')}: {rating.toFixed(1)})</span>
                  </div>
                </div>
                
                <p className="text-2xl font-bold text-indigo-600">
                  {formattedPrice}
                </p>
                
                <div className="flex space-x-4">
                  <button 
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    onClick={handleQuickAdd}
                    aria-label={t('ADD_TO_CART')}
                  >
                    {t('ADD_TO_CART')}
                  </button>
                  <Link 
                    to={`/product/${id}`}
                    className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg text-center hover:bg-indigo-50 transition-colors"
                    onClick={() => setIsQuickViewOpen(false)}
                    aria-label={`${t('VIEW_DETAILS')} ${displayName}`}
                  >
                    {t('VIEW_DETAILS')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default ProductItem;