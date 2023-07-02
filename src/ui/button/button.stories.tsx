import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '../typography'

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
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const clickButton = () => {
  // console.log('click')
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Typography variant={'subtitle2'}>Primary button</Typography>
      </>
    ),
    disabled: false,
    onClick: clickButton,
  },
}
export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <LogoutSvg />
        <Typography variant={'subtitle2'}>Primary button</Typography>
      </>
    ),
    disabled: false,
    onClick: clickButton,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <Typography variant={'subtitle2'}>Secondary Button</Typography>
      </>
    ),
    disabled: false,
    onClick: clickButton,
  },
}
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: (
      <>
        <Typography variant={'subtitle2'} color="secondary">
          Tertiary Button
        </Typography>
      </>
    ),
    disabled: false,
    onClick: clickButton,
  },
}
export const Link: Story = {
  args: {
    variant: 'link',
    children: (
      <>
        <Typography variant={'subtitle2'} color="secondary">
          Link Button
        </Typography>
      </>
    ),
    disabled: false,
    onClick: clickButton,
  },
}

export const AsLink: Story = {
  args: {
    variant: 'tertiary',
    children: (
      <>
        <Typography variant={'subtitle1'} color="secondary">
          Link that looks like a button
        </Typography>
      </>
    ),
    as: 'a',
    href: 'https://google.com',
    onClick: clickButton,
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Typography variant={'subtitle2'}>Full Width Button</Typography>
      </>
    ),
    disabled: false,
    fullWidth: true,
    onClick: clickButton,
  },
}
