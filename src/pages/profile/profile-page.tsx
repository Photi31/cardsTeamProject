import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ProgressLine } from 'assets/loaders'
import { PersonalInformation } from 'components/profile'
import { useChangeProfileMutation, useLogoutMutation, useMeQuery } from 'services/authApi'

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
    const form = new FormData()

    form.append('name', name)
    changeProfile(form)
      .unwrap()
      .then(() => {
        toast.success('Name changed')
      })
      .catch(err => {
        toast.error(err.data.message)
      })
  }

  const handleChangeAvatar = (avatar: File) => {
    const form = new FormData()

    form.append('avatar', avatar)
    changeProfile(form)
      .unwrap()
      .then(() => {
        toast.success('Avatar changed')
      })
      .catch(err => {
        toast.error(err.data.message)
      })
  }

  return (
    <PersonalInformation
      onNameChange={handleChangeName}
      email={data && !('success' in data) ? data.email : null}
      name={data && !('success' in data) ? data.name : null}
      onLogout={handleLogout}
      onAvatarChange={handleChangeAvatar}
      avatar={data && !('success' in data) ? data.avatar : null}
    />
  )
}
