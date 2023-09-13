import { useEffect, useState } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Loader } from 'assets/loaders'
import { useLogoutMutation, useMeQuery } from 'services/authApi'
import { Header } from 'ui/header'

export const Layout = () => {
  const { data, isLoading } = useMeQuery()
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setLoading(false)
  }, [data])

  if (loading) return <Loader />

  const handleLogout = () => {
    return logout()
      .unwrap()
      .then(() => navigate('/login'))
      .catch(err => toast.error(err.data.message))
  }
  const login = () => {
    navigate('/login')
  }

  const profilePage = () => {
    navigate('/profile')
  }
  const defualtPage = () => {
    navigate('/decks')
  }

  if (isLoading) return <Loader />

  return (
    <>
      <Header
        profilePage={profilePage}
        user={data && !('success' in data) ? data : null}
        isLogin={!!data && !('success' in data)}
        onLogin={login}
        onLogout={handleLogout}
        defualtPage={defualtPage}
      />
      <Outlet />
    </>
  )
}
