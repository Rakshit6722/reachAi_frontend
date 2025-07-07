import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function DashboardLayout() {
  // Get the same width as your sidebar (w-16 when collapsed, w-64 when expanded)
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />
      <main className={`flex-1 bg-gray-50 p-6 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout
