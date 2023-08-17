import { useNavigate } from 'react-router-dom'

import { ForgotPassword, ForgotPasswordFormType } from 'components/auth/forgot-password'
import { useForgotPasswordMutation } from 'services/auth'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [forgotPassword] = useForgotPasswordMutation()

  const onSubmit = (data: ForgotPasswordFormType) =>
    forgotPassword(data)
      .unwrap()
      .then(() => {
        navigate(`/check-email?email=${data.email}`)
      })

  return <ForgotPassword onSubmit={onSubmit} tryLoggingHref={'/login'} />
}
