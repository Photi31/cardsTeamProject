import { createApi } from '@reduxjs/toolkit/query/react'

import { Card, CardQueryType } from 'services/cardsApi/type.ts'
import { baseQueryWithReauth } from 'services/common/base-query-with-reauth.ts'
import { decksApi } from 'services/decksApi'

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    getCard: build.query<Card, string>({
      query: cardId => ({
        url: `v1/cards/${cardId}`,
        method: 'GET',
      }),
    }),
    updateCard: build.mutation<any, CardQueryType>({
      query: cardQuery => {
        const { cardId, ...body } = cardQuery

        return {
          url: `v1/cards/${cardId}`,
          method: 'PATCH',
          body,
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(decksApi.util.invalidateTags(['Cards']))
      },
    }),
    deleteCard: build.mutation<any, string>({
      query: cardId => {
        return {
          url: `v1/cards/${cardId}`,
          method: 'DELETE',
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(decksApi.util.invalidateTags(['Cards']))
      },
    }),
  }),
})

export const { useGetCardQuery, useUpdateCardMutation, useDeleteCardMutation } = cardsApi
