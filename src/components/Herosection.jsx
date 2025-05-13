
"use client"
import React from 'react'
import Ctabtn from '@/components/Ctabtn'

const Herosection = () => {
  return (
    <div className="relative w-full h-screen">
    {/* Background Video */}
    <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        { <source src="/vid.mp4" type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

    {/* Overlay */}
    <div className="relative h-full bg-black/50 flex items-center justify-center">
      {/* Text */}
     <div className="">
     <h2 className="text-white text-7xl font-extrabold super-bold -tracking-wider">Drive Tomorrow’s <br /> Possibilities</h2>
     <p className='text-white text-4xl mt-2'>We help companies redefine the future <br /> through technology</p>
     <Ctabtn text='Get started' textColor='text-white'/>
     </div>
    </div>
  </div>
  )
}

export default Herosection