
import Image from 'next/image'
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon
} from "@heroicons/react/outline"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import { selectItems } from '../slices/basketSlice';
import { useSelector } from 'react-redux';

export default function Header() {
  const { data:session } = useSession();
  const router = useRouter();
  const items =useSelector(selectItems)

  const handleSignin = (e) => {
    e.preventDefault()
    signIn()
  }

  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }
  
  
  return (
    <header>
<div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
    <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
        <Image
        onClick={()=>router.push('/')}
        src='https://links.papareact.com/f90'
        width={150}
        height={40}
        objectFit='contain'
        className='cursor-pointer'
        />

    </div>

    <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
       <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' type='text'/> 
        <SearchIcon className='h-12 p-4' />
    </div>

    
    <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
    
   
    <div onClick={!session ? handleSignin : handleSignout }  className='cursor-pointer link'>
    
            <p className='hover:underline'>
    {session ? `Hello, ${session.user.name}` : "sign In"}
              
            </p>
  
        <p className='font-extrabold md:text-sm'>Account & List</p>
      </div>
    
      <div onClick={()=>router.push("/orders")} className='cursor-pointer link'>
        <p>Return</p>
        <p className='font-extrabold md:text-sm'>& Orders</p>
      </div>

      <div 
      onClick={()=> router.push("/checkout")}
      
      className='relative link flex items-center cursor-pointer link'>
    <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
      {items.length}
      </span>

    <ShoppingCartIcon className="h-10" />
    <p className=' hiddeen md:inline font-extrabold md:text-sm mt-2'>Basket</p>
      </div>
    </div>
</div>

<div className='flex item-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white texx-sm'>
  <MenuIcon className='h-6 mr-1'/>

  <p className='link flex items-center'> All</p>
  <p className='link '> Prime Video</p>
  <p className='link '> Amazon Business</p>
  <p className='link '> Today's Deal</p>
  <p className='link hidden lg:inline-flex'> Electronics</p>
  <p className='link hidden lg:inline-flex'> Food & Grocery</p>
  <p className='link hidden lg:inline-flex'> Prime</p>
  <p className='link hidden lg:inline-flex'> Buy Apple</p>
  <p className='link hidden lg:inline-flex'> Shopper Toolkit</p>
  <p className='link hidden lg:inline-flex'> Health & Personal</p>
</div>
 </header>
  )
    
}

