import React from 'react'
import  Header  from '../components/Header'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import Currency from "react-currency-formatter"
import { useSession } from 'next-auth/react'
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js'
const stripePromise = loadStripe(`${process.env.stripe_public_key}`)
import axios from 'axios'


export default function checkout() {
  const total = useSelector(selectTotal);
  const items = useSelector(selectItems);
  const { data:session } = useSession();

const createCheckoutSession = async () =>{
     const stripe = await stripePromise;

     const CheckoutSession = await axios.post('/api/create_checkout-session',{
       items:items,
       email: session.user.email
     });

const result = await stripe.redirectToCheckout({
  sessionId: CheckoutSession.data.id,
})
  if(result.error) alert(result.error.message);
};

  return (
    <div className='bg-gray-100'>
      <Header/>
      <main className='lg:flex max-w-screen-2xl mx-auto'>
        <div className='flex-grow m-5 shadow-sm'>

        <Image  src="https://links.papareact.com/ikj" 
        width={1020} height={250} objectFit='contain' alt='logo'/>


          <div className='flex flex-col p-5 space-y-10 bg-white'>
    <h1 
    className='text-3xl border-b pb-4'>{items.length === 0 ? "YOUR BASKET IS EMPTY." 
    : "SHOPPING BASKET"}</h1>

    {items.map((item, i)=>(
      <CheckoutProduct
         key={i}
         id={item.id}
         title={item.title}
         rating={item.ratting}
         price={item.price}
         description={item.description}
         category={item.category}
         image={item.image}
         hasPrime={item.hasPrime}/>
    ))}
          </div>
        </div>






<div className='flex flex-col bg-white p-10 shadow-md'>
{items.length > 0 && (
  <>
  <h2 className='whitespace-nowrap'>Subtotal ({items.length} items): {" "}
  <span className='font-bold'>
    <Currency quantity={total} currency='USD'/>
    </span>
    </h2>

    <button
    onClick={createCheckoutSession}
    role='link'
    disabled={!session}
    className={`button mt-2 ${
      !session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
    }`}>
       {!session ? "Sign in to checkout" : "proceed to checkout"}
    </button>
  </>
)}
</div>
      </main>

    </div>
  )
}
