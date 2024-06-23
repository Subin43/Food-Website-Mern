import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from "notistack";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase_config';
import axios from 'axios';

// Define the validation schema using Yup
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password, firstName, lastName, phoneNumber } = data;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await axios.post('http://localhost:5000/user/new', {
        firstName,
        lastName,
        email,
        phoneNo: phoneNumber, // Ensure to match the backend field name
        password,
        confirmPassword: password // Not actually necessary for backend but included for completeness
      });
      // enqueueSnackbar('Successfully signed up!', { variant: 'success' });
      navigate("/", { state: { isLoggedin: true } });
    } catch (error) {
      console.error("Error signing up with email and password", error);
      enqueueSnackbar('Error signing up: ' + error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <div className='p-4 m-4 items-center'>
        <FaXmark size={30} onClick={() => navigate(-1)} />
        <h2 className='mt-5 font-medium text-3xl'>Signup</h2>
        <div className="flex gap-3 mt-3">
          <p>or</p>
          <Link to="/login">
            <h2 className='cursor-pointer font-medium text-orange-600'>
              Login
            </h2>
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input {...register('firstName')} className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200" />
          {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input {...register('lastName')} className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200" />
          {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input {...register('email')} className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200" />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input {...register('phoneNumber')} className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200" />
          {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" {...register('password')} className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200" />
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input type="password" {...register('confirmPassword')} className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200" />
          {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>
        
        <button type="submit" className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
