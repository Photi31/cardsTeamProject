import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'

import { ArrowDown } from 'assets/icons'

import { Typography } from '../typography'

import s from './select.module.scss'

type Props = {
  label?: string
  values: string[]
  variant?: 'body1' | 'body2'
  placeholder?: string
  className?: string
  style?: React.CSSProperties
}

export const Select = (props: Props & Omit<RadixSelect.SelectProps, keyof Props>) => {
  const {
    label,
    variant = 'body1',
    values,
    placeholder,
    disabled,
    className,
    style,
    ...restProps
  } = props

  const disabledClass = disabled ? s.disabled : undefined

  const items = values.map((value, idx) => {
    return (
      <RadixSelect.Item key={idx} value={value} className={s.item} data-variant={variant}>
        <RadixSelect.ItemText>
          <Typography variant={variant}>{value}</Typography>
        </RadixSelect.ItemText>
      </RadixSelect.Item>
    )
  })

  return (
    <div className={className} style={style}>
      {label && (
        <Typography variant={variant} className={s.label}>
          {label}
        </Typography>
      )}
      <RadixSelect.Root {...{ ...restProps, disabled }}>
        <RadixSelect.Trigger className={s.trigger} data-variant={variant}>
          <Typography as={'div'} variant={variant} className={disabledClass}>
            <RadixSelect.Value placeholder={placeholder} />
          </Typography>
          <ArrowDown className={clsx(s.icon, disabledClass)} />
        </RadixSelect.Trigger>
        <RadixSelect.Portal className={s.portal}>
          <RadixSelect.Content className={s.content} position="popper" avoidCollisions={false}>
            <RadixSelect.Viewport>{items}</RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  )
}
