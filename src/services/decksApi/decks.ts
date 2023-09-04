import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from 'services/common/base-query-with-reauth.ts'
import { DecksType } from 'services/decksApi/type.ts'

export const decksApi = createApi({
  reducerPath: 'decksApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Decks'],
  endpoints: build => ({
    getDecks: build.query<DecksType | null, void>({
      query: () => ({
        url: 'v1/decks',
      }),
      providesTags: ['Decks'],
    }),
  }),
})

export const { useGetDecksQuery } = decksApi
