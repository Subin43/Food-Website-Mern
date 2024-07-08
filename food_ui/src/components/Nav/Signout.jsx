import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import { useAuth } from '../../Menu/AuthProvider';
import { getAuth, signOut } from "firebase/auth";

export default function Signout() {
  const [clicked, setClicked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleSignout = async () => {
    console.log(`Attempting to sign out user with ID: ${id}`);
    try {
      await axios.delete(`http://localhost:5000/user/delete/${id}`);
      const auth = getAuth();
      await signOut(auth);

      setClicked(true);
      setUser(null);
      navigate("/", { state: { isLoggedin: false } });
    } catch (error) {
      console.log('Error during signout:', error.message);
      alert('Invalid');
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
