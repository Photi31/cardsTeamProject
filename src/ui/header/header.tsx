import { ReactNode } from 'react'

import { Logo } from 'assets/icons'
import { Button } from 'ui/button'
import { Avatars as Avatar } from 'ui/userAvatar/avatar.tsx'

import s from './header.module.scss'

export type User = {
  name: string
  avatar?: string
}

interface HeaderProps {
  user?: User
  onLogin?: () => void
  onLogout?: () => void
  isLogin?: boolean
  children?: ReactNode
}

export const Header = ({ user, onLogin, children, isLogin }: HeaderProps) => {
  return (
    <div className={s.header}>
      <div className={s.logo}>
        <Logo />
      </div>
      {isLogin ? (
        <div className={s.userContainer}>
          <div className={s.userName}>{user?.name}</div>
          <Avatar src={user?.avatar}>{children}</Avatar>
        </div>
      ) : (
        <Button onClick={onLogin}> Sign In </Button>
      )}
    </div>
  )
}
