import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

import React from 'react'

export default function page() {
  return (
    <div><Button onClick={signOut()}>signOut</Button></div>
  )
}
