import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormWithoutConfirm, SignUp } from 'components/auth/sign-up'
import { useRegisterMutation } from 'services/authApi'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const [registration, result] = useRegisterMutation()

  console.log(result)

  const onSubmit = (data: FormWithoutConfirm) =>
    registration(data)
      .unwrap()
      .then(() => {
        toast.success('Вы успешно зарегестрировались ')
        navigate(`/login`)
      })
      .catch(err => toast.error(err.data.message))

  return <SignUp onSubmit={onSubmit} signInHref={'/login'} />
}
