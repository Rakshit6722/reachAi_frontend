import Header from '@components/common/layout/Header.tsx'
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function RootLayout() {
    const location = useLocation()

    useEffect(() => {
        window.scroll(0,0)
    }, [location.pathname])

    return (
        <div>
            <div><Header/></div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout
