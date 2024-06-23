import React from 'react'
const Footer = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4'>
        <div className='max-h-[500px] relative'>
        </div>
        <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center'>
            <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>
                The <span className='text-orange-500'>Delicious</span></h1>
            <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>
                <span className='text-orange-500'>Food</span>Delivered</h1>
        </div>
        <img className='w-full max-h-[500px] object-cover' 
       // src="https://i.pinimg.com/originals/24/ac/bb/24acbb7530fb22151d3f3f1581fb947d.png" alt="/" />
       src='https://img.freepik.com/free-photo/close-up-appetizing-ramadan-meal_23-2151182473.jpg?t=st=1718250387~exp=1718253987~hmac=9352aa4e8cad93662cd738cc530fd0f9f2e35efa1790660ae9486a1ae3a55676&w=996' alt='/'/>
    </div>
  )
}

export default Footer