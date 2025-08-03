import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import { ShopContext } from '../Contexts/ShopContext'

const NewsLetterBox = () => {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useContext(ShopContext)

  const onSubmitHandler = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000) // Hide after 3s
  }

  return (
    <motion.div
      className="flex justify-center items-center py-12 "
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="bg-white rounded-2xl shadow-xl px-8 py-10 w-full max-w-3xl border border-gray-100">
        <motion.p
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t('SUBSCRIBE_NOW')}
        </motion.p>
        <motion.p
          className="text-gray-500 mt-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t('SUBSCRIBE_DESC')}
        </motion.p>
        {submitted ? (
          <motion.div
            className="flex flex-col items-center mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaCheckCircle className="text-green-500 text-3xl mb-2" />
            <span className="text-green-600 font-medium">{t('THANK_YOU')}</span>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={onSubmitHandler}
            className="w-full flex flex-col sm:flex-row items-center gap-3 mx-auto my-6 border border-gray-200 rounded-lg p-2 bg-gray-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <input
              type="email"
              placeholder={t('ENTER_EMAIL')}
              className="w-full flex-1 outline-none bg-transparent px-3 py-3 rounded-md text-gray-700"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-black to-gray-800 text-white text-xs px-8 py-3 rounded-md font-semibold shadow hover:from-gray-800 hover:to-black transition"
              type="submit"
            >
              {t('SUBSCRIBE')}
            </motion.button>
          </motion.form>
        )}
      </div>
    </motion.div>
  )
}

export default NewsLetterBox