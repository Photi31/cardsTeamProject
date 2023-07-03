import { Meta, StoryObj } from '@storybook/react'

import { Card } from '../card/card.tsx'
import { Typography } from '../typography'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleCard: Story = {
  args: {
    children: <Typography variant={'h1'}>Card</Typography>,
  },
}
