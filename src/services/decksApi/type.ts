export type DecksType = {
  items: ItemType[]
  pagination: PaginationType
  maxCardsCount: number
}

export type ItemType = {
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

export type CreateDecksArgType = Pick<ItemType, 'name' | 'isPrivate' | 'cover'>
export type DeleteDecksArgType = Pick<ItemType, 'id'>
export type UpdateDecksArgType = {
  id: string
  body?: FormData
} & Partial<Pick<ItemType, 'name' | 'isPrivate' | 'cover'>>
