import { ChangeEvent, useState, useRef } from 'react'

import defaultAva from 'assets/icons/defaultAva.png'
import { Redactor } from 'assets/icons/redactor.tsx'
import { Button } from 'ui/button'
import { Card } from 'ui/card'
import { EditableSpan } from 'ui/editable-span'
import { Typography } from 'ui/typography'
import { Avatars } from 'ui/userAvatar/avatar.tsx'

import s from './personal-information.module.scss'

type Props = {
  email: string
  avatar?: string
  name: string
  onLogout?: () => void
  onAvatarChange?: (newAvatar: File) => void
  onNameChange?: (newName: string) => void
}

export const PersonalInformation = ({
  avatar,
  email,
  name,
  onAvatarChange,
  onNameChange,
  onLogout,
}: Props) => {
  const [newAvatar, setNewAvatar] = useState<string | undefined>(avatar)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleAvatarSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result as string

        setNewAvatar(result)
        if (onAvatarChange) {
          onAvatarChange(file)
        }
      }

      reader.readAsDataURL(file)
    }
  }
  const handleNameChanged = (name: string) => {
    if (onNameChange) {
      onNameChange(name)
    }
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  const hasAvatar = newAvatar || defaultAva
  const onClickChangeAvaHandler = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className={s.profileContainer}>
      <Typography variant="large" className={s.title}>
        Personal Information
      </Typography>
      <div className={s.photoContainer}>
        <div>
          <Avatars src={hasAvatar} />
          <Button variant="secondary" className={s.editAvatarButton}>
            <Redactor onClick={onClickChangeAvaHandler} />
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleAvatarSelected}
              className={s.inputPhoto}
            />
          </Button>
        </div>
      </div>
      <div>
        <EditableSpan
          name={name}
          email={email}
          handleLogout={handleLogout}
          onValueChange={handleNameChanged}
        />
      </div>
    </Card>
  )
}
