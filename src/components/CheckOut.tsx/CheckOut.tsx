
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface BillingFormValues {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  apartment?: string;
  townCity: string;
  stateCounty: string;
  postcodeZip: string;
  phone?: string;
  email: string;
  orderNotes?: string;
}

const CheckoutPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('directBankTransfer');
  const [newsletterOptIn, setNewsletterOptIn] = useState<boolean>(false);
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const DUMMY_ORDER_ITEMS: OrderItem[] = [
    { name: 'Hoodie', quantity: 2, price: 59.00 },
    { name: 'Seo Books', quantity: 1, price: 67.00 },
  ];

  const calculateSubtotal = () => {
    return DUMMY_ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 178.00;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!executeRecaptcha) {
      setError('reCAPTCHA not loaded.');
      setIsSubmitting(false);
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha('checkout_form');
      const formData = new FormData(e.currentTarget); // e.currentTarget is now typed as HTMLFormElement
      const values: BillingFormValues = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        companyName: formData.get('companyName') as string | undefined,
        country: formData.get('country') as string,
        streetAddress: formData.get('streetAddress') as string,
        apartment: formData.get('apartment') as string | undefined,
        townCity: formData.get('townCity') as string,
        stateCounty: formData.get('stateCounty') as string,
        postcodeZip: formData.get('postcodeZip') as string,
        phone: formData.get('phone') as string | undefined,
        email: formData.get('email') as string,
        orderNotes: formData.get('orderNotes') as string | undefined,
      };

      if (!termsAgreed) {
        setError('You must agree to the terms and privacy notice.');
        setIsSubmitting(false);
        return;
      }

      const submissionData = {
        ...values,
        paymentMethod,
        newsletterOptIn,
        termsAgreed,
        orderItems: DUMMY_ORDER_ITEMS,
        subtotal,
        shipping,
        total,
        recaptchaToken,
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Checkout failed');
      alert('Order placed successfully!');
      setError('');
    } catch (error: any) {
      console.error('Checkout error:', error);
      setError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-light min-h-screen py-8 sm:py-10 lg:py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="h2 light text-center mb-8">Checkout</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg shadow-sm p-4 sm:p-6"
          >
            <h3 className="h3 mb-6">Billing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 p2 mb-1">
                  First name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 p2 mb-1">
                  Last name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="companyName" className="block text-gray-700 p2 mb-1">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="country" className="block text-gray-700 p2 mb-1">
                  Country *
                </label>
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    className="w-full p-3 border border-gray-300 rounded-md appearance-none outline-none focus:ring-blue-default focus:border-blue-default p2 pr-8"
                    required
                  >
                    <option value="">Select a country...</option>
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="streetAddress" className="block text-gray-700 p2 mb-1">
                  Street address *
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  placeholder="House number and street name"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2 mb-3"
                  required
                />
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  placeholder="Apartment, suite, unit etc. (optional)"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2"
                />
              </div>
              <div>
                <label htmlFor="townCity" className="block text-gray-700 p2 mb-1">
                  Town / City *
                </label>
                <input
                  type="text"
                  id="townCity"
                  name="townCity"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2"
                  required
                />
              </div>
              <div>
                <label htmlFor="stateCounty" className="block text-gray-700 p2 mb-1">
                  State / County *
                </label>
                <input
                  type="text"
                  id="stateCounty"
                  name="stateCounty"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2"
                  required
                />
              </div>
              <div>
                <label htmlFor="postcodeZip" className="block text-gray-700 p2 mb-1">
                  Postcode / ZIP *
                </label>
                <input
                  type="text"
                  id="postcodeZip"
                  name="postcodeZip"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 p2 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-gray-700 p2 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2"
                  required
                />
              </div>
            </div>

            <h3 className="h3 mt-10 mb-6">Additional Information</h3>
            <div className="md:col-span-2">
              <label htmlFor="orderNotes" className="block text-gray-700 p2 mb-1">
                Order notes (optional)
              </label>
              <textarea
                id="orderNotes"
                name="orderNotes"
                rows={5}
                placeholder="Notes about your order, e.g. special notes for delivery."
                className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-blue-default focus:border-blue-default p2"
              ></textarea>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg shadow-sm p-4 sm:p-6 h-fit"
          >
            <h3 className="h3 mb-6">Your Order</h3>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="p2 text-gray-700 font-semibold">Product</span>
                <span className="p2 text-gray-700 font-semibold">Subtotal</span>
              </div>
              {DUMMY_ORDER_ITEMS.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-1">
                  <span className="p2 text-gray-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="p2 text-gray-700">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="p2 text-gray-700 font-semibold">Subtotal</span>
                <span className="p2 text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="p2 text-gray-700 font-semibold">Shipping</span>
                <span className="p2 text-gray-800">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="h3 text-gray-800">Total</span>
                <span className="h3 text-blue-default">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="border border-gray-300 rounded-md p-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="directBankTransfer"
                    checked={paymentMethod === 'directBankTransfer'}
                    onChange={() => setPaymentMethod('directBankTransfer')}
                    className="form-radio h-4 w-4 text-blue-default focus:ring-blue-default mr-3"
                  />
                  <span className="font-semibold text-gray-800">Direct Bank Transfer</span>
                </label>
                {paymentMethod === 'directBankTransfer' && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="p2 text-gray-700 mt-3 pl-7"
                  >
                    Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                  </motion.p>
                )}
              </div>
              <div className="border border-gray-300 rounded-md p-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="checkPayments"
                    checked={paymentMethod === 'checkPayments'}
                    onChange={() => setPaymentMethod('checkPayments')}
                    className="form-radio h-4 w-4 text-blue-default focus:ring-blue-default mr-3"
                  />
                  <span className="font-semibold text-gray-800">Check Payments</span>
                </label>
                {paymentMethod === 'checkPayments' && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="p2 text-gray-700 mt-3 pl-7"
                  >
                    Please send a check to Store Name, Street, City, State/Province, Zip/Postal Code.
                  </motion.p>
                )}
              </div>
              <div className="border border-gray-300 rounded-md p-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentMethod === 'cashOnDelivery'}
                    onChange={() => setPaymentMethod('cashOnDelivery')}
                    className="form-radio h-4 w-4 text-blue-default focus:ring-blue-default mr-3"
                  />
                  <span className="font-semibold text-gray-800">Cash On Delivery</span>
                </label>
                {paymentMethod === 'cashOnDelivery' && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="p2 text-gray-700 mt-3 pl-7"
                  >
                    Pay with cash upon delivery.
                  </motion.p>
                )}
              </div>
              <div className="border border-gray-300 rounded-md p-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="form-radio h-4 w-4 text-blue-default focus:ring-blue-default mr-3"
                  />
                  <span className="font-semibold text-gray-800">PayPal</span>
                  <img src="https://via.placeholder.com/60x20/ffffff/000000?text=Cards" alt="Payment Cards" className="ml-auto" />
                </label>
                {paymentMethod === 'paypal' && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="p2 text-gray-700 mt-3 pl-7"
                  >
                    Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.
                  </motion.p>
                )}
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsletterOptIn}
                  onChange={(e) => setNewsletterOptIn(e.target.checked)}
                  disabled={isSubmitting}
                  className="form-checkbox h-4 w-4 text-blue-default focus:ring-blue-default mr-3"
                />
                <span className="text-xs text-gray-700">
                  I’d like to receive MintSurvey’s weekly newsletter
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  disabled={isSubmitting}
                  className="form-checkbox h-4 w-4 text-blue-default focus:ring-blue-default mr-3"
                />
                <span className="text-xs text-gray-700">
                  I agree to MintSurvey’s{' '}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms
                  </a>{' '}
                  & confirm I’ve read the{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Notice
                  </a>.
                </span>
              </label>
            </div>
            {error && <p className="text-red-600 mt-4">{error}</p>}
            <button
              type="submit"
              className="b1 w-full mt-8 py-3"
              disabled={isSubmitting || !termsAgreed}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </motion.div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutPage;