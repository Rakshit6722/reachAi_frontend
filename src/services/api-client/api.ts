import axios, { Axios, type Method } from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const axiosInstace: Axios | any = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})

// axiosInstace.interceptors.request.use(
//     (config: any) => {
//         if (config.requireAuth !== false) {
//             const token = localStorage.getItem('token')
//             if (token) {
//                 config.headers = {
//                     ...config.headers,
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         }

//         delete config.requireAuth

//         return config
//     },
//     (error: any) => {
//         return Promise.reject(error)
//     }
// )

export const apiConnector = (url: string, method: Method, body: any, header: any, params: any, formData = false) => {
    return axiosInstace({
        url,
        method,
        data: body ? body : null,
        headers: header ? {
            'Content-Type': formData ? "multipart/form-data" : "application/json",
            ...header
        } : null,
        params: params ? params : null,
    })
}