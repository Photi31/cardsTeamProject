import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from '.'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: { onValueCommit: { action: 'value' } },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Number of cards',
    min: 0,
    max: 80,
    defaultValue: [10, 50],
    style: { maxWidth: '250px' },
  },
}

export const OneThumb: Story = {
  args: {
    min: 0,
    max: 800,
    style: { maxWidth: '250px' },
  },
}
