import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from './create-new-password.tsx'

const meta = {
  title: 'Auth/CreateNewPassword',
  component: CreateNewPassword,
  tags: ['autodocs'],
  argTypes: { onSubmit: { action: 'data' } },
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
