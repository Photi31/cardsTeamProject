import { ChangeEvent, useRef } from 'react'

import { Redactor } from 'assets/icons/redactor.tsx'
import { Button } from 'ui/button'

import s from './upload-photo.module.scss'

type Props = {
  onAvatarChange: (newAvatar: File) => void
  setNewAvatar: (url: string) => void
}

export const UploadPhoto = ({ onAvatarChange, setNewAvatar }: Props) => {
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

  const onClickChangeAvaHandler = () => {
    fileInputRef.current?.click()
  }

  return (
    <Button variant="secondary" className={s.editAvatarButton}>
      <Redactor onClick={onClickChangeAvaHandler} />
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleAvatarSelected}
        className={s.inputPhoto}
      />
    </Button>
  )
}
