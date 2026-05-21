import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  // 모바일 사이드바 열림/닫힘 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // 사이드바 열기
  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  // 사이드바 닫기
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <Header onOpenSidebar={openSidebar} />

          <main className="flex-1 bg-slate-900 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout