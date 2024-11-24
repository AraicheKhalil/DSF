import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Link } from "react-router-dom"
import {  ChevronRight } from "lucide-react"

const dataExtracted = [
    {
        itemName : "Credit Card",
        type : "Credit Card statement.png",
        status : "Processing",
        passedTime : "12.5s"
    },
    {
        itemName : "Electricity Invoice",
        type : "Electricity Invoice(1).png",
        status : "passed",
        passedTime : "4.5s"
    },
    {
        itemName : "",
        type : "passport-john.png",
        status : "passed",
        passedTime : "9.5s"
    },
    {
        itemName : "Driver License",
        type : "Alex Terner Driver.png",
        status : "Processing",
        passedTime : ""
    },
]

export default function CardWithForm() {
  return (
    <Card className="w-full  border-0 h-fit">
      <CardHeader>
        <CardTitle className="">Last Extraction Results</CardTitle>
      </CardHeader>

      <CardContent className="">
        {dataExtracted.map((item,index) => (
            <div key={index} className="text-sm py-2 border-b ">
                <Link to={"/dashboard/tasks"}>
                    <div className="flex justify-between mb-1.5 font-medium">
                        <div className="">{!item.itemName ? "..." : item.itemName}</div>
                        <div className={`px-2 py-0.5  rounded-lg ${item.status === "Processing" ? "text-blue-500 bg-blue-100" : "text-green-500 bg-green-100"}`}>{item.status}</div>
                    </div>
                    <div className="flex justify-between text-gray-500 text-xs">
                        <div>{item.type}</div>
                        <div>{!item.passedTime ? "..." : item.passedTime}</div>
                    </div>
                </Link>
            </div>
        ))}
      </CardContent>

      <CardFooter className="flex items-center gap-2 text-blue-600 text-sm font-medium ">
        <Link to={"/dashboard/tasks"}>See All results</Link>
        <ChevronRight size={16}/>
      </CardFooter>
    </Card>
  )
}

