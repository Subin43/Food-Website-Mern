import React from 'react'
import FoodMenu from '../components/FoodMenu';
import Navbar from '../components/Navbar';
export default function Dessert({addToCart,addToFavorites}) {
  // const [dessert,setDessert] = useState(data)
  return (
    <div>
      <Navbar />
    <div className='p-4 m-5 items-center'>
      <div className='justify-center items-center text-2xl '>
        <h1 className='font-semibold text-center'>Taking sweet mements to the next level</h1>
        
        <FoodMenu addToCart={addToCart} addToFavorites={addToFavorites}/>
    
      </div>
    </div>
    </div>
  )
}
