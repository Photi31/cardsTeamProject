import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ProgressLine } from 'assets/loaders'
import { PersonalInformation } from 'components/profile'
import { useChangeProfileMutation, useLogoutMutation, useMeQuery } from 'services/auth'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [changeProfile] = useChangeProfileMutation()

  if (isLoading) return <ProgressLine />
  const handleLogout = () => {
    return logout()
      .unwrap()
      .then(() => navigate('/login'))
      .catch(err => toast.error(err.data.message))
  }

  const handleChangeName = (name: string) => {
    return changeProfile({ name })
  }

  const handleChangeAvatar = (avatar: string) => {
    const form = new FormData()

    form.append('avatar', data?.avatar ?? '')

    return changeProfile({ avatar })
  }

  return (
    <PersonalInformation
      onNameChange={handleChangeName}
      email={data!.email}
      name={data!.name}
      onLogout={handleLogout}
      onAvatarChange={handleChangeAvatar}
    />
  )
}
