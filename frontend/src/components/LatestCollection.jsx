import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const { products, t } = useContext(ShopContext)
  const [LatestProducts, setLatestProducts] = useState([])

 useEffect(() => {
  if (products && products.length > 0) {
    setLatestProducts(products.slice(0, 10))
  }
}, [products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={t('LATEST')} text2={t('COLLECTIONS')} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        {t('LATEST_COLLECTIONS_DESC')}
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          LatestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              name_ar={item.name_ar}
              description={item.description}
              description_ar={item.description_ar}
              price={item.price}
              rating={item.rating}
            />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection