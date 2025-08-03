import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { ShopContext } from '../Contexts/ShopContext'

const Footer = () => {
  const { t, language } = useContext(ShopContext)
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-gray-50 to-white rounded-t-3xl shadow-inner mt-40"
    >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 px-6 md:px-16 py-10 text-sm'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Forever Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
            {t('FOOTER_DESC')}
          </p>
        </div>
        <div>
          <p className='text-xl font-semibold mb-5 text-gray-800'>{t('COMPANY')}</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li className="hover:text-black cursor-pointer transition">{t('HOME')}</li>
            <li className="hover:text-black cursor-pointer transition">{t('ABOUT_US')}</li>
            <li className="hover:text-black cursor-pointer transition">{t('DELIVERY')}</li>
            <li className="hover:text-black cursor-pointer transition">{t('PRIVACY_POLICY')}</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-semibold mb-5 text-gray-800'>{t('GET_IN_TOUCH')}</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li className="hover:text-blue-600 transition cursor-pointer">+201066788307</li>
            <li className="hover:text-blue-600 transition cursor-pointer">contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border-gray-200" />
        <p className='py-5 text-xs text-center text-gray-500'>
          &copy; 2025 forever.com - {t('ALL_RIGHTS')}
        </p>
      </div>
    </motion.footer>
  )
}

export default Footer