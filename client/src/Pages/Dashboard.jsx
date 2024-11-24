
import TinyBarChart from '@/components/Charts/TinyBarChart'
import TinyLineChart from '@/components/Charts/TinyLineChart'
import Dashdropzone from '@/components/dashdropzone'
import { AppContext } from '@/context/AppContext'
import { ArrowRight, History, ShoppingBag, TrendingDown, TrendingUp, User } from 'lucide-react'
import {  FileText, Brain } from 'lucide-react'

import React, { useContext, useEffect, useState } from 'react'
import DashPrefrences from './DashPrefrences'
import CardWithForm from '@/components/LastExtractionResults'


// const UserDataST = [
//   {
//     icon : <ShoppingBag className=''/>,
//     title : "SmartDoc Credits",
//     merge : `Total : 10`,
//     count : `Counter : 20`,
//     incressment : `+${"15.7"}`,
//     added : `+${"10.4"}`,
//   },
//   {
//     icon : <User />,
//     title : "GenAi Credits",
//     merge : `Total : 10`,
//     count : `Counter : 18`,
//     incressment : `+${"12.7"}`,
//     added : `+${"23.9"}`,
//   },
//   // {
//   //   icon : <History />,
//   //   title : "Remaining Queries",
//   //   merge : `${2} Remaining`,
//   //   count : 63,
//   //   incressment : `-${"10.4"}`,
//   //   added : `+${"1"}`,
//   // }
// ]






export default  function Dashboard() {
  const [CardData,setCardData] = useState(null)
  const { auth } = useContext(AppContext);
  const { token } = auth;

  const URL = "http://localhost:5000/api/v1"
  const Production = "https://dsf-saas.onrender.com/api/v1"

  // const UserDataST = [
  //   {
  //     name: "SmartDoc",
  //     icon: <FileText size={24} />,
  //     merge: "Total Submissions",
  //     count: CardData?.SmartDoc?.totalSubmissions || 0,
  //     incressment: CardData?.SmartDoc ? ((CardData?.SmartDoc?.totalSubmissions / 1000) * 100).toFixed(2) : 0,
  //     remaining: CardData?.SmartDoc?.remainingSubmissions || 0
  //   },
  //   {
  //     name: "GenAI",
  //     icon: <Brain size={24} />,
  //     merge: "Total Submissions",
  //     count: CardData?.GenAI?.totalSubmissions || 0 ,
  //     incressment: CardData?.GenAI ? ((CardData?.GenAI?.totalSubmissions / 1000) * 100).toFixed(2) : 0,
  //     remaining: CardData?.GenAI?.remainingSubmissions || 0
  //   }
  // ]

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Production}/activities/dashboard-submissions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      
      const data = await response.json();
      setCardData(data.data)
      console.log(CardData);
      } catch (error) {
        console.error('Error fetching dashboard submission counts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='dashboard p-2 md:px-7'>
        {/* <h1 className='m-0 font-bold text-3xl font-Rubik'>Welcome Back, {auth?.user?.name} 👋</h1> */}

        {/* <div className='flex gap-5 pt-2 flex-wrap md:flex-nowrap'>
          {UserDataST.map((box,index) => (
            <div key={index} className=' rounded-xl bg-gray-950 p-5 text-gray-300 flex flex-col w-full justify-between '>

              <div className='flex justify-between'>
                <div className='flex flex-nowrap gap-4'>
                  <div className='icon bg-gray-700 h-fit p-2 text-gray-300 rounded-xl mt-1 '>
                    {box.icon}
                  </div>
                  <div className='flex flex-col  '>
                    <p className='font-Rubik m-0 font-bold text-xl'>{box.name} Credits</p>
                    <p className='text-sm font-medium text-gray-400'>{box.merge}</p>
                    <p className='mt-2.5 font-semibold text-xl'>{box.count}</p>
                  </div>
                </div>
                <div className='pt-1.5'>
                  <div className={`flex gap-2 items-center ${Number(box.incressment) > 0 ? "text-green-500" : "text-red-500"} `}>
                    {Number(box.incressment) > 0 ? <TrendingUp /> : <TrendingDown />} {box.incressment}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* <div className='flex gap-5 pt-2 flex-wrap md:flex-nowrap'>
              {UserDataST.map((box, index) => (
                <div key={index} className='rounded-xl bg-gray-950 p-5 text-gray-300 flex flex-col w-full justify-between'>
                  <div className='flex justify-between'>
                    <div className='flex flex-nowrap gap-4'>
                      <div className='icon bg-gray-700 h-fit p-2 text-gray-300 rounded-xl mt-1'>
                        {box.icon}
                      </div>
                      <div className='flex flex-col'>
                        <p className='font-Rubik m-0 font-bold text-xl'>{box.name} Credits</p>
                        <p className='text-sm font-medium text-gray-400'>{box.merge}</p>
                        <p className='mt-2.5 font-semibold text-xl'>{box.count}</p>
                      </div>
                    </div>
                    <div className='pt-1.5'>
                      <div className={`flex gap-2 items-center ${Number(box.incressment) > 0 ? "text-green-500" : "text-red-500"}`}>
                        {Number(box.incressment) > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />} {box.incressment}%
                      </div>
                    </div>
                  </div>
                  
                  <div className='flex justify-between mt-4 text-sm'>
                    <span className='text-gray-400'>Remaining:</span>
                    <span className='font-semibold'>{box.remaining}</span>
                  </div>
                </div>
              ))}
            </div> */}


        <div className='flex pt-5 gap-5 flex-wrap lg:flex-nowrap '>

          <div className='lg:basis-[40%] w-full rounded-xl border shadow-lg'>
            <TinyBarChart />
          </div>

        
          <div className=' basis-[100%] lg:basis-[60%] border shadow-lg  rounded-xl'>
            <CardWithForm />
          </div>
        </div>

        {/* <div className='font-Rubik  basis-[100%] md:basis-[60%]  p-4  border shadow-lg bg-gray-100 rounded-xl'>
          <Dashdropzone />
        </div> */}

        <DashPrefrences />
      </div>
    </>
  )
}
