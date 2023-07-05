import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './'

import { LogoutSvg } from 'assets/icons'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'radio' },
    },
    fullWidth: {
      options: [true, false],
      control: { type: 'radio' },
    },
    as: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary button',
    disabled: false,
  },
}
export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <LogoutSvg />
        Primary button
      </>
    ),
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
    disabled: false,
  },
}
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
    disabled: false,
  },
}

export const AsLink: Story = {
  args: {
    variant: 'tertiary',
    children: 'Link that looks like a button',
    as: 'a',
    href: 'https://google.com',
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}
