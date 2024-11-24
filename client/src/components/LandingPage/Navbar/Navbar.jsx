
import navItem from '@/Assets/Data/navdata';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from 'react-icons/io5';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className='font-medium fixed bg-[#28282B] top-0 left-0 right-0 z-50  '>
      <div className='container mx-auto px-8 lg:px-12 h-[81px] text-[white] flex items-center justify-between border-b border-[#28282B]'>
        {/* Logo */}
        <Link to="/" className='flex items-center gap-2 basis-[20%] cursor-pointer'>
          <img className='w-10 lg:w-12' src='./Logo.png' alt='Logo' />
          <span className='font-semibold text-xl lg:text-2xl font-Poppins min-w-[130px]'>Smart Doc</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div onClick={() => setOpen(val => !val)} className='block lg:hidden cursor-pointer'>
          {open ? (
            <IoClose size={30} /> // Close (X)
          ) : (
            <HiOutlineMenuAlt3 size={30} /> // Menu (☰)
          )}
        </div>

        {/* Navigation Links */}
        <div className={`lg:basis-[65%] lg:flex lg:items-center lg:justify-between w-full lg:w-auto lg:static absolute left-0 top-[81px] lg:top-0 bg-[#28282B] lg:bg-transparent transition-transform transform ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div>
            {/* <ul className='flex flex-col lg:flex-row gap-5 items-center p-8 lg:p-0 lg:py-0'>
              {navItem.map(item => (
                <li key={item.label} className='w-full text-center lg:w-auto'>
                  <Link to={item.link} className='block  hover:text-gray-500 transition-colors'>{item.label}</Link>
                </li>
              ))}
            </ul> */}
          </div>

          {/* Authentication Buttons */}
          <div className='flex  flex-col lg:flex-row gap-1 items-center lg:items-center p-8 lg:p-0'>
          <button className='w-full lg:w-auto text-center py-2 px-4 bg-[white] text-[#28282B] rounded'>
              <Link to='/demo-form'>Contact Us</Link>
            </button>
            {/* <button className='w-full lg:w-auto text-center py-2 px-4 border border-transparent hover:border-white rounded'>
              <Link to='/login'>Login</Link>
            </button> */}
            <button className='w-full lg:w-auto text-center py-2 px-4 bg-[#28282B] text-[#FFFECA] rounded'>
              <Link to='/register'>Sign up</Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}


// import navItem from '@/Assets/Data/navdata'
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// export default function Navbar() {
//   const [open, setOpen] = useState(false)

//   return (
//     <nav className='font-medium relative'>
//       <div className='container px-8 lg:px-12  h-[81px] text-white flex items-center justify-between border-b border-slate-800 shadow-slate-800 shadow-lg '>
//         <div className='c flex items-center gap-2 basis-[20%]'>
//           <img className='w-10 lg:w-12' src="./Logo.png" alt="" />
//           <span className='font-semibold text-xl lg:text-2xl font-Poppins min-w-[130px] '>Smart Doc</span>
//         </div>

//         <div onClick={() => setOpen(val => !val)} className='block lg:hidden'>
//           X
//         </div>


//         <div className={`lg:basis-[65%] lg:flex lg:items-center lg:justify-between w-full ${open ? 'block' : 'hidden'}  `}>
//           <div>
//             <ul className='flex gap-5 items-center transition'>
//               {navItem.map((item) => (
//                 <li key={item.label}>
//                   <Link to={item.link} className='h hover:text-gray-500'>{item.label}</Link>
//                 </li>
//               ))
//               }
//             </ul>
//           </div>

//           <div className='flex gap-4 items-center '>
//             <button>
//               <Link to="/login" >Login</Link>
//             </button>
//             <button>
//               <Link to="/register" >Sign up</Link>
//             </button>
//           </div>
//         </div>

//       </div>
//     </nav>
//   )
// }





