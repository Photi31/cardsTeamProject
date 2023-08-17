import { ChangeEvent, useRef } from 'react'

import { ChangePhoto } from 'assets/icons'
import { Button } from 'ui/button'

import s from './upload-photo.module.scss'

type Props = {
  onAvatarChange: (newAvatar: string) => void
  // setNewAvatar: (url: string) => void
}

export const UploadPhoto = ({ onAvatarChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleAvatarSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result as string

        onAvatarChange(result)
        // setNewAvatar(result)
      }

      reader.readAsDataURL(file)
    }
  }

  const onClickChangeAvatarHandler = () => {
    fileInputRef.current?.click()
  }

  return (
    <Button variant="secondary" className={s.editAvatarButton}>
      <ChangePhoto onClick={onClickChangeAvatarHandler} />
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleAvatarSelected}
        className={s.inputPhoto}
      />
    </Button>
  )
}
