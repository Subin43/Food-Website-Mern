import React, { useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegMinusSquare } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { dessertData } from '../data/dessertData';
import { data } from '../data/data';

export default function FoodMenu({ addToCart, openCart }) {
  const [addCounts, setAddCounts] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cart, setCart] = useState([]); // State to manage the cart items
  const location = useLocation();
  const isDessert = location.state?.isDessert || false;

  const handleAdd = (index) => {
    setAddCounts((prevCounts) => ({
      ...prevCounts,
      [index]: (prevCounts[index] || 0) + 1,
    }));

    const items = isDessert ? dessertData : data;
    const selectedItem = items[index];

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

      const items = isDessert ? dessertData : data;
      const selectedItem = items[index];

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

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      {isDessert ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {dessertData.map((item, index) => (
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
      ) : (
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
          {data.map((item, index) => (
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
              <div className='flex flex-col px-2 py-4'>
                <div className='flex justify-between w-full'>
                  <p className='font-bold text-sm'>{item.name}</p>
                  <p className='text-sm'>
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
      )}

      {/* Example of displaying cart items */}
      <button onClick={openCart}>View Cart</button>
    </div>
  );
}
