import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HeadlineCards = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const isDessert = location.state ?.isDessert || false ; 
  // console.log(isDessert)
  return (
    <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
      {/* Card */}
      <div className='rounded-xl relative group'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl transition duration-300 group-hover:bg-black/70'></div>
        <div className='absolute w-full h-full flex flex-col justify-between text-white p-4'>
          <p className='font-bold text-2xl'>Sun's Out, BOGO's Out</p>
          <button
            className='border-white bg-white text-black self-start group-hover:bg-gray-200 transition duration-300'
            onClick={() => navigate("/special-deals")}
          >
            Order Now
          </button>
        </div>
        <img
          className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105'
          src='https://images.unsplash.com/photo-1613769049987-b31b641f25b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGJyZWFrZmFzdHxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60'
          alt='/'
          onClick={()=>navigate("/special-deals")}
        />
      </div>
      {/* Card */}
      <div className='rounded-xl relative group'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl transition duration-300 group-hover:bg-black/70'></div>
        <div className='absolute w-full h-full flex flex-col justify-between text-white p-4'>
          <p className='font-bold text-2xl'>Famous Restaurants</p>
          <p>Added Daily</p>
          <button
            className='border-white bg-white text-black self-start group-hover:bg-gray-200 transition duration-300'
            onClick={() => navigate("/resturant")}
          >
            Order Now
          </button>
        </div>
        <img
          className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105'
          src='https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJicXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60'
          alt='/'
          onClick={() => navigate("/resturant")}
        />
      </div>
      {/* Card */}
      <div className='rounded-xl relative group'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl transition duration-300 group-hover:bg-black/70'></div>
        <div className='absolute w-full h-full flex flex-col justify-between text-white p-4'>
          <p className='font-bold text-2xl'>Check out our Desserts Too</p>
          <p>Tasty Treats</p>
          <button
            className='border-white bg-white text-black self-start group-hover:bg-gray-200 transition duration-300'
            onClick={() => navigate("/dessert")}
          >
            Order Now
          </button>
        </div>
        <img
          className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105'
          src='https://images.unsplash.com/photo-1559715745-e1b33a271c8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRlc3NlcnR8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
          alt='/'
          onClick={() => navigate("/dessert",{state:{isDessert:true}})}
        />
      </div>
    </div>
  );
};

export default HeadlineCards;
