import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from './axios';
import React, { useState, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './css/Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import { db } from './firebase';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    const handleSubmit = async (event) =>{
        event.preventDefault();
        //block duplicate click
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = paymentConfirmation

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event => {
        //Listen change in Element
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
            <h1>Checkout for <Link to='/checkout'> {basket?.length} items</Link>. </h1>
                <div className='payment__box'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__addr'>
                        <p>{user? user.email : 'Guest'}</p>
                        <p>1/F, ABC Building</p>
                        <p>Causeway Bay, Hong Kong</p>
                    </div>
                </div>
                <div className='payment__box'>
                    <div className='payment__title'>
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct
                        id = {item.id}
                        title = {item.title}
                        image = {item.image}
                        price = {item.price}
                        rating = {item.rating}
                        />
                        )
                    )}
                    </div>
                </div>
                <div className='payment__box'>
                <div className='payment__title'>
                        <h3>Pay Now</h3>
                    </div>
                <div className='stripe__box'>
                    <form onSubmit={handleSubmit}><CardElement onChange={handleChange} />
                    <div className='payment__priceCon'>
                        <CurrencyFormat
                            renderText={(value) => (
                                <h3>Total: {value}</h3>
                            )}
                            decimalScale={2}
                            value={getBasketTotal(basket)}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : 'Buy Now'}</span></button>
                    </div>
                    {error && <div>{error}</div>}
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Payment 
