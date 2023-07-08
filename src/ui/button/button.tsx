import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

import { Typography } from 'ui/typography'

export type ButtonProps<T extends ElementType = 'button'> = {
  children?: ReactNode
  as?: T
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  onClick?: () => void
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

  const classNames = clsx(s[variant], fullWidth && s.fullWidth, className)

  return (
    <Typography
      as="div"
      variant={Component === 'a' ? 'subtitle1' : 'subtitle2'}
      color={variant === 'link' || variant === 'tertiary' ? 'secondary' : 'primary'}
    >
      <Component onClick={onClick} className={classNames} {...rest}>
        {children}
      </Component>
    </Typography>
  )
}
