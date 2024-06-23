// src/components/Signout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import { useAuth } from '../../Menu/AuthProvider'; // Import the useAuth hook

export default function Signout() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // Get the user and setUser functions from the context

  const handleSignout = async () => {
    try {
      await axios.delete(`http://localhost:5000/user/delete/${user.id}`);
      console.log(user.id);
      setClicked(true);
      setUser(null); // Clear user data from context
      navigate("/", { state: { isLoggedin: false } });
    } catch (error) {
      console.log('error', error.message);
      alert('invalid')
    }
  };

  return (
    <div className='p-5 mt-5'>
      <AiOutlineClose color='orange' size={30} onClick={() => navigate("/")} />
      <div className='flex flex-col justify-center items-center p-8 mt-8 m-5'>
        <p className='text-4xl text-orange-500 font-semibold'>Signout</p>
        <button className='mt-8 bg-orange-500 hover:bg-orange-700 py-2 px-2' onClick={handleSignout}>Click Here to signout</button>
      </div>
      {clicked && (
        <div>
          <p>Signed out successfully</p>
        </div>
      )}
    </div>
  );
}
