import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FaRegMinusSquare, FaRegHeart } from "react-icons/fa";
import Navbar from '../components/Navbar';
import axios from 'axios';

const TodayDeals = ({ addToCart, removeFromCart, addToFavorites }) => {
  const [itemCounts, setItemCounts] = useState({});
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/food/");
      const allData = response.data;
  
      // Ensure offer is a number and compare it to 0
      const filteredDesserts = allData
        .filter(item => parseFloat(item.offer) > 0)
        .sort((a, b) => parseFloat(b.offer) - parseFloat(a.offer));
  
      // console.log('Filtered desserts:', filteredDesserts); // Log the filtered desserts
  
      setDeals(filteredDesserts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = (item) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item._id]: (prevCounts[item._id] || 0) + 1,
    }));
    addToCart(item);
  };

  const handleRemove = (item) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item._id]: Math.max((prevCounts[item._id] || 0) - 1, 0),
    }));
    removeFromCart(item);
  };

  const handleFavorite = (item) => {
    addToFavorites(item);
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
          {deals.map((item) => (
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
                <FaRegHeart
                  size={24}
                  color='red'
                  className='absolute top-2 right-2 cursor-pointer'
                  onClick={() => handleFavorite(item)}
                />
                <span className='absolute bottom-0 left-0 bg-orange-500 text-white text-lg font-bold p-1 rounded-tr-lg'>
                  {item.offer}
                </span>
              </div>
              <div className='flex justify-between px-2 py-4'>
                <p className='font-bold'>{item.name}</p>
                <p>
                  <span className='p-1 rounded-full'>{item.restaurant}</span>
                </p>
                <div className='flex items-center'>
                  {itemCounts[item._id] > 0 && (
                    <FaRegMinusSquare
                      size={30}
                      color='orange'
                      onClick={() => handleRemove(item)}
                    />
                  )}
                  {itemCounts[item._id] > 0 && (
                    <span className='mx-2'>{itemCounts[item._id]}</span>
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
