import React from 'react';
import { motion } from 'framer-motion';
import { useLoading } from '../Contexts/LoadingContext';

const LoadingSpinner = () => {
  const { loading } = useLoading();
  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-70">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: .5, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
};

export default LoadingSpinner;
