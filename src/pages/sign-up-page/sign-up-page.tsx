import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignUp } from 'components/auth/sign-up'
import { useRegisterMutation } from 'services/auth'
import { RegisterType } from 'services/auth/type.ts'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const [registration, result] = useRegisterMutation()

  console.log(result)

  const onSubmit = (data: RegisterType) =>
    registration(data)
      .unwrap()
      .then(() => {
        toast.success('Вы успешно зарегестрировались ')
        navigate(`/login`)
      })
      .catch(err => toast.error(err.data.message))

  return (
    <div>
      <SignUp onSubmit={onSubmit} signInHref={'/login'} />
    </div>
  )
}
