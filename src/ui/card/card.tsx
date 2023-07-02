import { ReactNode } from 'react'

import s from './card.module.scss'

export type CardType = {
  children?: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardType) => {
  return <div className={s.card + ' ' + `${className ?? ''}`}>{children}</div>
}
