import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from '.'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'value' } },
  args: {},
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    groupName: 'radio-group',
    options: ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'],
    disabled: false,
  },
}
