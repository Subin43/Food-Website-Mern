import React, { useState } from 'react';
import { FaRegThumbsUp } from 'react-icons/fa';

export default function Help() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    alert('Thanks for your contribution!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
          If you like our service, hit the thumbs up 
          <FaRegThumbsUp
            onClick={() => setClicked(!clicked)}
            size={40}
            className={`ml-2 text-3xl cursor-pointer ${clicked ? 'text-orange-500' : 'text-gray-500'}`}
          />
        </h1>
        <h4 className="text-lg font-semibold mb-6">
          Would you like to donate?
        </h4>
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-300"
          onClick={handleClick}
        >
          Donate ₹1
        </button>
      </div>
    </div>
  );
}
