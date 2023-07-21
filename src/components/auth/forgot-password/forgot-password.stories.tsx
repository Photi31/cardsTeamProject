import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from './forgot-password.tsx'

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
  argTypes: { onSubmit: { action: 'data' } },
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
