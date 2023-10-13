import { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Delete, Play, Redactor } from 'assets/icons'
import ArrowBack from 'assets/icons/arrow-back'
import MoreVerticalOutline from 'assets/icons/more-vertical-outline'
import { Loader } from 'assets/loaders'
import { useMeQuery } from 'services/authApi'
import { UserType } from 'services/authApi/type'
import { useGetCardsQuery, useGetDeckQuery } from 'services/decksApi'
import { Button } from 'ui/button'
import { Dropdown, DropdownItemWithIcon } from 'ui/dropDown/dropdown'
import { Modal } from 'ui/modal'
import { Pagination } from 'ui/pagination'
import { Rating } from 'ui/rating'
import { Select } from 'ui/select'
import { Sort, Table } from 'ui/tables'
import { TextField } from 'ui/textField'
import { Typography } from 'ui/typography'

import s from './cards.module.scss'
import { CreateCard } from './create-card'
import { DeleteCard } from './delete-card'
import { UpdateCard } from './update-card'

type ConfigType = {
  title: string
  key: string
  sortable?: boolean
}

const config: ConfigType[] = [
  { title: 'Question', key: 'question', sortable: true },
  { title: 'Answer', key: 'answer', sortable: true },
  { title: 'Last Updated', key: 'updated', sortable: true },
  { title: 'Grade', key: 'grade', sortable: true },
  { title: '', key: '', sortable: false },
]

export const Cards = () => {
  const { deckId } = useParams()
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined)
  const [sort, setSort] = useState<Sort>(null)
  const [question, setQuestion] = useState<string | undefined>(undefined)
  const [searchText, setSearchText] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const orderBy = sort ? `${sort?.key}-${sort?.direction}` : undefined
  const cardsQuery = { deckId, itemsPerPage, currentPage, orderBy, question }

  const { data: me } = useMeQuery<{ data: UserType }>()
  const { data: deck, isLoading: isLoadingDeck } = useGetDeckQuery(deckId)
  const { data: cards, isLoading: isLoadingCards } = useGetCardsQuery(cardsQuery)

  const isMyDeck = me.id === (deck && deck.userId)
  const isEmptyDeck = !cards?.pagination.totalItems && !question

  useEffect(() => {
    if (searchText === null) return

    const timerId = setTimeout(() => {
      setQuestion(searchText)
    }, 500)

    return () => clearTimeout(timerId)
  }, [searchText])

  const handleSelectValueChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const onClearSearchInput = () => {
    setSearchText('')
  }

  const toggleModal = () => {
    setOpen(!open)
  }

  if (isLoadingCards || isLoadingDeck) return <Loader />

  return (
    <div className={s.container}>
      <Link to={'/decks'} className={s.backLink}>
        <ArrowBack />
        <Typography variant="link1" as="span">
          Back to Packs List
        </Typography>
      </Link>

      <div className={s.pageHeader}>
        <div>
          <Typography variant="large" as={'span'}>
            {deck?.name}
          </Typography>
          {isMyDeck && (
            <Dropdown align={'end'} trigger={<MoreVerticalOutline className={s.more} />}>
              <DropdownItemWithIcon
                // onClick={}
                icon={<Play />}
                text="Learn"
              />
              <DropdownItemWithIcon onClick={toggleModal} icon={<Redactor />} text="Edit" />
              <DropdownItemWithIcon
                // onClick={}
                icon={<Delete />}
                text="Delete"
              />
            </Dropdown>
          )}
        </div>

        <div>
          {!isEmptyDeck &&
            (isMyDeck ? <CreateCard deckId={deck?.id!} /> : <Button>Learn Deck</Button>)}
        </div>
      </div>

      {deck?.cover && (
        <div>
          <img src={deck?.cover} alt="deck cover" className={s.deckCover} />
        </div>
      )}

      {isEmptyDeck &&
        (isMyDeck ? (
          <div className={s.emptyPage}>
            <Typography variant="body1">
              This deck is empty. Click add new card to fill this deck
            </Typography>
            <CreateCard deckId={deck?.id!} />
          </div>
        ) : (
          <div className={s.emptyPage}>This deck is empty</div>
        ))}

      {!isEmptyDeck && (
        <>
          <div className={s.search}>
            <TextField
              className={s.searchInput}
              type={'search'}
              placeholder={`Search question`}
              onChange={e => setSearchText(e.currentTarget.value)}
              onClear={onClearSearchInput}
              value={searchText || ''}
            />
          </div>

          <Table.Root className={s.table}>
            <Table.Header columns={config} sort={sort} onSort={setSort} />
            <Table.Body>
              {cards?.items.map(el => (
                <Table.Row key={el.id}>
                  <Table.Cell>
                    {el.questionImg && <img src={el.questionImg} />} {el.question}
                  </Table.Cell>
                  <Table.Cell>
                    {el.answerImg && <img src={el.answerImg} />} {el.answer}
                  </Table.Cell>
                  <Table.Cell>{new Date(el.updated).toLocaleString()}</Table.Cell>
                  <Table.Cell className={s.rating}>
                    <Rating grade={el.grade} />
                  </Table.Cell>
                  <Table.Cell>
                    {isMyDeck && (
                      <>
                        <UpdateCard
                          cardId={el.id}
                          question={el.question}
                          answer={el.answer}
                          questionImg={el.questionImg || ''}
                          answerImg={el.answerImg || ''}
                        />
                        <DeleteCard cardId={el.id} cardsQuery={el} />
                      </>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          <div className={s.paginationContainer}>
            <Pagination
              onPageChange={handlePageChange}
              currentPage={cards?.pagination.currentPage!}
              pageSize={itemsPerPage}
              totalCount={cards?.pagination.totalItems!}
            />
            Показать
            <Select
              style={{ width: '50px' }}
              defaultValue={itemsPerPage.toString()}
              values={['1', '5', '10', '20', '30', '50', '100']}
              variant={'body2'}
              onValueChange={handleSelectValueChange}
            />
            на странице
          </div>
        </>
      )}
      <Modal showCloseButton={true} title={'Edit card'} open={open} onClose={toggleModal}>
        Edit card template
      </Modal>
    </div>
  )
}
