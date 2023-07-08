import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './login-form.module.scss'

import { Button } from 'ui/button'
import { Card } from 'ui/card'
import { ControlledTextField } from 'ui/controlled'
import { ControlledCheckbox } from 'ui/controlled/controlled-checkbox.tsx'
import { Typography } from 'ui/typography'

const schema = z.object({
  password: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .nonempty('Enter email')
    .min(3, 'Login must be at least 3 characters'),
})

export type FormType = z.infer<typeof schema>

type Props = {
  forgoHref?: string
  signUpHref?: string
  onSubmit?: (data: FormType) => void
}

export const LoginForm = ({ onSubmit, forgoHref, signUpHref }: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  const handleFormSubmitted = handleSubmit(onSubmit!)

  return (
    <form onSubmit={handleFormSubmitted}>
      <Card className={s.signInContainer}>
        <Typography variant="large">Sign In</Typography>
        <div className={s.inputsContainer}>
          <div className={s.inputs}>
            <ControlledTextField
              placeholder={'Enter you email'}
              label={'Email'}
              name={'email'}
              control={control}
              type="text"
            />
            <ControlledTextField
              placeholder={'Enter you password'}
              label={'Password'}
              name={'password'}
              control={control}
              type="password"
            />
          </div>
          <div className={s.inputCheckboxContainer}>
            <label className={s.checkbox}>
              <ControlledCheckbox label={'Remember me'} name={'rememberMe'} control={control} />
            </label>
          </div>
        </div>
        <div className={s.forgotPassword}>
          <Typography as={'a'} href={forgoHref} variant="body1">
            Forgot Password?
          </Typography>
        </div>

        <div className={s.signInButton}>
          <Button type="submit" fullWidth={true}>
            Sign In
          </Button>
        </div>
        <Typography variant="caption" color="inherit" className={s.dontHaveAccount}>
          {"Don't have an account?"}
        </Typography>
        <Typography
          as={'a'}
          href={signUpHref}
          variant="link1"
          color="secondary"
          className={s.signUp}
        >
          Sign Up
        </Typography>
      </Card>
    </form>
  )
}

// - пропсы href для ссылок forgot и sign up
