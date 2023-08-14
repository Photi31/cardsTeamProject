import { useNavigate, useParams } from 'react-router-dom'

import { CreateNewPassword } from 'components/auth/create-new-password'
import { useCreateNewPasswordMutation } from 'services/auth'
import { CreateNewPasswordType } from 'services/auth/type.ts'

export const CreateNewPasswordPage = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const [setNewPassword] = useCreateNewPasswordMutation()

  const onSubmit = (data: CreateNewPasswordType) =>
    setNewPassword({ password: data.password, token })
      .unwrap()
      .then(() => {
        navigate('/sign-in')
      })

  return <CreateNewPassword onSubmit={onSubmit} />
}
