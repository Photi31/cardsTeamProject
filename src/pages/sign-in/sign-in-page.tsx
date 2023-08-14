import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LoginForm } from 'components/auth/login-form'
import { useLoginMutation, useMeQuery } from 'services/auth'

export const SignInPage = () => {
  const { data, isLoading } = useMeQuery()
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  if (isLoading) return <div>Loading...</div>
  if (data) return <Navigate to={'/profile'} />

  const handleLogin = (args: { email: string; password: string }) => {
    return login(args)
      .unwrap()
      .then(() => {
        toast.error('Вы успешно залогинились')
        navigate('/profile')
      })
      .catch(err => toast.error(err.data.message))
  }

  return (
    <LoginForm onSubmit={handleLogin} forgotHref={'/forgot-password'} signUpHref={'/register'} />
  )
}
