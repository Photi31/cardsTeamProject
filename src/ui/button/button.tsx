import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  children?: ReactNode
  as?: T
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  onClick: () => void
} & ComponentPropsWithoutRef<'button'>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    className,
    as: Component = 'button',
    onClick,
    children,
    ...rest
  } = props

  return (
    <Component
      onClick={onClick}
      className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </Component>
  )
}
