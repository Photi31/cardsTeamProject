import defaultAva from 'assets/icons/defaultAva.png'
import { Card } from 'ui/card'
import { EditableSpan } from 'ui/editable-span'
import { Typography } from 'ui/typography'
import { UploadPhoto } from 'ui/upload-photo'
import { Avatars as Avatar } from 'ui/userAvatar/avatar.tsx'

import s from './personal-information.module.scss'

type Props = {
  email: string | null
  avatar: string | null
  name: string | null
  onLogout: () => void
  onAvatarChange: (newAvatar: File) => void
  onNameChange: (newName: string) => void
}

export const PersonalInformation = ({
  avatar,
  email,
  name,
  onAvatarChange,
  onNameChange,
  onLogout,
}: Props) => {
  const handleNameChanged = (name: string) => onNameChange(name)

  const handleAvatarChange = (newAvatar: File) => onAvatarChange(newAvatar)

  const handleLogout = () => onLogout()

  const hasAvatar = avatar || defaultAva

  return (
    <Card className={s.profileContainer}>
      <Typography variant="large" className={s.title}>
        Personal Information
      </Typography>
      <div className={s.photoContainer}>
        <div>
          <Avatar src={hasAvatar} />
          <UploadPhoto onAvatarChange={handleAvatarChange} />
        </div>
      </div>
      <EditableSpan
        name={name!}
        email={email!}
        handleLogout={handleLogout}
        onValueChange={handleNameChanged}
      />
    </Card>
  )
}
