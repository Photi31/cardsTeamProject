import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './checkBox.tsx'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      options: [true, false],
      control: { type: 'checkBox' },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [checked, setChecked] = useState(true)
    const [checked2, setChecked2] = useState(true)

    return (
      <>
        <span style={{ display: 'flex', backgroundColor: 'black' }}>
          <Checkbox {...args} checked={checked} onChange={setChecked} />
          <Checkbox {...args} checked={false} onChange={setChecked} />
        </span>
        <span style={{ display: 'flex', gap: '25px', backgroundColor: 'black' }}>
          <Checkbox {...args} label={'Check-box'} checked={checked2} onChange={setChecked2} />
          <Checkbox {...args} label={'Check-box'} checked={false} onChange={setChecked} />
        </span>
      </>
    )
  },
  args: {
    checked: true,
    disabled: false,
  },
}

export const Disable: Story = {
  render: args => {
    const [checked, setChecked] = useState(true)
    const [checked2, setChecked2] = useState(true)

    return (
      <>
        <span style={{ display: 'flex' }}>
          <Checkbox {...args} disabled={true} checked={checked} onChange={setChecked} />
          <Checkbox {...args} disabled={true} checked={false} onChange={setChecked} />
        </span>
        <span style={{ display: 'flex', gap: '25px' }}>
          <Checkbox
            {...args}
            disabled={true}
            checked={checked2}
            label={'Check-box'}
            onChange={setChecked2}
          />
          <Checkbox
            {...args}
            disabled={true}
            checked={false}
            label={'Check-box'}
            onChange={setChecked}
          />
        </span>
      </>
    )
  },
  args: {
    checked: true,
    disabled: true,
  },
}
