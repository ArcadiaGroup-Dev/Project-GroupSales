import AdminDashboard from '@/components/Admin/AdminDashboard'
import PrivateRouteAdmin from '@/components/PrivateRoutAdmin'
import React from 'react'

export default function page() {
  return (

    <PrivateRouteAdmin>
    <AdminDashboard/>
      </PrivateRouteAdmin>
  )
}
