


import React from 'react'

export default function TitlePage({title,description}) {
  return (
    <div className=' mb-8 w-fit flex flex-col'>
        <h1 className='f text-3xl font-bold'> {title} </h1>
        <p className='text-muted-foreground text-sm mt-1.5 max-w-[500px]'> {description}</p>
      </div>
  )
}
