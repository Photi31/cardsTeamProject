import { useState } from 'react'

import clsx from 'clsx'

import { Typography } from '../typography'

import s from './textField.module.scss'

import { Close } from 'assets/icons/close.tsx'
import { EyeSlash } from 'assets/icons/eye-slash.tsx'
import { Eye } from 'assets/icons/eye.tsx'
import { Search } from 'assets/icons/search.tsx'

export type TextFieldType = {
  className?: string
  type?: 'password' | 'search'
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
}

export const TextField = (props: TextFieldType) => {
  const { error, className, disabled = false, placeholder = 'Input', type = 'text', label } = props
  const [active, setActive] = useState<boolean>(false)
  const [isEye, setIsEye] = useState<boolean>(true)
  const Input = (type: string) => {
    switch (type) {
      case 'search': {
        return (
          <>
            <Search className={s.search} />
            <input
              disabled={disabled}
              className={classNames.input}
              placeholder={placeholder}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
            />
            {active && <Close className={s.close} />}
          </>
        )
      }
      case 'password': {
        return (
          <>
            <input
              disabled={disabled}
              type={isEye ? 'password' : 'text'}
              placeholder={placeholder}
              className={classNames.input}
            />
            {isEye ? (
              <Eye onClick={() => setIsEye(false)} />
            ) : (
              <EyeSlash onClick={() => setIsEye(true)} />
            )}
          </>
        )
      }
      default: {
        return (
          <>
            <input
              disabled={disabled}
              type={'text'}
              placeholder={placeholder}
              className={classNames.input}
            />
          </>
        )
      }
    }
  }

  const classNames = {
    container: clsx(s.container, className),
    wrapper: clsx(s.wrapper, disabled && s.disabled, error && s.error),
    label: clsx(s.label, disabled && s.disabled),
    error: s.error,
    input: clsx(s.input, error && s.error),
  }

  return (
    <div className={classNames.container}>
      <Typography variant={'body2'} as={'label'} className={classNames.label} color="inherit">
        {label && label}
        <Typography variant={'body1'}>
          <div className={classNames.wrapper}>{Input(type)}</div>
        </Typography>
        {error && <div className={s.error}>{error}</div>}
      </Typography>
    </div>
  )
}
