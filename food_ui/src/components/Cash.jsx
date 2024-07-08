import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Cash() {
    const navigate = useNavigate();
    const handleWalletPay = () =>{
      navigate("/final")
    }
  return (
    <div >
        <h2 className="text-xl font-semibold mb-2">Cash on Delivery</h2>
        {/* <input
          type="text"
          value={cartAmount}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
        /> */}
        <button
          onClick={handleWalletPay}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-300"
        >
          Proceed
        </button>
      </div>
   
    
);
}

