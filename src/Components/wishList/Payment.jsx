import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);
const Payment = () => {
    const payments = useLoaderData();
    console.log("this is", payments);
    return (
        <div className="flex flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-700 dark:bg-gray-900 dark:text-gray-100 my-5">
            <ul className="flex flex-col pt-4 space-y-2">
                <li className="flex items-start justify-between">
                    <h3>{payments.item_name}
                        <span className="text-sm dark:text-indigo-400">x1</span>
                    </h3>
                    <div className="text-right">
                        <span className="block">${payments.price}</span>
                        <span className="text-sm dark:text-gray-400">${payments.price}</span>
                    </div>
                </li>
            </ul>
            <Elements stripe={stripePromise}>

                <CheckoutForm 
                payment={payments}
                />
            </Elements>
        </div>
    );
};

export default Payment;