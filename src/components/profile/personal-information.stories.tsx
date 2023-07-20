import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInformation } from './personal-information.tsx'

const meta = {
  title: 'Profile/Personal information',
  component: PersonalInformation,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [name, setName] = useState('Ivan')

    const handleNameChange = (newName: string) => {
      setName(newName)
    }

    return (
      <>
        <PersonalInformation
          email={'j&johnson@gmail.com'}
          name={name}
          onNameChange={handleNameChange}
          avatar={
            'https://sun9-2.userapi.com/impg/VeSbeev8_WQ8y4LGDdY1NcnvCNP_N5SatvHTUA/x9MdiRS1oKQ.jpg?size=200x200&quality=96&sign=3ef6f497a6419e576f033d6684b8afee&type=album'
          }
        />
      </>
    )
  },

  args: {
    email: 'j&johnson@gmail.com',
    name: 'Ivan',
    onAvatarChange: () => {
      console.info('avatar changed')
    },
    onNameChange: () => {
      console.info('name changed')
    },
    onLogout: () => {
      console.info('logout')
    },
  },
}
