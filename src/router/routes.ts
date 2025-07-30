export const routes = { 
    default: '/',
    dashboard:{
        root:'/dashboard',
        campaigns:'campaigns',
        campaignDetails:'campaigns/:campaignId',
    },
    login: '/auth/login',
    signup: '/auth/signup',
    forgotPassowrd:'/auth/forgot-password',
    resetPassword:'/auth/reset-password',
    integrateGauth:'/auth/integrate-gauth',
    wildcard:"*"
}