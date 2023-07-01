import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CheckoutForm = ({ payment }) => {
    const stripe = useStripe();
    const navigate = useNavigate();
    const elements = useElements();
    const { price, buyer_email, buyer_name, _id } = payment;

    const [error, setError] = useState('');
    const [succeeded, setSucceeded] = useState('');
    const [loading, setLoading] = useState(false);
    const [transition, setTransition] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch("https://second-hand-ecom-serverside.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
                setLoading(false)
            });
    }, [price]);

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setLoading(false)
        } else {
            setError('');
        }

        const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyer_name,
                        email: buyer_email
                    }
                }
            });
        if (confirmError) {
            setError(confirmError.message);
            setLoading(false)
            return;
        }

        if (paymentIntent.status === "succeeded") {
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email: buyer_email,
                orderId: _id
            }
            fetch('https://second-hand-ecom-serverside.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    setLoading(false)
                    navigate('/dashboard');
                    if (data.insertedId) {
                        setSucceeded("Congratulations!! Your Payment was successfully");
                        
                        toast("Payment Success")
                    }
                })

        }
       
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className='my-5 bg-primary text-black px-10 rounded font-bold py-2' disabled={!stripe || !clientSecret || loading}>
                {loading?"Loading...":"Pay"}
            </button>
            <p className='font-bold text-red-700'>{error}</p>
            <p className='text-white font-bold'>{succeeded}</p>
            <p className='text-white font-bold'>Your Transiton ID is : {transition}</p>
            <ToastContainer />
        </form>
    );
};

export default CheckoutForm;