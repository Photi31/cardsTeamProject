import { CSSProperties, useState } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { Typography } from 'ui/typography'

type Props = {
  label?: string
  className?: string
  style?: CSSProperties
}

export const Slider = (props: Props & Omit<RadixSlider.SliderProps, keyof Props>) => {
  const { min = 0, max = 10, defaultValue, label, className, style, ...restProps } = props

  const [value, setValue] = useState<number[]>(defaultValue || [min, max])

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
        <input type="number" className={s.input} value={value[0]} readOnly />
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
        <input type="number" className={s.input} value={value[1]} readOnly />
      </div>
    </div>
  )
}
