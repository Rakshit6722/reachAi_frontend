    export const googleLogin = async () => {
        localStorage.setItem("googleProvider","true")
        localStorage.setItem("gmailIntegrated","true")
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`
    }