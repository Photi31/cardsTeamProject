import { useEffect, useState } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ProgressLine } from 'assets/loaders'
import { useLogoutMutation, useMeQuery } from 'services/auth'
import { Header } from 'ui/header'

export const Layout = () => {
  const { data, isLoading } = useMeQuery()
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()
  const [loading, setLoading] = useState(isLoading)

  console.log(loading)

  useEffect(() => {
    setLoading(false)
  }, [data])

  const handleLogout = () => {
    return logout()
      .unwrap()
      .then(() => navigate('/login'))
      .catch(err => toast.error(err.data.message))
  }
  const log = () => {
    navigate('/login')
  }

  // if (isLoading) return <Loader />
  if (loading) return <ProgressLine />

  return (
    <>
      <Header user={data} isLogin={!!data} onLogin={log} onLogout={handleLogout} />
      <Outlet />
    </>
  )
}
