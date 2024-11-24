// // import React from 'react';
// // import {   
// //   Select,
// //   SelectContent,
// //   SelectGroup,
// //   SelectItem,
// //   SelectLabel,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select"

// // const data = [
// //   { name: 'Medical Invoices', count: 212, color: 'bg-yellow-300' },
// //   { name: 'Passport US Card', count: 132, color: 'bg-blue-300' },
// //   { name: 'Bank of America Statement', count: 50, color: 'bg-red-300' },
// //   { name: 'Legal Document', count: 12, color: 'bg-green-300' },
// //   { name: 'Other', count: 177, color: 'bg-gray-500' },
// // ];

// // const maxCount = Math.max(...data.map(item => item.count));

// // const DocumentTypes = () => {
// //   return (
// //     <div className='pt-2 px-4 '>
// //       <div className='flex justify-between items-center pb-6'>
// //         <h3 className='text-xl font-bold font-Rubik '>Collaborator Progress</h3>
// //         <Select>
// //           <SelectTrigger className="w-fit">
// //             <SelectValue placeholder="Last 7 days" />
// //           </SelectTrigger>
// //           <SelectContent className="pr-4">
// //             <SelectGroup>
// //               <SelectLabel>Time</SelectLabel>
// //               <SelectItem value="apple">Last 30 Day</SelectItem>
// //               <SelectItem value="banana">Last 60 Day</SelectItem>
// //               <SelectItem value="blueberry">Last 120 Day</SelectItem>
// //               <SelectItem value="grapes">Last Year</SelectItem>
// //             </SelectGroup>
// //           </SelectContent>
// //         </Select>

// //       </div>
// //       <div>
// //         {data.map((item) => (
// //           <div key={item.name} className="mb-2 w-full">
// //             <div className="relative w-full bg-gray-200 rounded flex px-4 py-2">
// //               <div className='w-full flex justify-between z-20'>
// //                 <div>{item.name}</div>
// //                 <div>{item.count}</div>
// //                 <div style={{ width: `${(item.count / maxCount) * 100}%` }} className={`absolute h-full ${item.color} left-0 top-0 -z-10`}></div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DocumentTypes;


// "use client"

// import React, { useState, useMemo } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// // Base data structure
// const baseData = {
//   SmartDoc: [
//     { name: 'Passport Processor', count: 5, color: 'bg-yellow-300' },
//     { name: 'IDs Processor', count: 14, color: 'bg-blue-300' },
//     { name: 'Legal Processor', count: 77, color: 'bg-red-300' },
//     { name: 'Document Processor', count: 78, color: 'bg-green-300' },
//     { name: 'Receipts Processor', count: 154, color: 'bg-gray-500' },
//   ],
//   GenAI: [
//     { name: 'Text Generator', count: 120, color: 'bg-purple-300' },
//     { name: 'Image Analyzer', count: 85, color: 'bg-pink-300' },
//     { name: 'Code Assistant', count: 62, color: 'bg-indigo-300' },
//     { name: 'Data Summarizer', count: 43, color: 'bg-teal-300' },
//     { name: 'Language Translator', count: 31, color: 'bg-orange-300' },
//   ]
// }

// // Mock data generation function
// const generateMockData = (days, type) => {
//   return baseData[type].map(item => ({
//     ...item,
//     count: Math.floor(item.count * (days / 7) * (Math.random() * 0.5 + 0.75))
//   }))
// }

// const EnhancedBarChart = () => {
//   const [timeRange, setTimeRange] = useState('7')
//   const [documentType, setDocumentType] = useState('all')

//   const data = useMemo(() => {
//     const smartDocData = generateMockData(Number(timeRange), 'SmartDoc')
//     const genAiData = generateMockData(Number(timeRange), 'GenAI')
//     const allData = [...smartDocData, ...genAiData]

//     return {
//       SmartDoc: smartDocData,
//       GenAI: genAiData,
//       all: allData
//     }
//   }, [timeRange])

//   const filteredData = data[documentType]

