import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LoginForm } from 'components/auth/login-form'
import { useLoginMutation } from 'services/auth'

export const SignInPage = () => {
  const navigate = useNavigate()
  const [login] = useLoginMutation()

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
    <>
      <LoginForm
        onSubmit={handleLogin}
        forgotHref={'http://localhost:5173/forgot-password'}
        signUpHref={'http://localhost:5173/register'}
      />
    </>
  )
}
