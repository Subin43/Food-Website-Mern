import React, { useState, useEffect } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegMinusSquare, FaRegHeart } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FoodMenu({ addToCart, openCart, addToFavorites }) {
  const [addCounts, setAddCounts] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cart, setCart] = useState([]); // State to manage the cart items
  const [desserts, setDesserts] = useState([]); // State to manage the fetched dessert items
  const navigate = useNavigate()

  console.log(cart)
  useEffect(() => {
    fetchDesserts();
  }, []);

  const fetchDesserts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/food/");
      const allData = response.data;

      const filteredDesserts = allData.filter(item => item.category.toLowerCase() === 'dessert');
   //   console.log('Filtered desserts:', filteredDesserts); // Log the filtered desserts
      setDesserts(filteredDesserts);
    } catch (error) {
      console.error('Error fetching desserts:', error.message);
    }
  };

  const handleAdd = (index) => {
    setAddCounts((prevCounts) => ({
      ...prevCounts,
      [index]: (prevCounts[index] || 0) + 1,
    }));

    const selectedItem = desserts[index];

    // Update the cart state
    setCart((prevCart) => {
      const itemInCartIndex = prevCart.findIndex((cartItem) => cartItem.id === selectedItem.id);

      if (itemInCartIndex !== -1) {
        // Item already exists in cart, update quantity
        const updatedCart = [...prevCart];
        updatedCart[itemInCartIndex].quantity += 1;
        return updatedCart;
      } else {
        // Item does not exist in cart, add it with quantity 1
        return [...prevCart, { ...selectedItem, quantity: 1 }];
      }
    });

    // Call addToCart function to update cart in parent component or context
    addToCart(selectedItem);
  };

  const handleSubtract = (index) => {
    if (addCounts[index] > 0) {
      setAddCounts((prevCounts) => ({
        ...prevCounts,
        [index]: prevCounts[index] - 1,
      }));

      const selectedItem = desserts[index];

      // Update the cart state
      setCart((prevCart) => {
        const itemInCartIndex = prevCart.findIndex((cartItem) => cartItem.id === selectedItem.id);

        if (itemInCartIndex !== -1) {
          // Item exists in cart, update quantity
          const updatedCart = [...prevCart];
          if (updatedCart[itemInCartIndex].quantity > 1) {
            updatedCart[itemInCartIndex].quantity -= 1;
          } else {
            updatedCart.splice(itemInCartIndex, 1); // Remove item if quantity is 1
          }
          return updatedCart;
        } else {
          // This case ideally should not occur since subtract button should not be visible for items not in cart
          return prevCart;
        }
      });

      // Call addToCart function to update cart in parent component or context
      addToCart(selectedItem);
    }
  };

  const handleFavorite = (item) => {
    addToFavorites(item);
  };

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {desserts.map((item, index) => (
          <div
            key={index}
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
                  <FaRegMinusSquare
                    size={30}
                    color='orange'
                    onClick={() => handleSubtract(index)}
                  />
                  <span className='mx-2 text-sm'>{addCounts[index] || 0}</span>
                  <IoAddCircleOutline
                    size={30}
                    color='orange'
                    onClick={() => handleAdd(index)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Example of displaying cart items */}
      <button className='mt-4 bg-orange-500 hover:bg-orange-700' onClick={()=>navigate("/cart")}>View Cart</button>
    </div>
  );
}
