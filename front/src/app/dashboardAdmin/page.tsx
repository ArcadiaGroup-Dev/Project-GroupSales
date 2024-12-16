import AdminUsers from '@/components/Admin/AdminUsers'
import PrivateRouteAdmin from '@/components/PrivateRoutAdmin'
import React from 'react'

export default function page() {
  return (

    <PrivateRouteAdmin>
    <AdminUsers/>
      </PrivateRouteAdmin>
  )
}
