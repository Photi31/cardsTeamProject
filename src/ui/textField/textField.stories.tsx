import { Meta, StoryObj } from '@storybook/react'

import { TextField } from '../textField'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['password', 'search'],
      control: { type: 'radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleInput: Story = {
  args: {
    label: 'Input',
  },
}
export const SearchInput: Story = {
  args: {
    label: 'Search Input',
    type: 'search',
  },
}
export const InputForPassword: Story = {
  args: {
    label: 'Password Input',
    placeholder: 'password',
    type: 'password',
  },
}
export const ErrorInput: Story = {
  args: {
    label: 'Error Input',
    type: 'password',
    error: 'Error',
  },
}
