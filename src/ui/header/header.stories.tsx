import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { ProfileAvatar } from 'assets/icons'
import { Header } from 'ui/header/header.tsx'

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Ivan',
    },
    isLogin: true,
    children: <ProfileAvatar />,
  },
}

export const LoggedOut: Story = {
  render: args => {
    const [isLogin, setIsLogin] = useState<boolean>(false)

    const logined = () => {
      setIsLogin(!isLogin)
    }

    return (
      <>
        <Header {...args} isLogin={isLogin} onLogin={logined} />
      </>
    )
  },

  args: {
    user: {
      name: 'Ivan',
    },
    children: <ProfileAvatar />,
  },
}
