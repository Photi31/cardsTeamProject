import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import { Loader } from 'assets/loaders/loader/loader.tsx'
import { Layout } from 'components/layout'
import { CheckEmailPage } from 'pages/check-email'
import { CreateNewPasswordPage } from 'pages/create-new-password'
import { Decks } from 'pages/decks'
import { ForgotPasswordPage } from 'pages/forgot-password'
import { ProfilePage } from 'pages/profile'
import { SignInPage } from 'pages/sign-in'
import { SignUpPage } from 'pages/sign-up'
import { useMeQuery } from 'services/authApi'

const PrivateRoutes = () => {
  const { data, isLoading } = useMeQuery()

  if (isLoading) return <Loader />

  const isAuthenticated = !!data

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <SignInPage />,
      },
      {
        path: '/register',
        element: <SignUpPage />,
      },
      {
        path: '/check-email',
        element: <CheckEmailPage />,
      },
      {
        path: '/set-new-password/:token',
        element: <CreateNewPasswordPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '*',
        element: <div style={{ marginTop: '100px' }}>NOT FOUND</div>,
      },
      // {
      //   path: '/learn',
      //   element: <div>Learn</div>,
      // },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: '/profile',
            element: <ProfilePage />,
          },
          {
            path: '/decks',
            element: <Decks />,
          },
          // {
          //   path: '/cards',
          //   element: <Cards />,
          // },
        ],
      },
    ],
  },
])
