import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from 'ui/button'
import { Card } from 'ui/card'
import { ControlledTextField } from 'ui/controlled'
import { Typography } from 'ui/typography'

import s from './create-new-password.module.scss'

const schema = z.object({
  password: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(8, 'Password must be at least 8 characters'),
})

export type NewPasswordFormType = z.infer<typeof schema>

type Props = {
  onSubmit?: (data: NewPasswordFormType) => void
}

export const CreateNewPassword = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<NewPasswordFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      password: '',
    },
  })

  const handleFormSubmitted = handleSubmit(onSubmit!)

  return (
    <form onSubmit={handleFormSubmitted}>
      <Card className={s.forgotPasswordContainer}>
        <Typography variant="large">Create new password</Typography>
        <div className={s.inputsContainer}>
          <div className={s.inputs}>
            <ControlledTextField
              placeholder={'Enter you password'}
              label={'Password'}
              name={'password'}
              control={control}
              type="password"
            />
          </div>
          <Typography variant="caption" color="inherit" className={s.instructionsText}>
            Create new password and we will send you further instructions to email
          </Typography>
        </div>
        <div className={s.createPasswordButton}>
          <Button type="submit" fullWidth={true}>
            Create new password
          </Button>
        </div>
      </Card>
    </form>
  )
}
