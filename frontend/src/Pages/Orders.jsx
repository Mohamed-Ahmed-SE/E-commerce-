import React, { useContext } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
import Title from '../components/Title'
import { motion } from 'framer-motion'
import { FiTruck, FiCheckCircle, FiClock, FiChevronRight } from 'react-icons/fi'

const Orders = () => {
  const { products, currency } = useContext(ShopContext)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Status configuration
  const statusConfig = {
    shipped: { text: 'Shipped', color: 'bg-blue-500', icon: <FiTruck className="text-blue-500" /> },
    delivered: { text: 'Delivered', color: 'bg-green-500', icon: <FiCheckCircle className="text-green-500" /> },
    processing: { text: 'Processing', color: 'bg-yellow-500', icon: <FiClock className="text-yellow-500" /> }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='border-t pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'
    >
      <div className='text-2xl mb-10'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='space-y-6'
      >
        {products.slice(1, 4).map((item, index) => {
          // Determine status for demo purposes
          const status = index === 0 ? 'delivered' : index === 1 ? 'shipped' : 'processing'
          const statusInfo = statusConfig[status]
          
          return (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100'
            >
              <div className='p-5 sm:p-6 flex flex-col md:flex-row gap-6'>
                <div className='flex-shrink-0'>
                  <img 
                    src={item.image[0]} 
                    className='w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border border-gray-200'
                    alt={item.name} 
                  />
                </div>
                
                <div className='flex-grow'>
                  <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-800'>{item.name}</h3>
                      <div className='flex items-center gap-3 mt-2 text-gray-600'>
                        <p className='text-lg font-medium text-gray-900'>{currency}{item.price.toFixed(2)}</p>
                        <span className='hidden sm:inline-block'>•</span>
                        <p>Qty: 1</p>
                        <span className='hidden sm:inline-block'>•</span>
                        <p>Size: M</p>
                      </div>
                      <p className='mt-3 text-sm text-gray-500'>
                        Order #: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                      </p>
                    </div>
                    
                    <div className='flex items-center gap-2'>
                      <div className={`min-w-2 h-2 rounded-full ${statusInfo.color}`}></div>
                      <p className='text-sm font-medium'>{statusInfo.text}</p>
                    </div>
                  </div>
                  
                  <div className='mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                      {statusInfo.icon}
                      <div>
                        <p className='text-sm text-gray-500'>Estimated delivery</p>
                        <p className='text-sm font-medium'>
                          {status === 'delivered' ? 'Delivered on Jul 28, 2025' : 
                           status === 'shipped' ? 'Expected by Jul 30, 2025' : 
                           'Processing - will ship soon'}
                        </p>
                      </div>
                    </div>
                    
                    <div className='flex gap-3'>
                      <button className='px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors'>
                        View Details
                      </button>
                      <button className='px-4 py-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-1'>
                        Track Order <FiChevronRight className="mt-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {status === 'delivered' && (
                <div className='bg-gray-50 px-5 sm:px-6 py-3 border-t border-gray-100'>
                  <button className='text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors'>
                    Leave a product review
                  </button>
                </div>
              )}
            </motion.div>
          )
        })}
      </motion.div>
      
      {products.length <= 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-center py-16'
        >
          <div className='mx-auto max-w-md'>
            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <FiTruck className='text-gray-400 text-3xl' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No orders yet</h3>
            <p className='text-gray-500 mb-6'>Your order history will appear here once you make a purchase.</p>
            <button className='px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors'>
              Continue Shopping
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Orders