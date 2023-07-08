import { CheckEmailSvg } from 'assets/icons/checkEmail.tsx'
import { Button } from 'ui/button'
import { Card } from 'ui/card'
import { Typography } from 'ui/typography'

import s from './checkEmail.module.scss'

export type CheckEmailType = {
  email: string
}

export const CheckEmail = ({ email }: CheckEmailType) => {
  const classNames = {
    root: s.root,
    title: s.title,
    img: s.img,
    email: s.email,
  }

  return (
    <Card className={classNames.root}>
      <Typography variant="large" className={classNames.title}>
        Check Email
      </Typography>
      <CheckEmailSvg className={classNames.img} />
      <Typography variant="body2" color="inherit" className={classNames.email}>
        We’ve sent an Email with instructions to <br />
        {email}
      </Typography>
      <Button as="a" variant="primary" fullWidth>
        Back to Sign In
      </Button>
    </Card>
  )
}
