import UseAuthStore from '@hooks/UseAuthStore'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { routes } from '../router/routes'

function VerifyUser() {
    const {user} = UseAuthStore()
    const provider = localStorage.getItem('googleProvider')

    const googleLogin = provider === 'true'

    return (user || googleLogin) ? <Outlet/> : <Navigate to={routes.default}/>
}

export default VerifyUser
