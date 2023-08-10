import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from 'ui/button'
import { Card } from 'ui/card'
import { ControlledTextField } from 'ui/controlled'
import { Typography } from 'ui/typography'

import s from './sign-up.module.scss'

const schema = z
  .object({
    email: z.string().trim().email('Invalid email address').nonempty('Enter email'),
    password: z
      .string()
      .trim()
      .nonempty('Enter password')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().trim().nonempty('Enter password'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: 'Passwords do not match',
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
      })
    }

    return data
  })

type Form = z.infer<typeof schema>
type FormWithoutConfirm = Omit<Form, 'confirmPassword'>

type Props = {
  onSubmit: (data: FormWithoutConfirm) => void
  signInHref?: string
}

export const SignUp = (props: Props) => {
  const { onSubmit, signInHref } = props

  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSubmitWithOmit = (data: Form) => {
    const { confirmPassword, ...restData } = data

    onSubmit(restData)
  }

  return (
    <>
      <Card className={s.card}>
        <Typography variant="large">Sign Up</Typography>
        <form onSubmit={handleSubmit(handleSubmitWithOmit)}>
          <ControlledTextField name="email" control={control} label="Email" className={s.email} />
          <ControlledTextField
            type="password"
            name="password"
            control={control}
            label="Password"
            className={s.password}
          />
          <ControlledTextField
            type="password"
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            className={s.password}
          />
          <Button className={s.button} fullWidth>
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" className={s.message} color="inherit">
          Already have an account?
        </Typography>
        <Typography variant="link1" color="secondary" className={s.link} as={'a'} href={signInHref}>
          Sign In
        </Typography>
      </Card>
    </>
  )
}
