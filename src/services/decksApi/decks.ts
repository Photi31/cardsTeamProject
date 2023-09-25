import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from 'services/common/base-query-with-reauth.ts'
import {
  DecksType,
  DeleteDecksArgType,
  ItemType,
  UpdateDecksArgType,
} from 'services/decksApi/type.ts'

export const decksApi = createApi({
  reducerPath: 'decksApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Decks'],
  endpoints: build => ({
    getDecks: build.query<DecksType | null, void>({
      query: () => ({
        url: 'v1/decks',
        method: 'GET',
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
  }),
})

export const {
  useGetDecksQuery,
  useUpdateDecksMutation,
  useDeleteDecksMutation,
  useCreateDecksMutation,
} = decksApi
