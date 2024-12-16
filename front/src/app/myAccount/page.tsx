import MyAccount from '@/components/Profile/MyAccount'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
    <MyAccount />
  </ProtectedRoute>
  )
}