import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Contexts/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collections = () => {
  const { products, Search, ShowSearch, t } = useContext(ShopContext);
  const [ShowFilter, setShowFilter] = useState(false);
  const [FilterProducts, setFilterProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [sortType, setsortType] = useState('relevant');

  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setcategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setsubcategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setsubcategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let ProductsCopy = products.slice();

    if (Search && ShowSearch) {
      ProductsCopy = ProductsCopy.filter(item => item.name.toLowerCase().includes(Search.toLowerCase()));
    }

    if (category.length > 0) {
      ProductsCopy = ProductsCopy.filter(item => category.includes(item.category));
    }

    if (subcategory.length > 0) {
      ProductsCopy = ProductsCopy.filter(item => subcategory.includes(item.subCategory));
    }
    setFilterProducts(ProductsCopy);
  };

  const sortProduct = () => {
    let fpCopy = FilterProducts.slice();

    switch (sortType) {
      case 'Low-High':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'High-Low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, Search, ShowSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Use static values for filtering, translated labels for display
  const categories = [
    { value: 'Men', label: t('MEN') },
    { value: 'Women', label: t('WOMEN') },
    { value: 'Kids', label: t('KIDS') }
  ];
  const types = [
    { value: 'Topwear', label: t('TOPWEAR') },
    { value: 'Bottomwear', label: t('BOTTOMWEAR') },
    { value: 'Winterwear', label: t('WINTERWEAR') }
  ];

  return (
    <div className='flex flex-col sm:flex-row gap-6 px-4 sm:px-8 py-8 bg-gray-50'>
      {/* Filters Section */}
      <div className='sm:min-w-64'>
        <div
          onClick={() => setShowFilter(!ShowFilter)}
          className='flex items-center justify-between p-4 bg-white rounded-lg shadow-sm cursor-pointer sm:hidden'
        >
          <h3 className='text-lg font-medium text-gray-800'>{t('FILTERS')}</h3>
          <img
            className={`w-4 transition-transform ${ShowFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt={t('TOGGLE_FILTERS')}
          />
        </div>

        <div className={`bg-white rounded-lg shadow-sm p-6 mt-3 sm:mt-0 ${ShowFilter ? 'block' : 'hidden'} sm:block`}>
          {/* Categories Filter */}
          <div className='mb-8'>
            <h4 className='text-md font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100'>{t('CATEGORIES')}</h4>
            <div className='space-y-3'>
              {categories.map((cat) => (
                <label key={cat.value} className='flex items-center space-x-3 cursor-pointer'>
                  <input
                    type="checkbox"
                    className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                    onChange={togglecategory}
                    value={cat.value}
                    checked={category.includes(cat.value)}
                  />
                  <span className='text-gray-700 px-3'>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <h4 className='text-md font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100'>{t('TYPE')}</h4>
            <div className='space-y-3'>
              {types.map((type) => (
                <label key={type.value} className='flex items-center space-x-3  cursor-pointer'>
                  <input
                    type="checkbox"
                    className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                    onChange={toggleSubcategory}
                    value={type.value}
                    checked={subcategory.includes(type.value)}
                  />
                  <span className='text-gray-700 px-3'>{type.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8'>
          <Title text1={t('ALL')} text2={t('COLLECTIONS')} />
          <div className='mt-4 sm:mt-0'>
            <select
              onChange={(e) => setsortType(e.target.value)}
              className='block w-full sm:w-48 px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value="relevant">{t('SORT_BY_RELEVANT')}</option>
              <option value="Low-High">{t('SORT_BY_LOW_HIGH')}</option>
              <option value="High-Low">{t('SORT_BY_HIGH_LOW')}</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {FilterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              name_ar={item.name_ar}
              description={item.description}
              description_ar={item.description_ar}
              id={item._id}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          ))}
        </div>

        {FilterProducts.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>{t('NO_PRODUCTS_FOUND')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;