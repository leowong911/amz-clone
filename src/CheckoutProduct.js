import React from 'react'
import './css/CheckoutProduct.css'
import { useStateValue } from './StateProvider'
import GradeIcon from '@material-ui/icons/Grade';


function CheckoutProduct({id, image, title, price, rating, hideButton}) {

    const [{ basket }, dispatch] = useStateValue();
    const removeBasket = () => {
        // remove item from basket.
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }


    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} alt=''/>
            <div className='checkoutProduct__info'>
                
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                <short>$</short>
                <strong>{price}</strong>
                </p>
                <p className='checkoutProduct__rating'>
                {Array(rating)
                .fill()
                .map((_, i) =>(
                <GradeIcon />
                ))}
                </p>
                {!hideButton && (
                <button onClick={removeBasket} >Remove from Backet</button>)}
            </div>
        </div>
    )
}

export default CheckoutProduct
