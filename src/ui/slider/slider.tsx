import { ChangeEvent, CSSProperties, useEffect, useState } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import { Typography } from 'ui/typography'

import s from './slider.module.scss'

type Props = {
  label?: string
  className?: string
  style?: CSSProperties
  onInputValueChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Slider = (props: Props & Omit<RadixSlider.SliderProps, keyof Props>) => {
  const {
    min = 0,
    max = 10,
    onInputValueChange,
    defaultValue,
    label,
    className,
    style,
    ...restProps
  } = props

  const [value, setValue] = useState<number[]>(defaultValue || [min, max])

  useEffect(() => {
    setValue(defaultValue || [min, max])
  }, [defaultValue, min, max])

  const handleOnValueChange = (value: number[]) => {
    setValue(value)
  }

  return (
    <div className={className} style={style}>
      {label && (
        <Typography variant="body1" className={s.label}>
          {label}
        </Typography>
      )}
      <div className={s.slider}>
        <input
          type="number"
          name={'value1'}
          onChange={onInputValueChange}
          className={s.input}
          min={min}
          value={value[0]}
        />
        <RadixSlider.Root
          className={s.root}
          defaultValue={defaultValue}
          onValueChange={handleOnValueChange}
          min={min}
          max={max}
          {...restProps}
        >
          <RadixSlider.Track className={s.track}>
            <RadixSlider.Range className={s.range} />
          </RadixSlider.Track>
          <RadixSlider.Thumb className={s.thumb} />
          <RadixSlider.Thumb className={s.thumb} />
        </RadixSlider.Root>
        <input
          type="number"
          max={max}
          onChange={onInputValueChange}
          name={'value2'}
          className={s.input}
          value={value[1]}
        />
      </div>
    </div>
  )
}
