import { configureStore } from '@reduxjs/toolkit'

import { authApi } from 'services/authApi'
import { decksApi } from 'services/decksApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [decksApi.reducerPath]: decksApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware).concat(decksApi.middleware),
})
