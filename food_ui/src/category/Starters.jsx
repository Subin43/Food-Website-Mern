import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FaRegMinusSquare, FaRegHeart } from "react-icons/fa";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Starters({addToFavorites}) {
  const [starters, setStarters] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchStarters();
  }, []);

  const fetchStarters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/food/");
      const allData = response.data;

      const filteredStarters = allData.filter(item => item.category.toLowerCase() === 'starters');
      setStarters(filteredStarters);
    } catch (error) {
      console.error('Error fetching starters:', error.message);
    }
  };

  const handleFavorite = (item) => {
    addToFavorites(item);
  };


  const handleAdd = (item) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item._id]: (prevCounts[item._id] || 0) + 1,
    }));
    // addToCart(item); // Uncomment this line if you have addToCart function
  };

  const handleRemove = (item) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item._id]: Math.max((prevCounts[item._id] || 0) - 1, 0),
    }));
    // removeFromCart(item); // Uncomment this line if you have removeFromCart function
  };


  const openCart = () => {
    navigate("/cart")
  };

  return (
    <div>
        <Navbar />
      <div className='text-center text-2xl font-bold p-5 m-5'>
        Small bites, big flavors
      </div>
      <div className='max-w-[1640px] m-auto px-4 py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {starters.map((item, index) => (
            <div
              key={item._id}
              className='border shadow-lg rounded-lg hover:scale-105 duration-300 relative'
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={item.img}
                alt={item.name}
                className='w-full h-[200px] object-cover rounded-t-lg'
              />
              <FaRegHeart
              size={24}
              color='red'
              className='absolute top-2 right-2 cursor-pointer'
              onClick={() => handleFavorite(item)}
            />
              <div className='flex flex-col items-center px-2 py-4'>
                <div className='flex justify-between w-full'>
                  <p className='font-bold text-[18px]'>{item.name}</p>
                  <p className='text-[18px]'>
                    <span className='bg-orange-500 text-white p-1 rounded-full'>
                      {item.price}
                    </span>
                  </p>
                </div>
                {hoveredIndex === index && (
                  <div className='flex items-center mt-2'>
                    {itemCounts[item._id] > 0 && (
                      <>
                        <FaRegMinusSquare
                          size={30}
                          color='orange'
                          onClick={() => handleRemove(item)}
                        />
                        <span className='mx-2 text-sm'>{itemCounts[item._id]}</span>
                      </>
                    )}
                    <IoAddCircleOutline
                      size={30}
                      color='orange'
                      onClick={() => handleAdd(item)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button className=" mt-5 bg-orange-500 hover:bg-orange-700 py-2 px-4"onClick={openCart}>View Cart</button>
      </div>
    </div>
  );
}
