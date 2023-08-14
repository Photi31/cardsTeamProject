import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

import { authApi } from 'services/auth'

const mutex = new Mutex()
// const baseQuery = fetchBaseQuery({
//   baseUrl: 'https://api.flashcards.andrii.es/',
//   credentials: 'include',
// })

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.flashcards.andrii.es/',
  credentials: 'include',
  prepareHeaders: headers => {
    headers.append('x-short-access-token', 'true')
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            url: 'v1/auth/refresh-token',
            method: 'POST',
          },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          // api.dispatch(tokenReceived(refreshResult.data))
          authApi.util?.invalidateTags(['Me'])
          result = await baseQuery(args, api, extraOptions)
        } else {
          console.log('logout')
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
