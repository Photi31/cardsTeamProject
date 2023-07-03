import { ReactNode } from 'react'

import s from './card.module.scss'

export type CardType = {
  className?: string
  children?: ReactNode
}

export const Card = ({ className, ...rest }: CardType) => {
  return <div className={s.card + ' ' + `${className ?? ''}`} {...rest} />
}