//   const sortedData = filteredData
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 5)

//   const maxCount = Math.max(...sortedData.map(item => item.count))

//   return (
//     <Card className="w-full  mx-auto">
//       <CardHeader>
//         <CardTitle>Document Types Analysis</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className='flex justify-between items-center pb-6'>
//           <Select value={timeRange} onValueChange={setTimeRange}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select time range" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Time Range</SelectLabel>
//                 <SelectItem value="7">Last 7 days</SelectItem>
//                 <SelectItem value="90">Last 3 months</SelectItem>
//                 <SelectItem value="180">Last 6 months</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>

//           <Select value={documentType} onValueChange={setDocumentType}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select document type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Document Type</SelectLabel>
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="SmartDoc">SmartDoc</SelectItem>
//                 <SelectItem value="GenAI">GenAI</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           {sortedData.map((item) => (
//             <div key={`${item.name}-${documentType}`} className="mb-2 w-full">
//               <div className="relative w-full bg-gray-200 rounded flex px-4 py-2">
//                 <div className='w-full flex justify-between z-20'>
//                   <div>{item.name}</div>
//                   <div>{item.count}</div>
//                 </div>
//                 <div 
//                   style={{ width: `${(item.count / maxCount) * 100}%` }} 
//                   className={`absolute h-full ${item.color} left-0 top-0 -z-10 rounded`}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// export default EnhancedBarChart



"use client"

import React, { useState, useEffect, useContext } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AppContext } from '@/context/AppContext'

const URL = "http://localhost:5000/api/v1"
const Production = "https://dsf-saas.onrender.com/api/v1"

const colorMap = {
  "invoices-proccessor": "bg-yellow-300",
  "id's-proccessor": "bg-blue-300",
  "invoice-proccessor": "bg-red-300",
  "bills-proccessor": "bg-green-300",
  "Translating": "bg-purple-300",
  "Summarizing": "bg-pink-300",
  "Profreading": "bg-indigo-300"
}

const EnhancedBarChart = () => {
  const [timeRange, setTimeRange] = useState('last7Days')
  const [documentType, setDocumentType] = useState('SmartDoc')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState({})

  const { auth } = useContext(AppContext)
  const { token } = auth

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`${Production}/activities/submission-statistics`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const result = await response.json()
        console.log(result)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        setData(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [token])

  const filteredData = data[documentType]?.[timeRange] || []

  const sortedData = filteredData
    .sort((a, b) => b.extractionCount - a.extractionCount)
    .slice(0, 5)

  const maxCount = Math.max(...sortedData.map(item => item.extractionCount), 1)

  return (
    <Card className="w-full max-w-4xl mx-auto border-0">
      <CardHeader>
        <CardTitle>Document Types Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center pb-6 gap-2'>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Range</SelectLabel>
                <SelectItem value="last7Days">Last 7 days</SelectItem>
                <SelectItem value="last30Days">Last 30 days</SelectItem>
                <SelectItem value="last3Months">Last 3 months</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Document Type</SelectLabel>
                <SelectItem value="SmartDoc">SmartDoc</SelectItem>
                <SelectItem value="GenAI">GenAI</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='min-h-[200px]'>
          {isLoading ? (
            Array(5).fill(0).map((_, index) => (
              <Skeleton key={index} className="w-full h-10 mb-2" />
            ))
          )  : sortedData.length > 0 ? (
            sortedData.map((item) => (
              <div key={`${item.toolType}-${documentType}`} className="mb-2 w-full ">
                <div className="relative w-full bg-gray-200 rounded flex px-4 py-2 ">
                  <div className='w-full flex justify-between z-20'>
                    <div>{item.toolType}</div>
                    <div>{item.extractionCount}</div>
                  </div>
                  <div 
                    style={{ width: `${(item.extractionCount / maxCount) * 100}%` }} 
                    className={`absolute h-full ${colorMap[item.toolType] || 'bg-gray-500'} left-0 top-0 -z-10 rounded`}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">No data available for the selected time range and document type.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default EnhancedBarChart