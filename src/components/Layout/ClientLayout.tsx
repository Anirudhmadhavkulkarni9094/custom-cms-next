import React from 'react'
import Sidebar from '../Sidebar/Sidebar'

function ClientLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <div className="flex min-h-screen">
            <div className='sticky top-0 min-h-screen'>
            <Sidebar />
            </div>
            <main className="flex-1 p-8 overflow-auto md:ml-0 ml-0">
            {children}
            </main>
        </div>
    </div>
  )
}

export default ClientLayout