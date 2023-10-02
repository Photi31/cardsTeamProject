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

export type CardsType = {
  pagination: PaginationType
  items: CardType[]
}

type CardType = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
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

export type GetCardsArgType = {
  deckId?: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type CreateDecksArgType = Pick<ItemType, 'name' | 'isPrivate' | 'cover'>
export type DeleteDecksArgType = Pick<ItemType, 'id'>
export type UpdateDecksArgType = {
  id: string
  body?: FormData
} & Partial<Pick<ItemType, 'name' | 'isPrivate' | 'cover'>>
