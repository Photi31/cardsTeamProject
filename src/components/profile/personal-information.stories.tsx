import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInformation } from './personal-information.tsx'

const defaultAva =
  'https://sun9-2.userapi.com/impg/VeSbeev8_WQ8y4LGDdY1NcnvCNP_N5SatvHTUA/x9MdiRS1oKQ.jpg?size=200x200&quality=96&sign=3ef6f497a6419e576f033d6684b8afee'

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
    const [newAvatar, setNewAvatar] = useState<string>(defaultAva)

    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result as string

      setNewAvatar(result)
    }

    const handleNameChange = (newName: string) => {
      setName(newName)
    }

    const handleAvatarChange = (newFile: File) => {
      if (newFile) {
        reader.readAsDataURL(newFile)
      }
    }

    return (
      <PersonalInformation
        onAvatarChange={handleAvatarChange}
        email={'j&johnson@gmail.com'}
        name={name}
        onNameChange={handleNameChange}
        avatar={newAvatar}
        onLogout={() => {}}
      />
    )
  },

  args: {
    email: 'j&johnson@gmail.com',
    name: 'Ivan',
    avatar: '',
  },
}
