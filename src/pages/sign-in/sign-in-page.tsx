import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ProgressLine } from 'assets/loaders/progress-line/progress-line.tsx'
import { LoginForm, LoginFormType } from 'components/auth/login-form'
import { useLoginMutation, useMeQuery } from 'services/authApi'

export const SignInPage = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useMeQuery()
  const [login] = useLoginMutation()

  if (isLoading) return <ProgressLine />
  if (data && !('success' in data)) return <Navigate to={'/decks'} />
  const handleLogin = (args: LoginFormType) => {
    return login(args)
      .unwrap()
      .then(() => {
        toast.success('Вы успешно залогинились')
        navigate('/decks')
      })
      .catch(err => toast.error(err.data.message))
  }

  return (
    <LoginForm onSubmit={handleLogin} forgotHref={'/forgot-password'} signUpHref={'/register'} />
  )
}
