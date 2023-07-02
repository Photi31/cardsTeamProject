import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './typography.module.scss'
type VariantType =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'overline'
  | 'link1'
  | 'link2'

type ColorType = 'primary' | 'secondary' | 'inherit' | 'error' | 'link'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  variant: VariantType
  children?: ReactNode
  className?: string
  color?: ColorType
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
  const { variant = 'body1', className, as: Component = 'p', color = 'primary', ...rest } = props
  const clN = `${s[variant]} ${className ?? ''} ${s[color]}`

  return <Component className={clN} {...rest} />
}
