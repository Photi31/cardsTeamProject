import { GetCardsArgType } from 'services/decksApi/type'

export type Card = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  questionImg: any
  answerImg: any
  answerVideo: any
  questionVideo: any
  comments: any
  type: any
  rating: number
  moreId: any
  created: string
  updated: string
}

export type UpdateCardArgType = {
  cardId: string
  body: FormData
}

export type DeleteCardType = {
  cardId: string
} & GetCardsArgType
