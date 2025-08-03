import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../Contexts/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency , addToCart, t, language } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const productTopRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  useEffect(() => {
    const foundProduct = products.find(item => String(item._id) === String(productId));
    if (foundProduct) {
      setProductData(foundProduct);
      setSelectedImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  const scrollToProduct = () => {
    if (productTopRef.current) {
      productTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!productData) {
    return <div className="text-center py-20 text-gray-500">{t('PRODUCT_NOT_FOUND')}</div>;
  }
  const displayName = language === 'ar' && productData.name_ar ? productData.name_ar : productData.name;
  const displayDesc = language === 'ar' && productData.description_ar ? productData.description_ar : productData.description;

  return (
    <motion.div 
      ref={productTopRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col-reverse sm:flex-row gap-4"
        >
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:w-24">
            {productData.image.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 cursor-pointer"
              >
                <img
                  src={img}
                  alt={`${t('PRODUCT_IMAGE')} ${index + 1}`}
                  className={`w-full h-20 object-cover rounded-md border-2 ${selectedImage === img ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(img)}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Main Image */}
          <motion.div 
            key={selectedImage}
            variants={imageVariants}
            className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden"
          >
            <img
              src={selectedImage}
              alt={productData.name}
              className="w-full h-full object-contain transition-all duration-300 hover:scale-105"
            />
          </motion.div>
        </motion.div>

        {/* Product Info */}
        <motion.div variants={itemVariants} className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900"
          >
            {displayName}
          </motion.h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => {
                let starClass = "text-gray-300";
                if (i < Math.floor(productData.rating)) starClass = "text-yellow-400";
                if (i === Math.floor(productData.rating) && productData.rating % 1 >= 0.5) starClass = "text-yellow-400 opacity-70";
                return (
                  <motion.span 
                    key={i}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    className={`${starClass} text-xl`}
                  >
                    ★
                  </motion.span>
                );
              })}
            </div>
            <span className="text-gray-600">{t('RATING')}: {productData.rating} ({productData.review} {t('REVIEWS')})</span>
          </div>

          {/* Price */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-semibold text-gray-900"
          >
            {currency}{productData.price}
          </motion.p>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600"
          >
            {displayDesc}
          </motion.p>

          {/* Size Selection */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <h3 className="font-medium">{t('SELECT_SIZE')}</h3>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((size, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md border ${selectedSize === size ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300 hover:border-blue-300'}`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Add to Cart */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors duration-300"
            onClick={() => addToCart(productData._id, selectedSize)}
          >
            {t('ADD_TO_CART')}
          </motion.button>

          {/* Product Policies */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-2 text-sm text-gray-500 border-t pt-4"
          >
            <p className="flex items-center gap-2">✓ {t('PRODUCT_POLICIES_ORIGINAL')}</p>
            <p className="flex items-center gap-2">✓ {t('PRODUCT_POLICIES_COD')}</p>
            <p className="flex items-center gap-2">✓ {t('PRODUCT_POLICIES_RETURN')}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <motion.div 
        variants={itemVariants}
        className="mt-16 border rounded-lg overflow-hidden"
      >
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 font-medium ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            {t('DESCRIPTION')}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            {t('REVIEWS')} ({productData.review})
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {activeTab === 'description' ? (
              <div className="space-y-4 text-gray-600">
                <p>{t('PRODUCT_DESCRIPTION_1')}</p>
                <p>{t('PRODUCT_DESCRIPTION_2')}</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t('NO_REVIEWS')}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Related Products */}
      <motion.div 
        variants={itemVariants}
        className="mt-20"
      >
        <RelatedProducts 
          category={productData.category} 
          subcategory={productData.subCategory} 
          scrollToProduct={scrollToProduct} 
        />
      </motion.div>
    </motion.div>
  );
};

export default React.memo(Product);