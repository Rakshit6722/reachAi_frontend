import UseAuthStore from '@hooks/UseAuthStore'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate()

    const { user } = UseAuthStore()

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [])

    return (
        <div>

        </div>
    )
}

export default HomePage
