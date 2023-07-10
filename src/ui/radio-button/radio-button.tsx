import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import { Typography } from 'ui/typography'

import s from './radio-button.module.scss'

type Props = {
  label?: string
  className?: string
  style?: CSSProperties
  disabled?: boolean
}

export const RadioButton = (
  props: Props & Omit<ComponentPropsWithoutRef<'input'>, keyof Props | 'type'>
) => {
  const { label, disabled, className, style, ...restProps } = props

  return (
    <label
      className={clsx(disabled ? s.disabled : undefined, className) || undefined}
      style={style}
    >
      <input type="radio" className={s.radio} disabled={disabled} {...restProps} />
      <Typography as="span" variant="body2">
        {label}
      </Typography>
    </label>
  )
}
