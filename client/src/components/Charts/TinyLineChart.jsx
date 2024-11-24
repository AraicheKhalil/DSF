import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dot } from 'lucide-react';

const data = [
  {
    name: 'Page A',
    processed: 40,
    exported: 21,
    amt: 10,
  },
  {
    name: 'Page B',
    processed: 30,
    exported: 54,
    amt: 20,
  },
  {
    name: 'Page C',
    processed: 90,
    exported: 79,
    amt: 40,
  },
  {
    name: 'Page D',
    processed: 78,
    exported: 32,
    amt: 60,
  },
  {
    name: 'Page E',
    processed: 10,
    exported: 12,
    amt: 80,
  },
  {
    name: 'Page F',
    processed: 65,
    exported: 40,
    amt: 100,
  },

];

const TinyLineChart = () => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-bold font-Rubik pl-4 '>Tasks Performance</h3>
        <div className='flex gap-3 '>
          <Select>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select className="">
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="data selected" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

      </div>

      <div className='w-full flex justify-center gap-14 pt-6 pb-2'>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 bg-[#581c87] rounded-sm'></div>
          <div>{"Extracted"}</div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 bg-[#15803d] rounded-sm'></div>
          <div>{"Processed"}</div>
        </div>
      </div>

      <ResponsiveContainer width={"100%"} height={200} className={" font-Rubik text-xs  mt-4"}>
        <LineChart margin={0} data={data} className=' -left-6' >
          <CartesianGrid vertical={false} strokeDasharray="" />
          <XAxis  dataKey={"name"}  />
          <YAxis style={{margin : 0}} dataKey={"amt"} />
          <Tooltip />
          <Line type="monotone" dataKey="exported" stroke="#581c87" strokeWidth={3} />
          <Line type="monotone" dataKey="processed" stroke="#15803d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    
    </>
  );
};



export default TinyLineChart;