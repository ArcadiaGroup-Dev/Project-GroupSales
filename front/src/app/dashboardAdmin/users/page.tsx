import Users from '@/components/Admin/Users'
import PrivateRouteAdmin from '@/components/PrivateRoutAdmin'
import React from 'react'

export default function page() {
  return (
    <PrivateRouteAdmin>
      <Users/>
      </PrivateRouteAdmin>
 
  )
}
