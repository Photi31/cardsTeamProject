import { ReactNode } from 'react'

import { Logo, LogoutSvg } from 'assets/icons'
import defaultAva from 'assets/icons/defaultAva.png'
import { Person } from 'assets/icons/person.tsx'
import { Button } from 'ui/button'
import { Dropdown, DropdownItem, DropdownItemWithIcon } from 'ui/dropDown/dropdown.tsx'
import { Avatars as Avatar } from 'ui/userAvatar/avatar.tsx'

import s from './header.module.scss'

export type User = {
  name: string
  avatar?: string
  email: string
}

interface HeaderProps {
  user?: User | null
  onLogin?: () => void
  onLogout?: () => void
  isLogin?: boolean
  children?: ReactNode
}

export const Header = ({ user, onLogin, children, isLogin, onLogout }: HeaderProps) => {
  const hasAvatar = user?.avatar || defaultAva

  return (
    <div className={s.header}>
      <div className={s.logo}>
        <Logo />
      </div>
      {isLogin ? (
        <div className={s.userContainer}>
          <Dropdown
            align={'end'}
            trigger={
              <button className={s.button}>
                <div className={s.userName}>{user?.name}</div>
                <Avatar src={hasAvatar}>{children}</Avatar>
              </button>
            }
          >
            <DropdownItem>
              <DropdownItemWithIcon
                className={s.containerParagraph}
                icon={<Avatar src={hasAvatar}>{children}</Avatar>}
                text={user?.name || ''}
                textForEmail={user?.email}
              />
            </DropdownItem>
            <DropdownItemWithIcon icon={<Person />} text="My ProfilePage" />
            <DropdownItemWithIcon onClick={onLogout} icon={<LogoutSvg />} text="Sign Out" />
          </Dropdown>
        </div>
      ) : (
        <Button onClick={onLogin}> Sign In </Button>
      )}
    </div>
  )
}
