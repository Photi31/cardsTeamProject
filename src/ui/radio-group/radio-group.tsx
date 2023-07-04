import { CSSProperties, ChangeEvent } from 'react'

import s from './radio-group.module.scss'

import { RadioButton } from 'ui/radio-button'

type Props = {
  options: string[]
  groupName: string
  disabled?: boolean
  className?: string
  style?: CSSProperties
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const RadioGroup = (props: Props) => {
  const { options, groupName, disabled, className, style, onChange } = props

  return (
    <div className={className} style={style}>
      {options.map((el, index) => (
        <RadioButton
          key={index}
          value={index + 1}
          label={el}
          name={groupName}
          disabled={disabled}
          className={s.radio}
          onChange={onChange}
        />
      ))}
    </div>
  )
}
