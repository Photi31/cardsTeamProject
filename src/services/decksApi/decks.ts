import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from 'services/common/base-query-with-reauth.ts'
import {
  CardsType,
  CreateCardArgType,
  DecksQueryType,
  DecksType,
  DeleteDecksArgType,
  GetCardsArgType,
  ItemType,
  ResponseCreateCardType,
  UpdateDecksArgType,
} from 'services/decksApi/type.ts'

export const decksApi = createApi({
  reducerPath: 'decksApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Decks', 'Cards', 'Deck'],
  endpoints: build => ({
    getDecks: build.query<DecksType | null, DecksQueryType>({
      query: params => ({
        url: 'v1/decks',
        method: 'GET',
        params,
      }),
      providesTags: ['Decks'],
    }),
    createDecks: build.mutation<ItemType, FormData>({
      query: body => ({
        url: 'v1/decks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Decks'],
    }),
    deleteDecks: build.mutation<ItemType, DeleteDecksArgType>({
      query: body => {
        const { id } = body

        return {
          url: `v1/decks/${id}`,
          method: 'DELETE',
          body,
        }
      },
      invalidatesTags: ['Decks'],
    }),
    updateDecks: build.mutation<ItemType, UpdateDecksArgType>({
      query: data => {
        const { id, body } = data

        return {
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: ['Decks'],
    }),
    getCards: build.query<CardsType, GetCardsArgType>({
      query: queryParams => {
        const { deckId, ...params } = queryParams

        return {
          url: `v1/decks/${deckId}/cards`,
          method: 'GET',
          params,
        }
      },
      providesTags: ['Cards'],
    }),
    getDeck: build.query<ItemType, string | undefined>({
      query: deckId => {
        return {
          url: `v1/decks/${deckId}`,
          method: 'GET',
        }
      },
      providesTags: ['Deck'],
    }),
    createCard: build.mutation<ResponseCreateCardType, CreateCardArgType>({
      query: queryParams => {
        const { deckId, body } = queryParams

        return {
          url: `v1/decks/${deckId}/cards`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const {
  useGetDecksQuery,
  useUpdateDecksMutation,
  useDeleteDecksMutation,
  useCreateDecksMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useCreateCardMutation,
} = decksApi
