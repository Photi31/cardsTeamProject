import { useNavigate, useParams } from 'react-router-dom'

import { CreateNewPassword, NewPasswordFormType } from 'components/auth/create-new-password'
import { useCreateNewPasswordMutation } from 'services/auth'

export const CreateNewPasswordPage = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const [setNewPassword] = useCreateNewPasswordMutation()

  const onSubmit = (data: NewPasswordFormType) =>
    setNewPassword({ password: data.password, token })
      .unwrap()
      .then(() => {
        navigate('/login')
      })

  return <CreateNewPassword onSubmit={onSubmit} />
}
