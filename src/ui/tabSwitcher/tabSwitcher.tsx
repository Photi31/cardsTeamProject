import * as Tabs from '@radix-ui/react-tabs'
import clsx from 'clsx'

import { Typography } from '../typography'

import s from './tabSwitcher.module.scss'

export type TabSwitcherList = string[]

export type TabSwitcherType = {
  className?: string
  disabled?: boolean
  list: TabSwitcherList
  title?: string
  defaultValue?: number
}

export const TabSwitcher = (props: TabSwitcherType) => {
  const { list, defaultValue = 1, title, className, disabled = false } = props

  const classNames = {
    container: clsx(s.container, className),
    root: s.root,
    list: s.list,
    trigger: clsx(s.trigger, disabled && s.disabled),
  }

  if (list.length > 0) {
    return (
      <div className={classNames.container}>
        <Typography variant="body2" className={s.title}>
          {title}
        </Typography>
        <Tabs.Root className={classNames.root} defaultValue={list[defaultValue]}>
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
  } else {
    return <div className={classNames.container}>Упс... 🧐 Что-то пошло не так!</div>
  }
}
