import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4'>
      <div className='max-h-[500px] relative'>
        <div className='absolute w-full h-full bg-black/40 flex flex-col justify-center'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white'
          >
            The <span className='text-orange-500'>Delicious</span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white'
          >
            <span className='text-orange-500'>Food</span> Delivered
          </motion.h1>
        </div>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className='w-full max-h-[500px] object-cover'
          src='https://img.freepik.com/free-photo/close-up-appetizing-ramadan-meal_23-2151182473.jpg?t=st=1718250387~exp=1718253987~hmac=9352aa4e8cad93662cd738cc530fd0f9f2e35efa1790660ae9486a1ae3a55676&w=996'
          alt='/'
        />
      </div>
    </div>
  );
};

export default Footer;
