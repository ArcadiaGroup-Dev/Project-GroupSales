import FormAds from '@/components/Ads/FormAds'
import PrivateRouteAdmin from '@/components/PrivateRoutAdmin'
import React from 'react'

export default function page() {
  return (
   <PrivateRouteAdmin>
      <FormAds/>
   </PrivateRouteAdmin>
  )
}
