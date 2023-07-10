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

type Props = {
  onSubmit: (data: Form) => void
}

export const SignUp = (props: Props) => {
  const { onSubmit } = props

  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={s.card}>
        <Typography variant="large">Sign Up</Typography>
        <ControlledTextField name="email" control={control} label="Email" className={s.email} />
        <ControlledTextField
          type="password"
          name="password"
          control={control}
          label="Password"
          className={s.pass}
        />
        <ControlledTextField
          type="password"
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          className={s.pass}
        />
        <Button className={s.button} fullWidth>
          Sign Up
        </Button>
        <Typography variant="body2" className={s.message} color="inherit">
          Already have an account?
        </Typography>
        <Typography variant="link1" color="secondary" className={s.link}>
          Sign In
        </Typography>
      </Card>
    </form>
  )
}
