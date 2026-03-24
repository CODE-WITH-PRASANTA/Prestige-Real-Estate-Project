import React from 'react'
import CustomerDashboard from '../../Component/CustomerDashboard/CustomerDashboard'
import CustomerInsights from '../../Component/CustomerInsights/CustomerInsights'
import CustomerOverview from '../../Component/CustomerOverview/CustomerOverview'
import CustomerDashboardFinal from '../../Component/CustomerDashboardFinal/CustomerDashboardFinal'
import PropertyDeviceDashboard from '../../Component/PropertyDeviceDashboard/PropertyDeviceDashboard'
import RegionMapDashboard from '../../Component/RegionMapDashboard/RegionMapDashboard'
import CustomerTableDashboard from '../../Component/CustomerTableDashboard/CustomerTableDashboard'


const DashBoard = () => {
  return (
    <div>
      <CustomerDashboard/>
      <CustomerInsights/>
      <CustomerOverview/>
      <CustomerDashboardFinal/>
      <PropertyDeviceDashboard/>
      <RegionMapDashboard/>
      <CustomerTableDashboard/>
    
    </div>
  )
}

export default DashBoard