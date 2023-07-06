import { ReactNode } from 'react'

import * as Avatar from '@radix-ui/react-avatar'

type AvatarProps = {
  src?: string
  alt?: string
  children?: ReactNode
}
export const Avatars = ({ src, alt, children }: AvatarProps) => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Avatar.Root className="AvatarRoot">
      <Avatar.Image className="AvatarImage" src={src} />
      <Avatar.Fallback className="AvatarFallback" delayMs={600}>
        {alt}
      </Avatar.Fallback>
      {children}
    </Avatar.Root>
  </div>
)
