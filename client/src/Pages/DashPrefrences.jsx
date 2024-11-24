

import React, { useState, useEffect, useContext } from 'react'
import { FileText, Brain, Wrench, FileUp, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { SkeletonPrefrences } from "@/components/Custom/skeleton"
// import PreferenceForm from "./Prefrences"
import { sectionConfig } from "@/hooks/utils/data"
import RebuildPrefrences from "@/components/RebuildPrefrences"
import { Link } from "react-router-dom"


function Section({ name, description, icon: Icon, items }) {
  const { documentType,setDocumentType } = useContext(AppContext)

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mt-4 ">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-2">
        {items.map((item) => (
          <Link 
            onClick={() => { item.type && setDocumentType(item.type)}}
            to={item.link} 
            key={item._id}
            >
            <Card 
              className="cursor-pointer transition-all bg-muted hover:bg-muted/80 hover:ring-2 hover:ring-primary"
            >
              <CardContent className="p-4 flex items-center space-x-4">
                <Icon className="h-5 w-5 mt-1 text-gray-700" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 capitalize">{item.name}</h3>
                  {/* <p className="text-sm text-gray-600">{item.description}</p> */}
                </div>
                {/* <ExternalLink className="h-4 w-4 text-gray-400" /> */}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}



export default function Component() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {auth} = useContext(AppContext);
  const {token } = auth;

  const URL = "http://localhost:5000/api/v1"
const Production = "https://dsf-saas.onrender.com/api/v1"
  
  const fetchData = async () => {
    setIsLoading(true); // Start loading
    
    try {
      const response = await fetch(`${Production}/preferences`, {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      
      const data = await response.json();
      // console.log(data)
      if (!response.ok) {
        setError(data?.message)
      }
      
      // const data = await response.json();
      await new Promise((res) => setTimeout(res,1000))
      setDashboardData(data?.data);
      
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  
  function NotFound() {
    return (
      <div className=" mx-auto my-6 ">
        <div className="flex flex-col items-center justify-center space-y-6 bg-muted rounded-lg p-8 border border-gray-200 shadow">
          
          <h2 className="text-xl font-semibold text-gray-900">No preferences set up</h2>
          <p className="text-gray-500 text-center max-w-md">
            It looks like you haven't set up any preferences yet. Start creating your workflow to customize your experience.
          </p>
          {/* <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
            Start Create your Workflow
          </Button> */}
          <RebuildPrefrences onPostRequest={fetchData} BtnContent={"Start Create your Workflow"}  />
        </div>
      </div>
    )
  }
  useEffect(() => {
    
    fetchData(); // Call the async function
  }, [token]);

  if (isLoading) {
    return <SkeletonPrefrences /> 
  }

  if (error) {
    return <NotFound  />
  }

  const allSectionsEmpty = Object.keys(sectionConfig).every(key => 
    !dashboardData[key] || dashboardData[key].length === 0
  );

  if (allSectionsEmpty) {
    return <NotFound />
  }

  return (
    <div className="w-full p-4 space-y-8 relative">
       <div className="absolute right-4 top-[52px]">
        {/* <PreferenceForm />
        <Button className="bg-blue-500 hover:bg-blue-700 ">Re-build Workflow</Button> */}
        <RebuildPrefrences onPostRequest={fetchData} BtnContent={"Re-build Workflow"} BtnColor="bg-blue-500" />
      </div>
      {Object.keys(sectionConfig).map((key) => {
        const sectionItems = dashboardData[key];
        if (!sectionItems || sectionItems.length === 0) return null;

        return (
          <Section
            key={key}
            name={sectionConfig[key].name}
            description={sectionConfig[key].description}
            icon={sectionConfig[key].icon}
            items={sectionItems}
          />
        );
      })}
    </div>
  )
}