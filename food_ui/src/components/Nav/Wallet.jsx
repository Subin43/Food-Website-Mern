import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wallet = () => {
  const userId = '6685595708ec0e322020ddcf'; // User ID
  const [totalBalance, setTotalBalance] = useState(0); // Total accumulated balance
  const [amountToAdd, setAmountToAdd] = useState("");
  const [message, setMessage] = useState('');

  // Fetch the current balance on component mount
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/amount/${userId}`);
        const currentBalance = response.data.amount;
        setTotalBalance(currentBalance); // Set total balance initially
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, [userId]);

  // Function to handle adding money
  const handleAddMoney = async () => {
    const amount = Number(amountToAdd) + Number(totalBalance);
    if (amount <= 0 || isNaN(amount)) {
      setMessage('Please enter a valid amount to add.');
      return;
    }
    if (amount > 100000) {
      setMessage("You can't add more than 100000");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:5000/amount/update/${userId}`, {
        amount: amount.toString(),
      });
  
      if (response.status === 200) {
        setTotalBalance(amount);
        setMessage('Money added successfully!');
        setAmountToAdd(""); // Clear the input field after successful addition
      } else {
        setMessage('Failed to add money.');
      }
    } catch (error) {
      console.error('Error adding money:', error);
      setMessage('Error adding money. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md md:w-4/5 lg:w-3/5">
        <h2 className="text-2xl font-semibold mb-4">Wallet</h2>
        <p className="text-lg mb-4">Current Balance: <span className="font-bold">&#8377;{totalBalance}</span></p>
        <div className="flex flex-col items-center mb-4">
          <input
            type="number"
            value={amountToAdd}
            onChange={(e) => setAmountToAdd(e.target.value)}
            placeholder="Enter amount to add"
            className="w-full p-2 border rounded-md mb-2 md:w-2/3 lg:w-1/2"
          />
          <button
            onClick={handleAddMoney}
            className="bg-orange-500 text-white p-2 rounded-md w-full md:w-2/3 lg:w-1/2 hover:bg-orange-600"
          >
            Add Money
          </button>
        </div>
        {message && <p className="text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default Wallet;
