import AdminProducts from '@/components/Admin/AdminProducts'
import PrivateRouteAdmin from '@/components/PrivateRoutAdmin'
import React from 'react'

export default function page() {
  return (
   <PrivateRouteAdmin>
     <AdminProducts/> 
    </PrivateRouteAdmin>
  )
}
