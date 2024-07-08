import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import Cash from './Cash';

export default function Payment() {
  const userId = '6685595708ec0e322020ddcf';
  const [amount, setAmount] = useState('');
  const location = useLocation();
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  
  let cartAmount = location.state?.itemsTotal + 18 || 0; // Get the passed itemsTotal
  const cartItems = location.state?.cartItems || []; // Get the passed cartItems

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/amount/${userId}`);
        const currentBalance = response.data.amount;
        setAmount(currentBalance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, [userId, cartAmount]);

  const handleWalletPay = () => {
    if (amount < cartAmount) {
      alert(`You don't have enough balance to pay`);
      return; 
    }
    const pay = amount - cartAmount;
    setAmount(pay);

    navigate("/final", { state: { cartItems } });
  };

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Payment</h1>
        <div className="mb-4">
          {!clicked ? (
            <>
              <h2 className="text-xl font-semibold mb-2">Pay Via Wallet</h2>
              <input
                type="text"
                value={cartAmount}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              />
              <button
                onClick={handleWalletPay}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-300"
              >
                Pay
              </button>
              <div className="mt-4">
                <p className="text-grey-600">Current Wallet Balance: <span className="font-semibold">{amount}</span></p>
              </div>
              <div className='mt-4 flex'>
                <p className="text-gray-600">
                  Click here for cash on delivery
                </p>
                <span className='m-2'>
                  <FaArrowRight onClick={handleClick} />
                </span>
              </div>
            </>
          ) : (
            <Cash />
          )}
        </div>
      </div>
    </div>
  );
}
