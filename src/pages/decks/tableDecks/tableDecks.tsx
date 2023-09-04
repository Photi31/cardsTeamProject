import { useMemo, useState } from 'react'

import { Delete, Play, Redactor } from 'assets/icons'
import { useGetDecksQuery } from 'services/decksApi'
import { Button } from 'ui/button'
import { Sort, Table } from 'ui/tables'

import s from './tableDecks.module.scss'

type ConfigType = {
  title: string
  key: string
  sortable?: boolean
}

export const TableDecks = () => {
  const { data } = useGetDecksQuery()
  const [sort, setSort] = useState<Sort>(null)
  const sortString: string | null = sort ? `${sort?.key}-${sort?.direction}` : null

  const config: ConfigType[] = [
    { title: 'Name', key: 'name', sortable: true },
    { title: 'Cards', key: 'cardsCount', sortable: true },
    { title: 'Last Update', key: 'updated', sortable: true },
    { title: 'Created by', key: 'grade', sortable: true },
    { title: '', key: '', sortable: false },
  ]

  const sortedData = useMemo(() => {
    if (!sortString) {
      return data?.items
    }
    const [key, direction] = sortString.split('-')

    return [...data!.items].sort((a, b) => {
      if (direction === 'asc') {
        return a[key as keyof typeof a] > b[key as keyof typeof b] ? 1 : -1
      }

      return a[key as keyof typeof a] < b[key as keyof typeof b] ? 1 : -1
    })
  }, [sortString, data])

  const dataTable = sortedData?.map(el => (
    <Table.Row key={el.id}>
      <Table.Cell>
        <span className={s.packNameContainer}>
          {el.cover ? <img src={el.cover} alt="pack avatar" className={s.coverImage} /> : null}
          {el.name}
        </span>
      </Table.Cell>
      <Table.Cell>{el.cardsCount}</Table.Cell>
      <Table.Cell>{new Date(el.updated).toLocaleString()}</Table.Cell>
      <Table.Cell>{el.author.name}</Table.Cell>
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
  ))

  return (
    <Table.Root>
      <Table.Header columns={config} sort={sort} onSort={setSort} />
      <Table.Body>{dataTable}</Table.Body>
    </Table.Root>
  )
}
