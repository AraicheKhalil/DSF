import TitlePage from '@/components/Custom/TitlePage'
import TasksTable from '@/components/Custom/datatable/TasksTable'
import React, { useMemo } from 'react'
TasksTable

export default function Tasks() {

  const data = [
    {
      type : "Docs",
      count : 19
    },
    {
      type : "Invoice",
      count : 48
    },
    {
      type : "Reports",
      count : 7
    },
    {
      type : "Purchase Order",
      count : 21
    },
    {
      type : "Purchase Requisition",
      count : 18
    },
  ]

  return (
    <>
      <div className='Tasks px-4 py-6 md:p-7'>
        <TitlePage title={"All Tasks"}  />
        
        <div className='table-statics flex items-center justify-between bg-gray-100 rounded-xl py-4 px-8 flex-wrap gap-6 shadow-lg'>
        {data.map((item,index) => (
          <div key={index} className='flex flex-col gap-4 font-Rubik font-medium min-w-34 max-md:w-full '>
            <div className='text-gray-500 text-xl'>{item.type}</div>
            <div className='text-blue-500 text-xl'>{item.count}</div>
          </div>
        ))}
      </div>

      <TasksTable />
      </div>
    </>
  )
}
