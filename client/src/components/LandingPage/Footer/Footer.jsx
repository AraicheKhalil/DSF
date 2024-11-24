

import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <div className="mt-20">
        <div className="container px-10 lg:px-32 py-20 bg-[#28282B] text-white">
            <div className='flex items-center gap-2 w-fit '>
                <img className='w-10 lg:w-12' src="./Logo.png" alt="" />
                <span className='font-semibold text-xl lg:text-2xl font-Poppins min-w-[130px] '>Smart Doc</span>
            </div>
            

            <div className="gap-12 flex flex-wrap    md:flex-nowrap mt-16">
                <ul className="w-full md:w-fit flex flex-col gap-2 ">
                    <h3 className="font-bold  text-[18px] mb-2">CONTACT US</h3>
                    <li className='hover:text-gray-600 cursor-pointer'> 200 Columbia Street San Diego, CA 92101
                    </li>
                    <li className='hover:text-gray-600 cursor-pointer'> 
                        contact@dsf-smartdoc.com
                    </li>
                    
                </ul>
                <ul className="w-full md:w-fit flex flex-col gap-2">
                    <h3 className="font-bold  text-[18px] mb-2"> QUICK LINKS</h3>
                    <li className='hover:text-gray-600 cursor-pointer'>
                        <Link to={"/terms-of-service"}>Terms of Service</Link>
                    </li>
                    <li className='hover:text-gray-600 cursor-pointer'> <Link to={"/privacy-policy"} >
                    Privacy Policy
                    </Link> </li>
                    <li className='hover:text-gray-600 cursor-pointer'>
                        <Link to={"/frequently-asked-questions"}>
                            Frequently Asked Questions
                        </Link>
                    </li>

                </ul>
                
               
            </div>
        </div>
        <div className="text-sm sm:text-base h-[60px] justify-center items-center flex border-t border-gray-500 bg-[#28282B] text-white ">
            Copyright @2024 by DSF Analytics. All rights reserved
        </div>
    </div>
  )
}
