import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { routes } from '../router/routes'

function GoogleAuthCheck() {

    const googleProvider = localStorage.getItem("gmailIntegrated")

    return googleProvider ? <Outlet/> : <Navigate to={routes.integrateGauth}/>
}

export default GoogleAuthCheck
