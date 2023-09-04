import * as Tabs from '@radix-ui/react-tabs'
import clsx from 'clsx'

import { Typography } from '../typography'

import s from './tabSwitcher.module.scss'

export type TabSwitcherType = {
  className?: string
  disabled?: boolean
  list: string[]
  title?: string
  defaultValue?: string
  onValueChange: (value: string) => void
}

export const TabSwitcher = (props: TabSwitcherType) => {
  const { list, title, className, disabled = false, defaultValue = list[1], onValueChange } = props

  const changeValueHandler = (value: string) => {
    onValueChange(value)
  }

  const classNames = {
    container: clsx(s.container, className),
    root: s.root,
    list: s.list,
    trigger: clsx(s.trigger, disabled && s.disabled),
  }

  return (
    <div className={classNames.container}>
      <Typography variant="body1" className={s.label}>
        {title}
      </Typography>
      <Tabs.Root
        className={classNames.root}
        defaultValue={defaultValue}
        aria-label={title}
        onValueChange={changeValueHandler}
      >
        <Tabs.List className={classNames.list}>
          {list.map((el, i) => (
            <Tabs.Trigger key={i} className={classNames.trigger} value={el}>
              <Typography variant="body1" color="primary">
                {el}
              </Typography>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </div>
  )
}
