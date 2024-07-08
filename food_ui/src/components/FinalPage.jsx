import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FinalPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Your order was placed successfully!</h1>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            onClick={() => navigate('/cart')}
          >
            Cart
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            onClick={() => navigate('/favourites')}
          >
            Favourites
          </button>
        </div>
      </div>
    </div>
  );
}
