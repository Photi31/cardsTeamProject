import { useNavigate } from 'react-router-dom'

import { ForgotPassword } from 'components/auth/forgot-password'
import { useForgotPasswordMutation } from 'services/auth'
import { ForgotPasswordType } from 'services/auth/type.ts'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [forgotPassword] = useForgotPasswordMutation()

  const onSubmit = (data: ForgotPasswordType) =>
    forgotPassword(data)
      .unwrap()
      .then(() => {
        navigate(`/check-email?email=${data.email}`)
      })

  return (
    <>
      <ForgotPassword onSubmit={onSubmit} tryLoggingHref={'http://localhost:5173/login'} />
    </>
  )
}
