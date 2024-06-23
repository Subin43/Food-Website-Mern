// src/components/Login.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase_config'; // Adjust the path as needed
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import { useAuth } from '../Menu/AuthProvider'; // Import the useAuth hook

const schema = yup.object().shape({
  contact: yup
    .string()
    .test(
      'contact',
      'Must be a valid email or phone number',
      (value) =>
        yup.string().email().isValidSync(value) || /^\d{10}$/.test(value)
    )
    .required('Contact is required'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { setUser } = useAuth(); // Get the setUser function from the context

  const onSubmit = async (data) => {
    const { contact, password } = data;
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, contact, password);
      const user = userCredential.user;
      console.log(user);
      // Fetch the user data from the backend
      const response = await axios.post('http://localhost:5000/user/getUser', { contact, password });
      const userData = response.data;

      // Store user data in context
      setUser(userData);

      // Optional: Store user data in state or context
      console.log('User Data:', userData);
      
      // enqueueSnackbar("Logined Successfully!", { variant: 'success' });
      navigate('/', { state: { isLoggedin: true } }); // Redirect to dashboard or another protected route
    } catch (error) {
      console.error("Error signing in with password and email", error);
      enqueueSnackbar('Error signing in: ' + error.message, { variant: 'error' });
    }
  };

  return (
    <div className='p-4 m-4 items-center'>
      <FaXmark size={30} onClick={() => navigate(-1)} />
      <h2 className='mt-5 font-medium text-3xl'>Login</h2>
      <div className="flex gap-3 mt-3">
        <p>or</p>
        <Link to="/signup">
          <h2 className='text-orange-600'>Signup</h2>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <label className="block text-gray-700">Email or Phone Number</label>
          <input
            {...register('contact')}
            className="w-50 p-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200"
          />
          {errors.contact && <p className="mt-2 text-sm text-red-600">{errors.contact.message}</p>}
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Password</label>
          <input
            {...register('password')}
            type="password"
            className="w-50 p-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200"
          />
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <button type="submit" className="p-2 mt-4 m-4 bg-blue-500 text-white rounded-md">Submit</button>
      </form>
    </div>
  );
}
