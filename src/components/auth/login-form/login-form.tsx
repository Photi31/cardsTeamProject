import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './login-form.module.scss'

import { Button } from 'ui/button'
import { ControlledTextField } from 'ui/controlled'
import { ControlledCheckbox } from 'ui/controlled/controlled-checkbox.tsx'
import { Header } from 'ui/header'
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

type Form = z.infer<typeof schema>

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  console.log(errors)
  const onSubmit = (data: Form) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.signInContainer}>
      <Header />
      <Typography variant="large">Sign In</Typography>
      <div className={s.inputsContainer}>
        <div className={s.inputs}>
          <ControlledTextField label={'Email'} name={'email'} control={control} type="text" />
          <ControlledTextField
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
        <Typography variant="body1">Forgot Password?</Typography>
      </div>

      <div className={s.signInButton}>
        <Button type="submit" fullWidth={true}>
          Sign In
        </Button>
      </div>
      <Typography variant="caption" color="inherit">
        Dont have an account
      </Typography>
      <Typography variant="link1">Sign Up</Typography>
    </form>
  )
}
