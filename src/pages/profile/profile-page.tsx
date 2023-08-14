import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { PersonalInformation } from 'components/profile'
import { useLogoutMutation, useMeQuery } from 'services/auth'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    return logout()
      .unwrap()
      .then(() => navigate('/sign-in'))
      .catch(err => toast.error(err.data.message))
  }

  return <PersonalInformation email={data!.email} name={data!.name} onLogout={handleLogout} />
}
