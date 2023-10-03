import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ForgotPassword, ForgotPasswordFormType } from 'components/auth/forgot-password'
import { useForgotPasswordMutation } from 'services/authApi'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [forgotPassword] = useForgotPasswordMutation()

  const onSubmit = (data: ForgotPasswordFormType) => {
    return forgotPassword(data)
      .unwrap()
      .then(() => navigate(`/check-email?email=${data.email}`))
      .catch(err => toast.error(err.data.message))
  }

  return <ForgotPassword onSubmit={onSubmit} tryLoggingHref={'/login'} />
}
