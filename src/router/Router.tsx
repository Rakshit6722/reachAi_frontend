import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/auth/login/LoginPage'
import { routes } from './routes'
import RegisterPage from '../features/auth/register/RegisterPage'
import RootLayout from '../layout/RootLayout'
import ResetPasswordPage from '../features/auth/ResetPassword/ResetPasswordPaget'
import ForgotPasswordPage from '../features/auth/forgotPassword/ForgotPasswordPage'
import VerifyUser from '../layout/VerifyUser'
import HomePage from '../features/home/HomePage'
import GoogleAuthCheck from '../layout/GoogleAuthCheck'
import GauthPage from '../features/IntegrateGauth/GauthPage'
import AuthGuard from '../layout/AuthGuard'
import FallbackPage from '../pages/FallbackPage'
import UserDetatilsCheck from '../features/dashboard/guard/UserDetatilsCheck'
import DashboardLayout from '../features/dashboard/DashboardLayout/DashboardLayout'
import CampaignPage from '../features/dashboard/campaign/CampaignPage'
import CampaignDetailsPage from '../features/dashboard/campaignDetails/CampaignDetailsPage'

function Router() {
  return (
    <Routes>
      <Route element={<VerifyUser />}>
        <Route element={<GoogleAuthCheck />}>
          <Route path={routes.dashboard.root} element={
            <UserDetatilsCheck>
              <DashboardLayout />
            </UserDetatilsCheck>
          } >
            <Route index element={<Navigate to={routes.dashboard.campaigns}/>}/>
            <Route path={routes.dashboard.campaigns} element={<CampaignPage/>}/>
            <Route path={routes.dashboard.campaignDetails} element={<CampaignDetailsPage/>}/>
          </Route>
        </Route>
      </Route>
      <Route path={routes.integrateGauth} element={<GauthPage />} />
      <Route element={<AuthGuard />}>
        <Route element={<RootLayout />}>
          <Route path={routes.default} element={<HomePage />} />
        </Route>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.signup} element={<RegisterPage />} />
        <Route path={routes.forgotPassowrd} element={<ForgotPasswordPage />} />
        <Route path={routes.resetPassword} element={<ResetPasswordPage />} />
      </Route>

      <Route path={routes.wildcard} element={<FallbackPage status={404} />} />
    </Routes>
  )
}

export default Router
