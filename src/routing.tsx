import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import { Loader } from 'assets/loaders/loader/loader.tsx'
import { Layout } from 'components/layout'
import { CheckEmailPage } from 'pages/auth/check-email'
import { CreateNewPasswordPage } from 'pages/auth/create-new-password'
import { ForgotPasswordPage } from 'pages/auth/forgot-password'
import { SignInPage } from 'pages/auth/sign-in'
import { SignUpPage } from 'pages/auth/sign-up'
import { Cards } from 'pages/cards'
import { Decks } from 'pages/decks'
import { ProfilePage } from 'pages/profile'
import { useMeQuery } from 'services/authApi'

const PrivateRoutes = () => {
  const { data, isLoading } = useMeQuery()

  if (isLoading) return <Loader />

  const isAuthenticated = !!data && !('success' in data)

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/decks'} />,
      },
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
          {
            path: '/cards/:deckId',
            element: <Cards />,
          },
        ],
      },
    ],
  },
])
