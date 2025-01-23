"use client"
import AdminDashboard from '@/components/Admin/AdminDashboard';
import PrivateRouteAdmin from '@/components/PrivateRoutAdmin';
import MyAccount from '@/components/Profile/MyAccount'
import ProtectedRoute from '@/components/ProtectedRoute'
import { UserContext } from '@/context/userContext';
import React, { useContext } from 'react'
import MyAccountAdmin from '../dashboardAdmin/myAccountAdmin/page';


export default function Page() {
  const { isAdmin } = useContext(UserContext); 

  if (isAdmin) {
    return (
      <PrivateRouteAdmin>
        <MyAccountAdmin/>
      </PrivateRouteAdmin>
    );
  }

  return (
    <ProtectedRoute>
      <MyAccount />
    </ProtectedRoute>
  );
}