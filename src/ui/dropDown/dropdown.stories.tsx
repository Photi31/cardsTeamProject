import { Meta, StoryObj } from '@storybook/react'

import { LogoutSvg, ProfileAvatar } from 'assets/icons'
import { Person } from 'assets/icons/person.tsx'
import { Button } from 'ui/button'
import { Dropdown, DropdownItem, DropdownItemWithIcon } from 'ui/dropDown/dropdown.tsx'
import { Avatars as Avatar } from 'ui/userAvatar/avatar.tsx'

import s from './dropdown.module.scss'

const meta = {
  title: 'Components/Dropdown',
  tags: ['autodocs'],
  component: Dropdown,
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Dropdown
        align={'end'}
        storybookMode={true}
        trigger={
          <button className={s.button}>
            <div className={s.userName}></div>
            <Avatar>
              <ProfileAvatar />
            </Avatar>
          </button>
        }
      >
        <DropdownItem>
          <DropdownItemWithIcon
            className={s.containerParagraph}
            icon={
              <Avatar>
                <ProfileAvatar />
              </Avatar>
            }
            text="Ivan"
            textForEmail=""
          />
        </DropdownItem>
        <DropdownItemWithIcon icon={<Person />} text="My Profile" />
        <DropdownItemWithIcon icon={<LogoutSvg />} text="Sign Out" />
      </Dropdown>
    </div>
  ),
  args: {
    children: <></>,
    trigger: <Button>open</Button>,
  },
}
