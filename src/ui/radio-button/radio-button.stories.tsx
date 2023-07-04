import type { Meta, StoryObj } from '@storybook/react'

import { RadioButton } from '.'

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'value' } },
  args: {
    disabled: false,
    label: 'Radio button',
  },
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
}
