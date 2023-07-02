import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: { onValueChange: { action: 'value' } },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    values: ['first', 'second', 'third', 'test test'],
    style: { width: '200px' },
    defaultValue: 'second',
  },
}

export const DefaultWithLabel: Story = {
  args: {
    values: ['first', 'second', 'third', 'test test'],
    label: 'Select Label',
    style: { width: '200px' },
    defaultValue: 'second',
  },
}

export const Body2: Story = {
  args: {
    values: ['10', '20', '30', '100'],
    placeholder: 'placeholder',
    variant: 'body2',
    defaultValue: '10',
    style: { width: '50px' },
  },
}

export const Body2WithLabel: Story = {
  args: {
    values: ['10', '20', '30', '100'],
    placeholder: 'placeholder',
    label: 'Select Label',
    variant: 'body2',
    defaultValue: '10',
    style: { width: '50px' },
  },
}

export const Disabled: Story = {
  args: {
    values: ['Test text'],
    disabled: true,
    placeholder: 'placeholder',
    style: { width: '200px' },
  },
}
