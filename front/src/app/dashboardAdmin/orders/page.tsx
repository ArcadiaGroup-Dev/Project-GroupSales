import AdminOrders from '@/components/Admin/AdminOrders'
import PrivateRouteAdmin from '@/components/PrivateRoutAdmin'
import React from 'react'

export default function page() {
  return (
   <PrivateRouteAdmin>
      <AdminOrders/> 
   </PrivateRouteAdmin>
  )
}
