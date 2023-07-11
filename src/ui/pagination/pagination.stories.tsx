import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '.'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: { onPageChange: { action: 'page' } },
  args: { currentPage: 1, pageSize: 10, totalCount: 200 },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Controlled: Story = {
  args: {},
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <Pagination
        currentPage={currentPage}
        pageSize={10}
        totalCount={200}
        onPageChange={page => setCurrentPage(page)}
      />
    )
  },
}
