import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useLogoutMutation, useMeQuery } from 'services/auth'
import { Header } from 'ui/header'

export const Layout = () => {
  const { data } = useMeQuery()
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    return logout()
      .unwrap()
      .then(() => navigate('/sign-in'))
      .catch(err => toast.error(err.data.message))
  }
  const log = () => {
    navigate('/sign-in')
  }

  return (
    <>
      <Header user={data} isLogin={!!data} onLogin={log} onLogout={handleLogout} />
      <Outlet />
    </>
  )
}
