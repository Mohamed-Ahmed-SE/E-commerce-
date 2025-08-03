import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const BestSeller = () => {

    const { products, t } = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);


    useEffect(() => {

        const bestProducts = products.filter((product) => product.bestseller);
        setBestSellers(bestProducts.slice(0, 5));
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={t('BEST')} text2={t('SELLERS')} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                {t('BEST_SELLERS_DESC')}
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSellers.map((item, index) => (
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
                ))}
            </div>
        </div>
    )
}

export default BestSeller