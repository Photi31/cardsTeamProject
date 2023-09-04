export type DecksType = {
  items: ItemType[]
  pagination: PaginationType
  maxCardsCount: number
}

type ItemType = {
  author: AuthorType
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: string
  created: string
  updated: string
  cardsCount: number
}

type AuthorType = {
  id: string
  name: string
}

type PaginationType = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}
