import Footer from '@/components/LandingPage/Footer/Footer';
import Navbar from '@/components/LandingPage/Navbar/Navbar';
import React, { useState } from 'react';

const DemoForm = () => {
  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   companyName: '',
  //   workEmail: '',
  //   phoneNumber: ''
  // });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch('https://nodemailer-1-kvz3.onrender.com/send-magic-link/', {
      method: 'POST',
      body: JSON.stringify({
        fullName: formData.get('fullName'),
        companyName: formData.get('companyName'),
        workEmail: formData.get('workEmail'),
        phoneNumber: formData.get('phoneNumber'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Message sent successfully!');
    } else {
      alert('Failed to send the message. Please try again.');
    }
  };

  return (
    <div className='bg-[#18181b]'>
      <Navbar />
      <div className="container grid grid-cols-1 md:grid-cols-2  justify-between items-center  min-h-screen p-8  pt-32 bg-[#18181b] ">
        {/* Left Section */}
        <div className="bg-zinc-100 rounded-xl h-full shadow-lg p-8 w-full max-w-md mb-8 lg:mb-0 lg:mr-8 shadow-zinc-600 mx-auto">
          <div className='c flex items-center gap-2 mb-5'>
              <img className='w-10 lg:w-12' src="./Logo.png" alt="" />
              <span className='font-semibold text-xl lg:text-2xl font-Poppins min-w-[130px] '>Smart Doc</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Let us show you how Smart Doc can help</h1>
          <ul className="space-y-2 mb-8">
            <li>✔️ AI-powered, cloud-native intelligent document processing with a 99% average data accuracy rate</li>
            <li>✔️ Streamline your validation workflows, increase productivity, and minimize errors</li>
            <li>✔️ No-code, template-free solution with an intuitive UI and ability to scale to your needs</li>
          </ul>
          <div className="mt-4">
            <p className="text-sm mb-2">Trusted by global businesses across all industries</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg bg-zinc-100 rounded-lg shadow-xl shadow-zinc-600 p-8 max-w-[500px]  h-full mx-auto">
          <h3 className='font-bold font-Poppins text-2xl mb-4 text-gray-800'>Try Demo For Free </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name*</label>
              <input 
                type="text" 
                name="fullName" 
                // value={formData.fullName}
                // onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Company Name*</label>
              <input 
                type="text" 
                name="companyName" 
                // value={formData.companyName}
                // onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Work Email*</label>
              <input 
                type="email" 
                name="workEmail" 
                // value={formData.workEmail}
                // onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number*</label>
              <input 
                type="text" 
                name="phoneNumber" 
                // value={formData.phoneNumber}
                // onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
                required 
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                Get a Demo
              </button>
            </div>
          </form>
          <p className="mt-4 text-xs text-gray-500">
            By clicking the button below, you accept that we can email you & process your data according to our Privacy Policy.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DemoForm;
