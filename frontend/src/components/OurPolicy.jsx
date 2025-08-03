import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { ShopContext } from '../Contexts/ShopContext'

const OurPolicy = () => {
  const { t } = useContext(ShopContext)
  const policies = [
    {
      img: assets.exchange_icon,
      title: t('EASY_EXCHANGE_POLICY') || 'Easy Exchange Policy',
      desc: t('EASY_EXCHANGE_POLICY_DESC') || 'We Offer Hassle Free Exchange Policy',
      accent: "text-blue-500"
    },
    {
      img: assets.quality_icon,
      title: t('RETURN_POLICY') || '7 Days Return Policy',
      desc: t('RETURN_POLICY_DESC') || 'We Provide 7 Days free return policy',
      accent: "text-green-500"
    },
    {
      img: assets.support_img,
      title: t('CUSTOMER_SUPPORT') || 'Best Customer Support',
      desc: t('CUSTOMER_SUPPORT_DESC') || 'We provide 24/7 customer support',
      accent: "text-yellow-500"
    }
  ]

  return (
    <div className="flex flex-col sm:flex-row justify-around gap-8 sm:gap-4 text-center py-20 px-4">
      {policies.map((policy, idx) => (
        <motion.div
          key={policy.title}
          className="bg-white rounded-2xl shadow-lg p-8 flex-1 mx-2 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <img className="w-14 m-auto mb-5 drop-shadow-lg" src={policy.img} alt="" />
          <p className={`font-semibold text-base mb-2 ${policy.accent}`}>{policy.title}</p>
          <p className="text-gray-400">{policy.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default OurPolicy