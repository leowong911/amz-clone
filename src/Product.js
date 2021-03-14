import React from 'react'
import './css/Product.css'
import { useStateValue } from './StateProvider';
import GradeIcon from '@material-ui/icons/Grade';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function Product({id, title, image, price, rating}) {

    const [{basket}, dispatch] = useStateValue();
   //console.log('This is the basket =>', basket);
    const addToBasket = () => {
        NotificationManager.success('Added 1 Product to shopping basket.', 'Product Added.');
        //action to add item to data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
            },
        });
        
    }
    
    return (
        <div className='product'>
            <div className='product__info'>
            <NotificationContainer/>
                <p className='product__title'>{title}</p>
                <p className='product__price'>
                    <small>$</small>
                   <strong>{price}</strong>
                </p>
                <div className='product__rating'>
                    {Array(rating)
                    .fill()
                    .map((_, i) => (<GradeIcon />))}
                </div>
            </div>
            <img src={image}/>
            <button onClick={ addToBasket }>Add To Basket</button>
            
        </div>
    );
}

export default Product
