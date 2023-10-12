import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Rating } from './rating'

const meta = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ margin: '3em', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { grade: 3 },
}
const ControlledRating = () => {
  const [rating, setRating] = useState<number>(0)

  return <Rating grade={rating} onClick={setRating} />
}

export const RatingWithControl: Story = {
  args: { grade: 0 },
  render: () => <ControlledRating />,
}
