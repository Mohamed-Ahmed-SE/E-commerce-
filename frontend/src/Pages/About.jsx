import React, { useContext } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaBolt, FaHeadset } from 'react-icons/fa'
import { ShopContext } from '../Contexts/ShopContext'

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3, duration: 0.8 } }
}

const About = () => {
  const { t } = useContext(ShopContext)
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <div className='text-3xl text-center pt-12 border-t font-bold tracking-wide'>
        <Title text1={t('ABOUT')} text2={t('US')} />
      </div>

      <motion.div
        className='my-12 flex flex-col md:flex-row gap-16 items-center justify-center'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img className='w-full md:max-w-[450px] rounded-xl shadow-lg' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-700'>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {t('ABOUT_DESC1')}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {t('ABOUT_DESC2')}
          </motion.p>
          <b className="text-lg mt-4">{t('OUR_MISSION_TITLE')}</b>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            {t('OUR_MISSION_DESC')}
          </motion.p>
        </div>
      </motion.div>

      <div className='text-2xl py-6 text-center font-semibold'>
        <Title text1={t('WHY')} text2={t('CHOOSE_US')} />
      </div>

      <div className='flex flex-col md:flex-row text-base mb-20 gap-8 items-stretch justify-center px-4'>
        {/* Card 1 */}
        <motion.div
          className='bg-white border rounded-xl shadow-md px-10 md:px-12 py-8 flex flex-col gap-5 items-center hover:shadow-xl transition-shadow duration-300'
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <FaCheckCircle className="text-3xl text-green-500 mb-2" />
          <b>{t('QUALITY_ASSURANCE')}</b>
          <p className='text-gray-600 text-center'>{t('QUALITY_ASSURANCE_DESC')}</p>
        </motion.div>
        {/* Card 2 */}
        <motion.div
          className='bg-white border rounded-xl shadow-md px-10 md:px-12 py-8 flex flex-col gap-5 items-center hover:shadow-xl transition-shadow duration-300'
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <FaBolt className="text-3xl text-yellow-500 mb-2" />
          <b>{t('CONVENIENCE')}</b>
          <p className='text-gray-600 text-center'>{t('CONVENIENCE_DESC')}</p>
        </motion.div>
        {/* Card 3 */}
        <motion.div
          className='bg-white border rounded-xl shadow-md px-10 md:px-12 py-8 flex flex-col gap-5 items-center hover:shadow-xl transition-shadow duration-300'
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <FaHeadset className="text-3xl text-blue-500 mb-2" />
          <b>{t('EXCEPTIONAL_CUSTOMER_SERVICE')}</b>
          <p className='text-gray-600 text-center'>{t('EXCEPTIONAL_CUSTOMER_SERVICE_DESC')}</p>
        </motion.div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About