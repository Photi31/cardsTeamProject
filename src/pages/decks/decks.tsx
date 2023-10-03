import { useState } from 'react'

import { Link } from 'react-router-dom'

import { Delete, Play } from 'assets/icons'
import { CreateNewPack } from 'pages/decks/create-new-pack'
import { DeletePack } from 'pages/decks/delete-pack'
import { UpdatePack } from 'pages/decks/update-pack'
import { useMeQuery } from 'services/authApi'
import { UserType } from 'services/authApi/type.ts'
import { useGetDecksQuery } from 'services/decksApi'
import { Button } from 'ui/button'
import { Pagination } from 'ui/pagination'
import { Select } from 'ui/select'
import { Slider } from 'ui/slider'
import { Sort, Table } from 'ui/tables'
import { TabSwitcher } from 'ui/tabSwitcher'
import { TextField } from 'ui/textField'
import { Typography } from 'ui/typography'

import s from './decks.module.scss'

type ConfigType = {
  title: string
  key: string
  sortable?: boolean
}

const config: ConfigType[] = [
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Cards', key: 'cardsCount', sortable: true },
  { title: 'Last Update', key: 'updated', sortable: true },
  { title: 'Created by', key: 'grade', sortable: true },
  { title: '', key: '', sortable: false },
]

export const Decks = () => {
  const [sort, setSort] = useState<Sort>(null)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined)
  const orderBy: string | undefined = sort ? `${sort?.key}-${sort?.direction}` : undefined

  const decksQuery = { currentPage, itemsPerPage, orderBy }

  const { data: meData } = useMeQuery<{ data: UserType }>()
  const { data: decks } = useGetDecksQuery(decksQuery)

  const tabSwitcherTitles = ['My Cards', 'All Cards']

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSelectValueChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const dataTable = decks?.items.map(el => (
    <Table.Row key={el.id}>
      <Table.Cell>
        <div className={s.packNameContainer}>
          <Link to={`/cards/${el.id}`}>
            {el.cover ? <img src={el.cover} alt="pack avatar" className={s.coverImage} /> : null}
            {el.name}
          </Link>
        </div>
      </Table.Cell>
      <Table.Cell>{el.cardsCount}</Table.Cell>
      <Table.Cell>{new Date(el.updated).toLocaleString()}</Table.Cell>
      <Table.Cell>{el.author.name}</Table.Cell>
      <Table.Cell>
        <div className={s.buttonContainer}>
          <Button variant="link">
            <Play />
          </Button>
          {el.author.id === meData?.id && (
            <UpdatePack id={el.id} isPrivate={el.isPrivate} name={el.name} />
          )}
          {el.author.id === meData?.id && <DeletePack id={el.id} name={el.name} />}
        </div>
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <div className={s.decksContainer}>
      <div className={s.pagHeader}>
        <Typography variant={'large'}> Packs list </Typography>
        <CreateNewPack />
      </div>
      <div className={s.instrumentContainer}>
        <TextField className={s.searchInput} type={'search'} placeholder={`search pack`} />
        <TabSwitcher
          title={'Show packs cards'}
          className={s.tabSwitchCard}
          list={tabSwitcherTitles}
          onValueChange={() => {}}
        />
        <Slider
          defaultValue={[0, 20]}
          min={0}
          max={20}
          className={s.sliderForCard}
          label={'Number of cards'}
        />
        <Button className={s.deleteButton} variant={'secondary'}>
          <Delete /> Clear filter
        </Button>
      </div>
      <Table.Root>
        <Table.Header columns={config} sort={sort} onSort={setSort} />
        <Table.Body>{dataTable}</Table.Body>
      </Table.Root>
      <div className={s.paginationContainer}>
        <Pagination
          onPageChange={handlePageChange}
          currentPage={decks?.pagination.currentPage!}
          pageSize={itemsPerPage}
          totalCount={decks?.pagination.totalItems!}
        />
        <div className={s.selectForCard}>
          Показать
          <Select
            style={{ width: '50px' }}
            defaultValue={itemsPerPage.toString()}
            values={['10', '20', '30', '40', '50']}
            variant={'body2'}
            onValueChange={handleSelectValueChange}
          />
          на странице
        </div>
      </div>
    </div>
  )
}
