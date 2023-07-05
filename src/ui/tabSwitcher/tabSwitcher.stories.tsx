import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from './'

const list = ['My cards', 'All cards']
const list2 = ['My cards', 'All cards', 'Switcher', 'Tab']

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    className: { control: 'text' },
    defaultValue: { control: 'text' },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const TwoTab: Story = {
  args: {
    list,
  },
}
export const TabWithDefaultValueParam: Story = {
  args: {
    list: list2,
    defaultValue: 'Switcher',
  },
}

export const ControlledTab: Story = {
  render: () => {
    return <TabSwitcher list={list2} onValueChange={value => alert(value)} />
  },
  args: {
    title: 'Tab',
    list: list2,
  },
}

export const TabDisabled: Story = {
  args: {
    list,
    disabled: true,
  },
}
