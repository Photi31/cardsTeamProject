import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ProgressLine } from 'assets/loaders/progress-line/progress-line.tsx'
import { LoginForm, LoginFormType } from 'components/auth/login-form'
import { useLoginMutation, useMeQuery } from 'services/auth'

export const SignInPage = () => {
  const { data, error, isLoading } = useMeQuery()
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  console.log(error)

  if (data) return <Navigate to={'/profile'} />
  if (isLoading) return <ProgressLine />
  const handleLogin = (args: LoginFormType) => {
    return login(args)
      .unwrap()
      .then(() => {
        toast.success('Вы успешно залогинились')
        navigate('/profile')
      })
      .catch(err => toast.error(err.data.message))
  }

  return (
    <LoginForm onSubmit={handleLogin} forgotHref={'/forgot-password'} signUpHref={'/register'} />
  )
}
