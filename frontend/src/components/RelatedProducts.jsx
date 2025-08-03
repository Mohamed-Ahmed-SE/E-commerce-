import React, { useContext } from 'react';
import { ShopContext } from '../Contexts/ShopContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subcategory, scrollToProduct }) => {
  const { products, t, language } = useContext(ShopContext);
  // Filter logic for related products: match category, subcategory, and language if available
  const related = products.filter(
    (item) =>
      item.category === category &&
      item.subCategory === subcategory &&
      (item.language ? item.language === language : true)
  ).slice(0, 8);

  if (!related.length) return null;

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        {t('RELATED_PRODUCTS')}
      </div>
      <div className="mb-4 text-gray-500 text-center">{t('RELATED_PRODUCTS_DESC')}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-6">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            name_ar={item.name_ar}
            description={item.description}
            description_ar={item.description_ar}
            price={item.price}
            rating={item.rating}
            onClick={scrollToProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;