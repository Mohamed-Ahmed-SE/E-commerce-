import React, { useEffect, useContext } from 'react'
import './index.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collections'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Collections from './Pages/Collections'
import SearchBar from './components/SearchBar'
import { LoadingProvider, useLoading } from './Contexts/LoadingContext'
import LoadingSpinner from './components/LoadingSpinner'
import { ToastContainer, toast } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop';
import { ShopContext } from './Contexts/ShopContext'

const AppContent = () => {
  const location = useLocation()
  const { setLoading } = useLoading()
  const { language, direction } = useContext(ShopContext)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 750) // Simulate page load
    return () => clearTimeout(timer)
  }, [location, setLoading])

  return (
    <>
      <ScrollToTop />
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'
           dir={direction}
           lang={language}
           style={{ direction }}>
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
        <Footer />
      </div>
      <LoadingSpinner />
    </>
  )
}

const App = () => {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  )
}

export default App