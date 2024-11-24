import TitlePage from '@/components/Custom/TitlePage'
import DocIntegration from '@/components/DocIntegration'
import LastExtractionResults from '@/components/LastExtractionResults'
import React from 'react'

export default function Settings() {
  return (
    <div className='chat-doc px-4 py-6 md:p-7 '>

      <TitlePage title={"Integrate with Chat Doc "} description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem nostrum laboriosam deleniti tempora dolores "} />

      <div className='flex justify-between gap-6 flex-wrap lg:flex-nowrap'>
        <LastExtractionResults />
        <DocIntegration />
      </div>

    </div>
  )
}
