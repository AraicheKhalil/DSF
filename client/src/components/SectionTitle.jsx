

import React from 'react'

export default function SectionTitle({badge,title,titleSection,description,descriptionHome}) {
  return (
    <div className='flex flex-col justify-center items-center px-4 pt-20'>
        <div className='gradient-border px-4 font-medium'>
            {badge}
        </div>
        <h1 className='text-4xl md:text-[55px] md:leading-[85px]  font-semibold font-Exo-2 text-[#28282B] max-w-[1000px] text-center mb-1 max-md:mt-6'>
            {title}
        </h1>
        <h1 className='text-2xl leading-10 sm:text-[45px] font-bold text-[#28282B] max-w-[900px] text-center mb-3 sm:leading-[50px]'>
            {titleSection}
        </h1>
        <p className='text-[#28282B] max-w-[700px] text-center text-[19px]'>
            {description}
        </p>
        <p className='text-[#28282B] max-w-[800px] text-[30px] text-center pb-12'>
            {descriptionHome}
        </p>
    </div>
  )
} 
