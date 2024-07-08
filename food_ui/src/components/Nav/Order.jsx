import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Order() {
  // const [orders, setOrders] = useState([]);
  const location = useLocation();
  const cartItems = location.state?.cartItems || []; 
  console.log(cartItems)

  return (
    <div className='p-4 m-5 items-center'>
      <h2 className='text-2xl font-semibold mb-4'>Orders</h2>
      {cartItems.length === 0 ? (
        <p className='text-center'>You have no orders placed yet.</p>
      ) : (
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className='border shadow-lg rounded-lg hover:scale-105 duration-300 relative'
            >
              <div className='relative'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-[200px] object-cover rounded-t-lg'
                />
                <span className='absolute top-2 right-2 cursor-pointer'>❤️</span>
              </div>
              <div className='flex justify-between px-2 py-4'>
                <p className='font-bold'>{item.name}</p>
                <p>
                  <span className='p-1 rounded-full'>{item.restaurant}</span>
                </p>
                <p>
                  <span className='bg-orange-500 text-white p-1 rounded-full'>
                    {item.price}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
