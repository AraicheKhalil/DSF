import { Button } from "@/components/ui/button"
import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function SkeletonResponse() {
  return (
    <div className="flex flex-col space-y-4 pr-12 pt-4">
        <Skeleton className="h-28 w-full  bg-gray-200" />
        <Skeleton className="h-4 w-full  bg-gray-200" />
        <Skeleton className="h-4 w-[300px] bg-gray-200" />
        <Skeleton className="h-4 w-[200px] bg-gray-200" />
        <Skeleton className="h-4 w-[100px] bg-gray-200" />
    </div>
  )
}


export function SkeletonResponseLD() {
  return (
    <div className="flex flex-col space-y-4">
        <Skeleton className="h-28 w-full  bg-gray-400" />
        <Skeleton className="h-4 w-full  bg-gray-400" />
        <Skeleton className="h-4 w-[300px] bg-gray-400" />
        <Skeleton className="h-4 w-[200px] bg-gray-400" />
        <Skeleton className="h-4 w-[100px] bg-gray-400" />
    </div>
  )
}

export function SkeletonResponseGenAi() {
  return (
    <div className="flex flex-col ">
        <div className='flex flex-col space-y-4'>
          <Skeleton className="h-20 w-full  bg-gray-300" />
          <Skeleton className="h-4 w-full  bg-gray-300" />
          <Skeleton className="h-4 w-full bg-gray-300" />
        </div>
        
        <div  className='flex flex-col space-y-4'>
          <Skeleton className="h-20 w-full  bg-gray-300 mt-8" />
          <Skeleton className="h-4 w-full  bg-gray-300" />
          <Skeleton className="h-4 w-[80%] bg-gray-300" />
          <Skeleton className="h-4 w-[60%] bg-gray-300" />

        </div>
    </div>
  )
}


export function SkeletonPrefrences() {
  return (
    <div className=" mx-auto px-4  py-12 space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Skeleton className="bg-gray-200 h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="bg-gray-200 h-4 w-40" />
            <Skeleton className="bg-gray-200 h-4 w-60" />
          </div>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600" disabled>
          Setup Workflow
        </Button>
      </div>

      {['Smart Doc', 'Gen AI', 'SmartDoc Tools'].map((section, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="bg-gray-200 h-6 w-40" />
          <Skeleton className="bg-gray-200 h-4 w-60" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="shadow rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="bg-gray-200 h-8 w-8 rounded" />
                    <Skeleton className="bg-gray-200 h-4 w-24" />
                  </div>
                  <Skeleton className="bg-gray-200 h-6 w-6 rounded" />
                </div>
                <Skeleton className="bg-gray-200 h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}