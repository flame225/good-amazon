import React from 'react'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react'
import moment from 'moment'
import db from '../../firebase'
import Order from '../components/Order'

export default function orders() {
    const {session} = useSession
  return (
    <div>
        <Header/>
        <main className='max-w-screen-lg mx-auto p-10'>
            <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
                Your Orders
            </h1>

            {session ? (
                <h2>{orders.length} Orders</h2>
            ):(
                <h2>Please sign in to see your orders</h2>
            )}
            <div className='mt-5 space-y-4'> 
                {orders?.map(({id,amount,amountShipping,items, timestamp,images}) =>(
                <Order
                key={id}
                id={id}
               amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                image={images}
                />
                ))}
                </div>
        </main>
    </div>
  )
} 


export async function getServerSideProps(context){
    const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

    const session = await getSession(context);

    if(!session){
        return{
            props:{}
        };
    }

    const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

    //stripes order
    const orders = await Promise.all(
        stripeOrders.docs.map(async(order)=>({
            id:order.id,
            amount:order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
           
            timestamp: moment(order.data().timestamp.todate().unix(),),
            items:(
                await stripe.checkout.sessions.listLineItems(order.id,{
                    limit: 100,
                })
            ).data,
        }))
        );
        return{
            props:{
                orders,
            }
        }
}