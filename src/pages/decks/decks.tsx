import { Delete } from 'assets/icons'
import { CreateNewPack } from 'pages/decks/create-new-pack'
import { useGetDecksQuery } from 'services/decksApi'
import { Button } from 'ui/button'
import { Pagination } from 'ui/pagination'
import { Select } from 'ui/select'
import { Slider } from 'ui/slider'
import { TabSwitcher } from 'ui/tabSwitcher'
import { TextField } from 'ui/textField'
import { Typography } from 'ui/typography'

import s from './decks.module.scss'
import { TableDecks } from './table-decks/table-decks'

export const Decks = () => {
  const { data } = useGetDecksQuery()
  const tabSwitcherTitles = ['My Cards', 'All Cards']

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
      <TableDecks />
      <div className={s.paginationContainer}>
        <Pagination
          onPageChange={() => {}}
          currentPage={data?.pagination.currentPage!}
          pageSize={10}
          totalCount={data?.pagination.totalItems!}
        />
        <div className={s.selectForCard}>
          Показать
          <Select
            style={{ width: '50px' }}
            defaultValue={'10'}
            values={['10', '20', '30', '40', '50']}
            variant={'body2'}
          />
          на странице
        </div>
      </div>
    </div>
  )
}
