

import SectionTitle from '@/components/SectionTitle';
import React from 'react';

export default function Performance() {
  return (
    <div className="container px-4 lg:px-20">
        <SectionTitle
            badge={"Performance"}
            titleSection={"Performance Details"}
            description={"SMART DOC uses AI to turn scanned PDFs and images into organized data, saving you time and freeing you from tedious manual tasks"}
        />
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 ">
            <div className="flex justify-center items-center  p-8 rounded-lg border-2 border-gray-700 bg-[#28282B]">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-[#FFFECA]">5s</h2>
                    <p className="text-lg  text-[#FFFECA]">Seconds on average per page</p>
                </div>
            </div>
            <div className="flex justify-center items-center  p-8 rounded-lg border-2 border-gray-700 bg-[#28282B]">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-[#FFFECA]">99%</h2>
                    <p className="text-lg text-[#FFFECA] ">Data extraction accuracy</p>
                </div>
            </div>
            <div className="flex justify-center items-center bg-background:   p-8 rounded-lg border-2 border-gray-700 bg-[#28282B]">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-[#FFFECA]">98%</h2>
                    <p className="text-lg text-[#FFFECA]">Time saved per document</p>
                </div>
            </div>
        </div>
        
        {/* Optimization Details */}
        <div className="mt-12 p-6 shadow-zinc-700 rounded-lg border-2 border-gray-700  bg-[#28282B] text-[#FFFECA]">
            <h3 className="text-2xl font-semibold ">Optimization of Performance</h3>
            <ul className="mt-4 space-y-4">
                <li>
                    <strong className=' mr-2'>Parallel Processing :</strong> Multiple documents can be processed simultaneously, reducing overall processing time.
                </li>
                <li>
                    <strong className=' mr-2'>Monitoring & Reporting :</strong> We provide modules to track real-time performance, identify bottlenecks, and optimize processes accordingly.
                </li>
                <li>
                    <strong className=' mr-2'>End-to-End Security & Encryption :</strong> all data is encrypted at rest (AES-256) and in transit (TLS 1.2+)
                </li>
            </ul>
        </div>
    </div>
  );
}

