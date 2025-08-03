
import React, { use } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Contexts/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'



const SearchBar = () => {
    const Location = useLocation();
    const { Search, setSearch, ShowSearch, setShowSearch } = useContext(ShopContext);
    const [Visible, setVisible] = useState(false);

    useEffect(() => {
        if (Location.pathname.includes('Collections')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [Location])

    return ShowSearch && Visible ? (
        <div className='border-t border-b bg-gray-50 text-center '>
            <div className='inline-flex justify-center items-center border border-gray-300 rounded-full px-5 py-2 my-5 mx-3 w-3/4'>
                <input type="text" placeholder='Search' value={Search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm ' />
                <img className='w-4' src={assets.search_icon} alt="" />
            </div>
            <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
        </div>
    ) : null;
}

export default SearchBar