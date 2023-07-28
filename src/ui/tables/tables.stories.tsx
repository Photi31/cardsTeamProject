import { useMemo, useState } from 'react'

import { Meta } from '@storybook/react'

import { Delete, Play } from 'assets/icons'
import { Redactor } from 'assets/icons/redactor.tsx'
import { Button } from 'ui/button'

import { Typography } from '../typography'

import s from './tables.module.scss'

import { Column, Sort, Table } from './'

export default {
  title: 'Components/Table',
  component: Table.Root,
  tags: ['autodocs'],
} as Meta<typeof Table.Root>

export const Default = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell align="center">Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Creat by</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>React</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>18.03.2023</Table.Cell>
            <Table.Cell>
              <Typography
                as={'a'}
                variant={'link1'}
                href="https://it-incubator.io/"
                target="_blank"
              >
                it-incubator
              </Typography>
            </Table.Cell>
            <Table.Cell>
              <div className={s.buttonContainer}>
                <Button variant="link" className={s.editAvatarButton}>
                  <Play />
                </Button>
                <Button variant="link" className={s.editAvatarButton}>
                  <Redactor />
                </Button>
                <Button variant="link" className={s.editAvatarButton}>
                  <Delete />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Java Script</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>12.03.2023</Table.Cell>
            <Table.Cell>it-incubator</Table.Cell>
            <Table.Cell>
              <div className={s.buttonContainer}>
                <Button variant="link">
                  <Play />
                </Button>
                <Button variant="link">
                  <Redactor />
                </Button>
                <Button variant="link">
                  <Delete />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
}
export const WithSort = {
  render: (args: any) => {
    const [sort, setSort] = useState<Sort>(null)
    const sortString: string | null = sort ? `${sort?.key}-${sort?.direction}` : null

    const columns: Column[] = [
      {
        key: 'title',
        title: 'Name',
        sortable: true,
      },
      {
        key: 'cardsCount',
        title: 'Cards',
        sortable: true,
      },
      {
        key: 'updated',
        title: 'Last Updated',
        sortable: true,
      },
      {
        key: 'createdBy',
        title: 'Created by',
        sortable: true,
      },
      {
        key: 'options',
        title: '',
      },
    ]
    const data1 = [
      {
        title: 'Project A',
        cardsCount: 10,
        updated: '2023-07-07',
        createdBy: 'John Doe',
      },
      {
        title: 'Project B',
        cardsCount: 5,
        updated: '2023-07-06',
        createdBy: 'Jane Smith',
      },
      {
        title: 'Project C',
        cardsCount: 8,
        updated: '2023-07-05',
        createdBy: 'Alice Johnson',
      },
      {
        title: 'Project D',
        cardsCount: 3,
        updated: '2023-07-07',
        createdBy: 'Bob Anderson',
      },
      {
        title: 'Project E',
        cardsCount: 12,
        updated: '2023-07-04',
        createdBy: 'Emma Davis',
      },
    ]
    const sortedData = useMemo(() => {
      if (!sortString) {
        return data1
      }
      const [key, direction] = sortString.split('-')

      return [...data1].sort((a, b) => {
        if (direction === 'asc') {
          return a[key as keyof typeof a] > b[key as keyof typeof b] ? 1 : -1
        }

        return a[key as keyof typeof a] < b[key as keyof typeof b] ? 1 : -1
      })
    }, [sortString])

    return (
      <Table.Root {...args}>
        <Table.Header columns={columns} onSort={setSort} sort={sort} />
        <Table.Body>
          {sortedData.map(item => (
            <Table.Row key={item.title}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>{item.createdBy}</Table.Cell>
              <Table.Cell>
                <div className={s.buttonContainer}>
                  <Button variant="link" className={s.editAvatarButton}>
                    <Play />
                  </Button>
                  <Button variant="link" className={s.editAvatarButton}>
                    <Redactor />
                  </Button>
                  <Button variant="link" className={s.editAvatarButton}>
                    <Delete />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    )
  },
}
export const Empty = {
  render: () => <Table.Empty />,
}
