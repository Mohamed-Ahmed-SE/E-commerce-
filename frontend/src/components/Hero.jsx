import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import { ShopContext } from '../Contexts/ShopContext'

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  })

  const {Navigate, t, language} = useContext(ShopContext)

  const heroImages = [
    assets.hero_img,
    assets.hero_img_2,
    assets.hero_img_3
  ]

  const headlines = [
    t('LATEST'),
    t('SUMMER_COLLECTION'),
    t('LIMITED_EDITIONS')
  ]

  const descriptions = [
    t('LATEST_COLLECTIONS_DESC'),
    t('SUMMER_COLLECTION_DESC'),
    t('LIMITED_EDITIONS_DESC')
  ]

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <div ref={ref} className="relative overflow-hidden bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="w-full lg:w-1/2 z-10"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gray-800"></div>
              <p className="font-medium text-sm md:text-base tracking-widest text-gray-800">
                {t('OUR_BEST_SELLERS')}
              </p>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-5xl font-serif font-normal leading-tight md:leading-snug mb-6 text-gray-900"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentImage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="block"
                >
                  {headlines[currentImage]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-md">
              {descriptions[currentImage]}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 group">
                <span>{t('SHOP_NOW')}</span>
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300">
                <FiShoppingBag />
                <button onClick={() => Navigate('/Collections')}>{t('VIEW_COLLECTION')}</button>
              </button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-12 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}.jpg`} 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('JOIN_CUSTOMERS')} <span className="font-medium text-gray-900">10,000+</span> {t('HAPPY_CUSTOMERS')}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500 ml-1">(4.9/5)</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={imageVariants}
            className="w-full lg:w-2/3 flex justify-center relative"
          >
            <div className="relative aspect-[3/2] max-w-[1500px] w-full  overflow-hidden rounded-2xl shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={heroImages[currentImage]}
                  alt="Featured Product"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              </AnimatePresence>

              {/* Image navigation dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${currentImage === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
                  />
                ))}
              </div>

              {/* Floating tag */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 -right-2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{t('NEW_COLLECTION')}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero