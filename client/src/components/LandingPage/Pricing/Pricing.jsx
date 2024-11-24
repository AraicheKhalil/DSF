import React from 'react'
import SectionTitle from '@/components/SectionTitle';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import "./Pricing.css"
import { Check } from 'lucide-react';

const PricingCategories = [
    [
        {
            Plan : "Basic",
            Price : 10,
            features : ["100 total OCR Extractions",
            "2 Document Types",
            "PDF , JPEG , PNG , JPG"],
            bestPlan : false,
        },
        {
            Plan : "Standard",
            Price : 20,
            features : [
                "250 total OCR Extractions",
                "4 Document Types",
                "All in Basic + Scans"
            ],
            bestPlan : true,
        },
        {
            Plan : "Premium",
            Price : 45,
            features : [
                "500 total OCR Extractions",
                "8 Document Types",
                "Dedicated support"
            ],
            bestPlan : false,
        }
    ],
    [
        {
            Plan : "Smart Doc Enterprise",
            Price : 45,
            features : [
                "Unlimited Ocr Extractions and Documents Types",
                "Dedicated Account Manager",
                "Custom Enterprise Large Language Model"
            ],
            bestPlan : false,
        }
    ]
]

export default function Pricing() {
  return (
    <div className="py-20 md:px-5">
      <div className="container">
        <SectionTitle
          badge={"Pricing Plan"}
          titleSection={"The Perfect Plan For You"}
          description={
            "Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs"
          }
        />

        <div className='mx-auto flex justify-center mt-10 '>
            <Tabs defaultValue="Individuals & Small Teams" className="w-[1000px]">
                <TabsList className="grid w-full grid-cols-2 bg-zinc-300 text-[#28282B]  max-w-[500px] min-w-[360px] mx-auto gap-3">
                    <TabsTrigger value="Individuals & Small Teams" className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm">Individuals & Small Teams</TabsTrigger>
                    <TabsTrigger value="EnterPrise version" className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm">EnterPrise version</TabsTrigger>
                </TabsList>
                <TabsContent value="Individuals & Small Teams" className="flex justify-center flex-wrap lg:flex-nowrap lg:text-left text-center gap-5 mt-8">
                    {
                        PricingCategories[0].map(card => (
                            <Card className="Card bg-[#28282B] min-w-[300px] w-full relative py-8">
                            <CardHeader>
                                {card.bestPlan && (
                                    <div className='absolute right-3 top-3 bg-blue-500 px-2 rounded-lg font-semibold text-[12px] shadow-md shadow-cyan-800 font-Poppins text-[#201f30]'>
                                        The Best 
                                    </div>
                                )}
                                <CardTitle className="text-[#c0bfc4] font-medium text-[35px]  ">{card.Plan}</CardTitle>
                                <CardDescription className="text-[26px] text-[#c0bfc4] ">
                                    <div>
                                        {`$${card.Price}`}
                                        <span className='text-base text-[#5b5966]'>/month </span>
                                    </div>
                                    <p className='text-[#5b5966] text-[13px]'>billed annually $17 billed monthly</p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button className="w-full mb-6 shadow-lg shadow-slate-700">
                                    Get Started 
                                </Button>
                                <div className="">
                                    {card.features.map(item => (
                                        <div className='flex items-center gap-2 mt-2 justify-center lg:justify-start'>
                                            <Check size={18} className='text-blue-500' />
                                            <p className='text-[14px] text-[#c0bfc4]'>{item}</p>

                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            </Card>
                        ))
                    }
                </TabsContent>
                <TabsContent value="EnterPrise version" className="flex justify-center flex-wrap lg:flex-nowrap lg:text-left text-center gap-5  ">
                {
                    PricingCategories[1].map(card => (
                        <Card className="Card bg-[#201f30] min-w-[300px] lg:w-[500px] w-full ">
                        <CardHeader>
                            <CardTitle className="text-[#c0bfc4] font-medium text-[35px] ">{card.Plan}</CardTitle>
                            <CardDescription className="text-[26px] text-[#c0bfc4] ">
                                <div>
                                    {`$${card.Price}`}
                                    <span className='text-base text-[#5b5966]'>/month </span>
                                </div>
                                <p className='text-[#5b5966] text-[13px]'>billed annually $17 billed monthly</p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button className="w-full mb-6 shadow-lg shadow-slate-700">
                                Get Started 
                            </Button>
                            <div className="">
                                {card.features.map(item => (
                                    <div className='flex items-center gap-2 mt-2 justify-center lg:justify-start'>
                                        <Check size={18} className='text-blue-500' />
                                        <p className='text-[14px] text-[#c0bfc4]'>{item}</p>

                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        </Card>
                    ))
                }
                    
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}
