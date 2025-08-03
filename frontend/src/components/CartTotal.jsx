import React from 'react';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ShopContext } from '../Contexts/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { currency, getCartAmount, Delivery_Fee } = useContext(ShopContext);
    const totalAmount = getCartAmount() === 0 ? 0 : getCartAmount() + Delivery_Fee;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 10
            }
        }
    };

    return (
        <motion.div 
            className="w-full bg-gray-50 p-6 rounded-xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={itemVariants}>
                <Title text1={"ORDER"} text2={"SUMMARY"} />
            </motion.div>

            <motion.div className="mt-6 space-y-4">
                <motion.div 
                    className="flex justify-between items-center py-3 border-b border-gray-200"
                    variants={itemVariants}
                >
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{currency}{getCartAmount()}.00</span>
                </motion.div>

                <motion.div 
                    className="flex justify-between items-center py-3 border-b border-gray-200"
                    variants={itemVariants}
                >
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{currency}{Delivery_Fee}.00</span>
                </motion.div>

                <motion.div 
                    className="flex justify-between items-center pt-4"
                    variants={itemVariants}
                >
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold text-blue-600">
                        {currency}{totalAmount}.00
                    </span>
                </motion.div>
            </motion.div>

           
        </motion.div>
    );
};

export default CartTotal;