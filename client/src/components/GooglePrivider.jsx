import { Button } from '@/components/ui/button'
import React from 'react'

function GooglePrBtn() {

  return (
    <Button className="flex gap-3 items-center">
        <img src="/google.png"/>
        <p>Login with Google</p>
    </Button>
  )
}

export default GooglePrBtn