import type { Meta, StoryObj } from '@storybook/react'

import { FormType, LoginForm } from './login-form'

const meta = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: (data: FormType) => console.info(data),
  },
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // render: args => {
  //   const submit = (data: FormType) => console.info(data)
  //
  //   return (
  //     <>
  //       <LoginForm onSubmit={submit} />
  //     </>
  //   )
  // },
  //
  // args: {
  //   onSubmit: data => console.info(data),
  // },
}
