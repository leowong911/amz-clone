import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import './css/Orders.css'
import { db } from './firebase'
import Order from './Order'
import { useStateValue } from './StateProvider';

function Orders() {

    const [orders, setOrders] = useState([]);
    const [ {basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    useEffect(() =>{
        if(user){
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }else{
            setOrders([])
            history.replace('/')
        }
    }, [user])

    return (
        <div className='orders'>
            <h1>Your Order History</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order}/>
                ))}
            </div>
        </div>
    )
}

export default Orders
