import React, { useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegMinusSquare } from "react-icons/fa";
import { data } from '../data/data.js';
import Navbar from './Navbar.jsx';
import HeadlineCards from './HeadlineCards.jsx';
import Footer from './Footer.jsx';
// import FoodMenu from './FoodMenu.jsx';

const Food = () => {
  const [foods, setFoods] = useState(data);
  const [addCounts, setAddCounts] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Filter Type burgers/pizza/etc
  const filterType = (category) => {
    setFoods(
      data.filter((item) => {
        return item.category === category;
      })
    );
  };

  // Filter by price
  const filterPrice = (price) => {
    setFoods(
      data.filter((item) => {
        return item.price === price;
      })
    );
  };

  const handleAdd = (index) => {
    setAddCounts((prevCounts) => ({
      ...prevCounts,
      [index]: (prevCounts[index] || 0) + 1,
    }));
  };

  const handleSubtract = (index) => {
    setAddCounts((prevCounts) => ({
      ...prevCounts,
      [index]: prevCounts[index] > 0 ? prevCounts[index] - 1 : 0,
    }));
  };

  return (
    <div>
      <Navbar/>
      <Footer/>
      <HeadlineCards />
      <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>
        Top Rated Menu Items
      </h1>

      {/* Filter Row */}
      <div className='flex flex-col lg:flex-row justify-between'>
        {/* Filter Type */}
        <div>
          <p className='font-bold text-gray-700'>Filter Type</p>
          <div className='flex justfiy-between flex-wrap'>
            <button
              onClick={() => setFoods(data)}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              All
            </button>
            <button
              onClick={() => filterType('Starters')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Starters
            </button>
            <button
              onClick={() => filterType('Biriyani')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Biriyani
            </button>
            <button
              onClick={() => filterType('Rice')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Rice
            </button>
            <button
              onClick={() => filterType('Parotta')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Parotta
            </button>
            <button
              onClick={() => filterType('Noodles')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Noodles
            </button>
            <button
              onClick={() => filterType('Dessert')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              Dessert
            </button>
          </div>
        </div>

        {/* Filter Price */}
        <div>
          <p className='font-bold text-gray-700'>Filter Price</p>
          <div className='flex justify-between max-w-[390px] w-full'>
            <button
              onClick={() => filterPrice('350')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              350
            </button>
            <button
              onClick={() => filterPrice('150')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              150
            </button>
            <button
              onClick={() => filterPrice('100')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              100
            </button>
            <button
              onClick={() => filterPrice('60')}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              60
            </button>
          </div>
        </div>
      </div>

      {/* Display foods */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        {foods.map((item, index) => (
          <div
            key={index}
            className='border shadow-lg rounded-lg hover:scale-105 duration-300'
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={item.img}
              alt={item.name}
              className='w-full h-[200px] object-cover rounded-t-lg'
            />
            <div className='flex justify-between px-2 py-4'>
              <p className='font-bold'>{item.name}</p>
              {hoveredIndex === index && (
                <div className='flex items-center'>
                  <FaRegMinusSquare
                    size={30}
                    color='orange'
                    onClick={() => handleSubtract(index)}
                  />
                  <span className='mx-2'>{addCounts[index] || 0}</span>
                  <IoAddCircleOutline
                    size={30}
                    color='orange'
                    onClick={() => handleAdd(index)}
                  />
                </div>
              )}
              <p>
                <span className='bg-orange-500 text-white p-1 rounded-full'>
                  {item.price}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <FoodMenu /> */}
    </div>
    </div>
  );
};

export default Food;
