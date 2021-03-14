import React from 'react'
import './css/Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'
import FlipMove from "react-flip-move";

function Checkout() {
    const [{basket, user}] = useStateValue();

    const AnimatedCheckOut = React.forwardRef(({ item, index }, ref) => (
        <div ref={ref}>
          <CheckoutProduct
            key={`anim ${index} ${item.id}`}
            title={item.title}
            id={item.id}
            rating={item.rating}
            price={item.price}
            image={item.image}
          />
        </div>
      ));

    return (
        <div className='checkout'>
            <div className='checkout__left'>
            <img className='checkout__ad' src='https://images-fe.ssl-images-amazon.com/images/G/09/JP-hq/2020/img/Camera/XCM_Manual_1289412_1490849_JP_3570575_650x45_ja_JP._CB416163977_.jpg' alt=''/>
            <div>
            <h3>Hello, {user? user.email : 'Guest'}.</h3>
            <h2 className='checkout__title'>{basket.length === 0 ? "Shopping Basket is Empty..." : "Your Shopping Basket:"}</h2>
            <FlipMove
            staggerDelayBy={150}
            enterAnimation="accordionVertical"
            leaveAnimation="accordionVertical"
          >
            {basket?.map((item, i) => (
              <AnimatedCheckOut
                key={`an ${i} ${item.id}`}
                item={item}
                index={i}
              />
            ))}
          </FlipMove>
            </div>
            </div>
            

            <div className='checkout__right'>
            {basket.length === 0 ? "" : <Subtotal /> }
            </div>
        </div>
    )
}

export default Checkout
