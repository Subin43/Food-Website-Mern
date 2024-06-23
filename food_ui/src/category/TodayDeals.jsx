// src/category/TodayDeals.js
import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FaRegMinusSquare } from 'react-icons/fa';
import { Deals } from '../data/deals';
import Navbar from '../components/Navbar';

const TodayDeals = ({ addToCart, removeFromCart }) => {
  const [itemCounts, setItemCounts] = useState({});

  const handleAdd = (item) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.id]: (prevCounts[item.id] || 0) + 1,
    }));
    addToCart(item);
  };

  const handleRemove = (item) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.id]: Math.max((prevCounts[item.id] || 0) - 1, 0),
    }));
    removeFromCart(item);
  };

  return (
    <div>
      <Navbar />
      <div className='p-4 m-5 items-center'>
        <div className='flex items-center text-2xl p-5 gap-[450px] ml-[450px]'>
          <h1 className='font-semibold'>
            Check out our <span className='font-bold'>Today Hot Deals</span>
          </h1>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
          {Deals.map((item, index) => (
            <div
              key={index}
              className='border shadow-lg rounded-lg hover:scale-105 duration-300 relative'
            >
              <div className='relative'>
                <img
                  src={item.img}
                  alt={item.name}
                  className='w-full h-[200px] object-cover rounded-t-lg'
                />
                <span className='absolute bottom-0 left-0 bg-orange-500 text-white text-lg font-bold p-1 rounded-tr-lg'>
                  {item.todayDeal}
                </span>
              </div>
              <div className='flex justify-between px-2 py-4'>
                <p className='font-bold'>{item.name}</p>
                <p>
                  <span className='p-1 rounded-full'>{item.hotel}</span>
                </p>
                <div className='flex items-center'>
                  {itemCounts[item.id] > 0 && (
                    <FaRegMinusSquare
                      size={30}
                      color='orange'
                      onClick={() => handleRemove(item)}
                    />
                  )}
                  {itemCounts[item.id] > 0 && (
                    <span className='mx-2'>{itemCounts[item.id]}</span>
                  )}
                  <IoAddCircleOutline
                    size={30}
                    color='orange'
                    onClick={() => handleAdd(item)}
                  />
                </div>
                <p>
                  <span className='bg-orange-500 text-white p-1 rounded-full'>
                    {item.price}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayDeals;
