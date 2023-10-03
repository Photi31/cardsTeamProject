import { useNavigate, useSearchParams } from 'react-router-dom'

import { CheckEmail } from 'components/auth/check-email'

export const CheckEmailPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const backToLogin = () => {
    navigate('/login')
  }

  return (
    <>
      <CheckEmail email={email!} backToLogin={backToLogin} />
    </>
  )
}
