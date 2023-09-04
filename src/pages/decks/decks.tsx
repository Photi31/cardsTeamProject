import { Delete } from 'assets/icons'
import { TableDecks } from 'pages/decks/tableDecks/tableDecks.tsx'
import { useGetDecksQuery } from 'services/decksApi'
import { Button } from 'ui/button'
import { Pagination } from 'ui/pagination'
import { Select } from 'ui/select'
import { Slider } from 'ui/slider'
import { TabSwitcher } from 'ui/tabSwitcher'
import { TextField } from 'ui/textField'
import { Typography } from 'ui/typography'

import s from './decks.module.scss'

export const Decks = () => {
  const { data } = useGetDecksQuery()
  const tabSwitcherTitles = ['My Cards', 'All Cards']

  return (
    <div className={s.decksContainer}>
      <div className={s.pagHeader}>
        <Typography variant={'large'}> LOL </Typography>
        <Button>Add New Pack</Button>
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
      <TableDecks />
      <div className={s.paginationContainer}>
        <Pagination
          onPageChange={() => {}}
          currentPage={data?.pagination.currentPage as number}
          pageSize={10}
          totalCount={data?.pagination.totalItems as number}
        />
        <div className={s.selectForCard}>
          Показать
          <Select
            defaultValue={'10'}
            style={{ width: '50px' }}
            values={['10', '20', '30', '40', '50']}
            variant={'body2'}
          />
          на странице
        </div>
      </div>
    </div>
  )
}
