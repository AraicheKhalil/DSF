import SectionTitle from '@/components/SectionTitle'
import React from 'react'

export default function WhyUs() {
  return (
    <div className='sm:px-5'>
      <div className="container  ">
        <SectionTitle badge={"Why Choose Us"} titleSection={"Built for Creatives, by Creatives"}  />

        <div className='text-base pt-6 text-[18px] text-center max-w-[800px] mx-auto '>
          <p className=' mb-6'><span className='font-semibold'>SMART DOC</span> is an <span className='underline'>AI OCR (Optical Character Recognition) software</span>, expertly designed to revolutionize how you manage and process unstructured documents. Imagine a world where scanned PDFs and images no longer require countless hours of manual data entry.</p>
          <p>Elevate your document management strategy with Smart Doc Enterprise. Our state-of-the-art solution efficiently converts physical paperwork into easily manageable digital formats, utilizing advanced OCR extraction technology. Seamlessly integrating with CRM and ERP systems, Smart Doc Enterprise ensures swift and accurate data transfer, eliminating the need for cumbersome manual entry processes.</p>
        </div>

        <div className='flex flex-col gap-8 mt-10 text-[18px]'>

          <q className="font-semibold italic text-center w-fit mx-auto ">From Pixels to Insights – Our OCR Redefines Document Intelligence!</q>
          <q className="font-semibold italic text-center w-fit mx-auto ">Intelligence in Every Scan. Translate Documents into Seamless Data Streams!</q>

        </div>


      </div>
    </div>
  )
}
