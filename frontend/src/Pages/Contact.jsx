import React, { useState, useRef, useContext } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import Title from '../components/Title'
import { ShopContext } from '../Contexts/ShopContext'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const headerRef = useRef(null)
  const infoRef = useRef(null)
  const formRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })
  const infoInView = useInView(infoRef, { once: true, margin: '-100px' })
  const formInView = useInView(formRef, { once: true, margin: '-100px' })
  const { t } = useContext(ShopContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center py-12 px-2">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className='text-2xl py-6 text-center font-semibold'>
          <Title text1={t('CONTACT')} text2={t('US')} />
        </div>
        <p className="text-gray-500 max-w-xl mx-auto">
          {t('CONTACT_HEADER_DESC')}
        </p>
      </motion.div>
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10 items-stretch justify-center">
        {/* Enhanced Contact Info Card */}
        <motion.div
          ref={infoRef}
          initial={{ opacity: 0, x: -20 }}
          animate={infoInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex-1 flex flex-col gap-6 items-center justify-center border border-gray-100 min-w-[270px]"
        >
          <div className="w-full flex flex-col items-center mb-2">
            <Title text1={t('GET')} text2={t('IN_TOUCH')} />
            <p className="text-gray-500 text-sm mt-2 mb-4 text-center max-w-xs">
              {t('CONTACT_CARD_DESC')}
            </p>
            <div className="w-10 border-b-2 border-gray-200 mb-4"></div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center gap-4">
              <span className="bg-blue-100 text-blue-600 rounded-full p-3 flex items-center justify-center text-lg shadow-sm">
                <FaMapMarkerAlt />
              </span>
              <span className="text-gray-700 text-sm text-left">{t('CONTACT_ADDRESS')}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-green-100 text-green-600 rounded-full p-3 flex items-center justify-center text-lg shadow-sm">
                <FaPhoneAlt />
              </span>
              <span className="text-gray-700 text-sm text-left">+201066788307</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-yellow-100 text-yellow-600 rounded-full p-3 flex items-center justify-center text-lg shadow-sm">
                <FaEnvelope />
              </span>
              <span className="text-gray-700 text-sm text-left">contact@foreveryou.com</span>
            </div>
          </div>
        </motion.div>
        {/* Contact Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          animate={formInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex-1 flex flex-col gap-5 border border-gray-100 min-w-[270px]"
        >
          <label className="text-gray-700 font-medium">{t('NAME')}</label>
          <input
            type="text"
            required
            className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 transition"
            placeholder={t('YOUR_NAME')}
          />
          <label className="text-gray-700 font-medium">{t('EMAIL')}</label>
          <input
            type="email"
            required
            className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 transition"
            placeholder={t('YOUR_EMAIL')}
          />
          <label className="text-gray-700 font-medium">{t('MESSAGE')}</label>
          <textarea
            required
            rows={4}
            className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 transition resize-none"
            placeholder={t('YOUR_MESSAGE')}
          />
          <motion.button
            type="submit"
            className="mt-2 bg-gradient-to-r from-black to-gray-800 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 shadow hover:from-gray-800 hover:to-black transition"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaPaperPlane /> {t('SEND_MESSAGE')}
          </motion.button>
          {submitted && (
            <motion.div
              className="text-green-600 font-medium flex items-center gap-2 justify-center mt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCheckCircle className="text-green-500" />
              {t('CONTACT_THANK_YOU')}
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  )
}

export default Contact