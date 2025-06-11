
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DUMMY_CART_ITEMS = [
  {
    id: 'prod-1',
    name: 'Product 1 - KeySmart - Premium Key Holders',
    price: 21.99,
    quantity: 2,
    image: '/path/to/cart-product-placeholder.jpg', 
  },
  {
    id: 'prod-2',
    name: 'Product 2 - Ergonomic Mouse',
    price: 35.00,
    quantity: 1,
    image: '/path/to/cart-product-placeholder.jpg',
  },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(DUMMY_CART_ITEMS);
  const [couponCode, setCouponCode] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const taxRate = 0.05; 
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    console.log('Applying coupon:', couponCode);
  };

  const updateCart = () => {
    console.log('Updating cart...');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-light min-h-screen py-8 sm:py-10 lg:py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="h2 light text-center mb-8">Shopping Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
         
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2  rounded-lg shadow-sm p-4 sm:p-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="border-b ">
                    <th className="p2 text-blue-default py-3 pr-3 font-semibold w-1/2">Product</th>
                    <th className="p2 text-blue-default py-3 px-3 font-semibold hidden sm:table-cell">Price</th>
                    <th className="p2 text-blue-default py-3 px-3 font-semibold">Quantity</th>
                    <th className="p2 text-blue-default py-3 pl-3 font-semibold">Subtotal</th>
                  </tr>
                </thead>
                <motion.tbody variants={containerVariants} initial="hidden" animate="show">
                  {cartItems.map((item) => (
                    <motion.tr variants={itemVariants} key={item.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-4 pr-3 flex items-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0 mr-4">
                          </div>
                        <div>
                          <p className="p2 font-semibold  mb-1">{item.name}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-3 p2  hidden sm:table-cell">${item.price.toFixed(2)}</td>
                      <td className="py-4 px-3">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-28">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200  transition-colors duration-200"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                            className="w-12 text-center border-x border-gray-300 outline-none p2"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200  transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 pl-3 p2  font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2 w-full sm:w-auto"
                />
                <button onClick={applyCoupon} className="b1 px-6 py-3 w-full sm:w-auto">Apply Coupon</button>
              </div>
              <button onClick={updateCart} className="py-3 px-6 rounded-md border border-gray-300  hover:bg-gray-100 transition-colors duration-200 p2">
                Update cart
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1  rounded-lg shadow-sm p-4 sm:p-6 h-fit"
          >
            <h3 className="h3 mb-6">Cart Totals</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b ">
                <span className="p2  font-semibold">Subtotal</span>
                <span className="p2 ">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b ">
                <span className="p2  font-semibold">Tax (5%)</span>
                <span className="p2 ">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="h3 ">Total</span>
                <span className="h3 text-blue-default">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="b1 w-full mt-8 py-3">Proceed to Checkout</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;