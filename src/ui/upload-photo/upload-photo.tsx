import { ChangeEvent, useRef } from 'react'

import { ChangePhoto } from 'assets/icons'
import { Button } from 'ui/button'

import s from './upload-photo.module.scss'

type Props = {
  onAvatarChange: (newAvatar: File) => void
}

export const UploadPhoto = ({ onAvatarChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleAvatarSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      onAvatarChange(file)
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
