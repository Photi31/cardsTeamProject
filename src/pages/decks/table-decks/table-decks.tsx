import { useMemo, useState } from 'react'

import { Play, Redactor } from 'assets/icons'
import { DeletePack } from 'pages/decks/delete-pack'
import s from 'pages/decks/table-decks/table-decks.module.scss'
import { useMeQuery } from 'services/authApi'
import { UserType } from 'services/authApi/type.ts'
import { useGetDecksQuery } from 'services/decksApi'
import { Button } from 'ui/button'
import { Sort, Table } from 'ui/tables'

type ConfigType = {
  title: string
  key: string
  sortable?: boolean
}

export const TableDecks = () => {
  const { data } = useGetDecksQuery()
  const { data: meData } = useMeQuery<{ data: UserType }>()
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

  // @ts-ignore
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
          {el.author.id === meData?.id && <DeletePack id={el.id} name={el.name} />}
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
