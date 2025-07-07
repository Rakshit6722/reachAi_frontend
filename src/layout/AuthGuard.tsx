import UseAuthStore from '@hooks/UseAuthStore'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { routes } from '../router/routes'

function AuthGuard() {

    const { user } = UseAuthStore()

    return user ? <Navigate to={routes.dashboard.root}/> : <Outlet/>
}

export default AuthGuard
