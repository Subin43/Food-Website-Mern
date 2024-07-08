import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, addToCart, removeFromCart }) => {
  const [showBill, setShowBill] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const Loggedin = location.state?.isLoggedin || false;

  const GST = 8;
  const TAXES = 10;

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) + GST + TAXES;
    return itemsTotal;
  };

  const itemsTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div>
      <div className='p-4 m-5'>
        <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className='flex justify-between p-4 border-b'>
                <div>
                  <h2 className='font-bold'>{item.name}</h2>
                  <p>{item.hotel}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </div>
                <div className='flex items-center'>
                  <button
                    onClick={() => removeFromCart(item)}
                    className='text-red-500'
                  >
                    -
                  </button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className='text-green-500'
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <button
              className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'
              onClick={() => setShowBill(true)}
            >
              View Bill
            </button>
            {showBill && (
              <div className='mt-4 p-4 border rounded'>
                <h2 className='text-xl font-bold mb-4'>Bill</h2>
                <p>Items Total: {itemsTotal}</p>
                <p>GST: {GST}</p>
                <p>Other Taxes: {TAXES}</p>
                <hr className='my-2'/>
                <p className='text-lg font-bold'>Total Amount: {calculateTotal()}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        {Loggedin ? (
          <button
            className='m-9 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'
            onClick={() => navigate("/payment", { state: { itemsTotal } })}
          >
            Buy Now
          </button>
        ) : (
          <div className='p-5 m-9'>
            <p>Please Login first{console.log(Loggedin)}</p>
            <button
              className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
