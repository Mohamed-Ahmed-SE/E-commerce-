import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets'
import { ShopContext } from '../Contexts/ShopContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { Navigate, t, language } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = t('FIRST_NAME_REQUIRED');
    if (!formData.lastName.trim()) newErrors.lastName = t('LAST_NAME_REQUIRED');
    if (!formData.email.trim()) {
      newErrors.email = t('EMAIL_REQUIRED');
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t('EMAIL_INVALID');
    }
    if (!formData.street.trim()) newErrors.street = t('STREET_REQUIRED');
    if (!formData.city.trim()) newErrors.city = t('CITY_REQUIRED');
    if (!formData.zipcode.trim()) newErrors.zipcode = t('ZIPCODE_REQUIRED');
    if (!formData.country.trim()) newErrors.country = t('COUNTRY_REQUIRED');
    if (!formData.phone.trim()) newErrors.phone = t('PHONE_REQUIRED');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        Navigate('/Orders');
      }, 1500);
    }
  };

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
        stiffness: 100
      }
    }
  };

  const methodVariants = {
    unselected: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    selected: { 
      scale: 1.02, 
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-8'
    >
      {/* Left Section for Order Summary or Details */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='flex flex-col gap-4 w-full sm:max-w-[480px]'
      >
        <motion.div variants={itemVariants} className='text-xl sm:text-2xl my-3'>
          <Title text1={t('INFORMATION')} text2={t('DELIVERY')} />
        </motion.div>

        <motion.div variants={itemVariants} className='flex gap-3'>
          <div className='w-full'>
            <input 
              type="text" 
              name="firstName"
              placeholder={t('FIRST_NAME')} 
              value={formData.firstName}
              onChange={handleInputChange}
              className={`border rounded py-2 px-4 w-full ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div className='w-full'>
            <input 
              type="text" 
              name="lastName"
              placeholder={t('LAST_NAME')} 
              value={formData.lastName}
              onChange={handleInputChange}
              className={`border rounded py-2 px-4 w-full ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <input 
            type="email" 
            name="email"
            placeholder={t('EMAIL_ADDRESS')} 
            value={formData.email}
            onChange={handleInputChange}
            className={`border rounded py-2 px-4 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </motion.div>

        <motion.div variants={itemVariants}>
          <input 
            type="text" 
            name="street"
            placeholder={t('STREET_ADDRESS')} 
            value={formData.street}
            onChange={handleInputChange}
            className={`border rounded py-2 px-4 w-full ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
        </motion.div>

        <motion.div variants={itemVariants} className='flex gap-3'>
          <div className='w-full'>
            <input 
              type="text" 
              name="city"
              placeholder={t('CITY')} 
              value={formData.city}
              onChange={handleInputChange}
              className={`border rounded py-2 px-4 w-full ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div className='w-full'>
            <input 
              type="text" 
              name="state"
              placeholder={t('STATE')} 
              value={formData.state}
              onChange={handleInputChange}
              className={`border rounded py-2 px-4 w-full ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className='flex gap-3'>
          <div className='w-full'>
            <input 
              type="text" 
              name="zipcode"
              placeholder={t('ZIPCODE')} 
              value={formData.zipcode}
              onChange={handleInputChange}
              className={`border rounded py-2 px-4 w-full ${errors.zipcode ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
          </div>
          <div className='w-full'>
            <input 
              type="text" 
              name="country"
              placeholder={t('COUNTRY')} 
              value={formData.country}
              onChange={handleInputChange}
              className={`border rounded py-2 px-4 w-full ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <input 
            type="tel" 
            name="phone"
            placeholder={t('PHONE')} 
            value={formData.phone}
            onChange={handleInputChange}
            className={`border rounded py-2 px-4 w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </motion.div>
      </motion.div>

      {/* Right Section for Order Summary and Payment */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='mt-8 w-full sm:w-auto'
      >
        <div className='sticky top-28'>
          <div className='min-w-80'>
            <CartTotal />
          </div>

          <div className='mt-8'>
            <Title text1={t('PAYMENT')} text2={t('METHOD')} />
            <motion.div 
              variants={containerVariants}
              className='flex flex-col gap-3 mt-4'
            >
              <motion.div 
                variants={methodVariants}
                animate={method === 'Stripe' ? "selected" : "unselected"}
                onClick={() => setMethod('Stripe')} 
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-colors ${method === 'Stripe' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className={`min-w-4 h-4 border rounded-full flex items-center justify-center ${method === 'Stripe' ? "bg-green-400 border-green-400" : 'border-gray-400'}`}>
                  {method === 'Stripe' && (
                    <motion.svg 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 text-white" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </motion.svg>
                  )}
                </div>
                <img src={assets.stripe_logo} className='h-5 mx-4' alt="Stripe" />
              </motion.div>

              <motion.div 
                variants={methodVariants}
                animate={method === 'Razorpay' ? "selected" : "unselected"}
                onClick={() => setMethod('Razorpay')} 
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-colors ${method === 'Razorpay' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className={`min-w-4 h-4 border rounded-full flex items-center justify-center ${method === 'Razorpay' ? "bg-green-400 border-green-400" : 'border-gray-400'}`}>
                  {method === 'Razorpay' && (
                    <motion.svg 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 text-white" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </motion.svg>
                  )}
                </div>
                <img src={assets.razorpay_logo} className='h-5 mx-4' alt="Razorpay" />
              </motion.div>

              <motion.div 
                variants={methodVariants}
                animate={method === 'cod' ? "selected" : "unselected"}
                onClick={() => setMethod('cod')} 
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-colors ${method === 'cod' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className={`min-w-4 h-4 border rounded-full flex items-center justify-center ${method === 'cod' ? "bg-green-400 border-green-400" : 'border-gray-400'}`}>
                  {method === 'cod' && (
                    <motion.svg 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 text-white" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </motion.svg>
                  )}
                </div>
                <p className='text-gray-600 text-sm font-medium mx-4'>{t('CASH_ON_DELIVERY')}</p>
              </motion.div>
            </motion.div>

            <div className='w-full text-end mt-8'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className='bg-black text-white px-16 py-3 text-sm rounded-md hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]'
              >
                {isSubmitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    {t('PROCESSING_ORDER')}
                  </>
                ) : (
                  t('PLACE_ORDER')
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PlaceOrder