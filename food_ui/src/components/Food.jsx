import React, { useState, useEffect } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegMinusSquare } from "react-icons/fa";
import Navbar from './Navbar.jsx';
import HeadlineCards from './HeadlineCards.jsx';
import Footer from './Footer.jsx';
import axios from 'axios';
import { motion } from 'framer-motion';

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [originalFoods, setOriginalFoods] = useState([]);
  const [addCounts, setAddCounts] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:5000/food/");
      const fetchedFoods = response.data;
      setFoods(fetchedFoods);
      setOriginalFoods(fetchedFoods); // Store original data for filtering
    } catch (error) {
      console.error('Error fetching foods:', error.message);
    }
  };

  const filterType = (category) => {
    const filteredFoods = originalFoods.filter(item => item.category === category);
    setFoods(filteredFoods);
  };

  const filterPrice = (price) => {
    const filteredFoods = originalFoods.filter(item => item.price === price);
    setFoods(filteredFoods);
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

  const resetFilters = () => {
    setFoods(originalFoods);
  };

  // Motion variants
  const itemVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <div>
      <Navbar />
      <Footer />
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
                onClick={() => resetFilters()}
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
              {/* Other category buttons... */}
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
                onClick={() => filterPrice('250')}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
              >
                250
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
              {/* Other price buttons... */}
            </div>
          </div>
        </div>

        {/* Display foods */}
        <motion.div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
          {foods.map((item, index) => (
            <motion.div
              key={index}
              className='border shadow-lg rounded-lg'
              variants={itemVariants}
              initial='initial'
              animate='animate'
              whileHover='hover'
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Food;
