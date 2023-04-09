import { StarIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { addToBasket, removeFromBasket, removeItemFromBasket } from "../slices/basketSlice"
import Currency from "react-currency-formatter"



export default function CheckoutProduct({
      
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
}) {

    const dispatch = useDispatch()
    
    const addItemToBasket=()=>{
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime,
        }
        dispatch(addToBasket(product))
    }


    const removeItemFromBasket=() =>{
      dispatch(removeFromBasket({id}))
    }

  return (
    <div className="grid grid-cols-5">
      <Image src={image} 
      height= {200} width={200} objectFit="contain"/>
        

        <div className="col-span-3 mx-5">
            <p>{title}</p>
            <div className="flex">
                  {Array(rating).fill()
                .map((_,i )=>(
<StarIcon key={i} className="h-5 text-yellow-500"/>
                ))}
            </div>

            <p className="text-xs mt-2 my-2 line-clap-3">{description}</p>
            <Currency quantity={price} Currency="USD"/>

            {hasPrime && (
                <div className="flex items-center space-x-2">
                    <img
                    loading="lazy"
                    className="w-2"
                    src="https://links.papareact.com/fdw"
                    alt=""
                    />
                    <p className="text-xs tex-gray-500">FREE Next Day Delivert</p>
                    </div>
            )}
        </div>

        <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}> Add to Basket</button>
        <button className="button" onClick={removeItemFromBasket}>Remove From Basket</button>
        </div>
      
        </div>
  )
}
