import UseAuthStore from '@hooks/UseAuthStore'
import { getUserProfileService } from '@services/auth/user-auth.api'
import React, { useEffect } from 'react'

function UserDetatilsCheck({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (localStorage.getItem('googleProvider')) {
            fetchUser()
        }
    }, [])

    const { setUser } = UseAuthStore()

    const fetchUser = async () => {
        const response = await getUserProfileService()
        setUser(response?.data?.user)
        localStorage.removeItem('googleProvider')
    }
    return children
}

export default UserDetatilsCheck
