import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const variantOptions = ['large', 'h1', 'h2', 'h3', 'body1', 'body2', , , , , , 'link2']
const colorOptions = ['primary', 'secondary', 'inherit', 'link', 'error']

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: variantOptions,
      control: { type: 'radio' },
    },
    color: {
      options: colorOptions,
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: 'large',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const H1: Story = {
  args: {
    variant: 'h1',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const H2: Story = {
  args: {
    variant: 'h2',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const H3: Story = {
  args: {
    variant: 'h3',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const Body1: Story = {
  args: {
    variant: 'body1',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const Body2: Story = {
  args: {
    variant: 'body2',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const CaptionWithError: Story = {
  args: {
    variant: 'caption',
    color: 'error',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const Overline: Story = {
  args: {
    variant: 'overline',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const Link1: Story = {
  args: {
    variant: 'link1',
    color: 'link',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
export const Link2: Story = {
  args: {
    variant: 'link2',
    color: 'link',
    children: (
      <>
        Carosserie Test Zürich <br /> Stauffacherstrasse 31 <br /> 8004 Zürich, ZH, CH
      </>
    ),
  },
}
