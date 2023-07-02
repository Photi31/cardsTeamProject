import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from './'

const list = ['My cards', 'All cards']
const list2 = ['My cards', 'All cards', 'Switcher', 'Tab']

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Tab: Story = {
  args: {
    list,
  },
}
export const TabWithDefaultValueParametr: Story = {
  args: {
    list: list2,
    defaultValue: 2,
  },
}
export const TabDisabled: Story = {
  args: {
    list,
    disabled: true,
  },
}
