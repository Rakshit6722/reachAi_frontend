import { authStore } from '@store/auth-store/authStore'
import React from 'react'


function UseAuthStore() {
    const user = authStore((s) => s.user)
    const setUser = authStore((s) => s.setUser)
    const logout = authStore((s) => s.logout)

    return {
        user,
        setUser,
        logout
    }
}

export default UseAuthStore
