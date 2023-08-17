import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from 'ui/button'
import { Card } from 'ui/card'
import { ControlledTextField } from 'ui/controlled'
import { Typography } from 'ui/typography'

import s from './forgot-password.module.scss'

const schema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .nonempty('Enter email')
    .min(3, 'SignInPage must be at least 3 characters'),
})

export type ForgotPasswordFormType = z.infer<typeof schema>

type Props = {
  tryLoggingHref?: string
  onSubmit: (data: ForgotPasswordFormType) => void
}

export const ForgotPassword = ({ onSubmit, tryLoggingHref }: Props) => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  })

  const handleFormSubmitted = handleSubmit(onSubmit!)

  return (
    <form onSubmit={handleFormSubmitted}>
      <Card className={s.forgotPasswordContainer}>
        <Typography variant="large">Forgot your password?</Typography>
        <div className={s.inputsContainer}>
          <div className={s.inputs}>
            <ControlledTextField
              placeholder={'Enter you email'}
              label={'Email'}
              name={'email'}
              control={control}
              type="text"
            />
          </div>
          <Typography variant="caption" color="inherit" className={s.instructionsText}>
            Enter your email address and we will send you further instructions
          </Typography>
        </div>

        <div className={s.sendInstructionsButton}>
          <Button type="submit" fullWidth={true}>
            Send Instructions
          </Button>
        </div>
        <Typography variant="caption" color="inherit" className={s.rememberPassword}>
          Did you remember your password?
        </Typography>
        <Typography
          as={'a'}
          href={tryLoggingHref}
          variant="link1"
          color="secondary"
          className={s.tryLogging}
        >
          Try logging in
        </Typography>
      </Card>
    </form>
  )
}
