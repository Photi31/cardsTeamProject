import { configureStore } from '@reduxjs/toolkit'

import { authApi } from 'services/authApi'
import { cardsApi } from 'services/cardsApi'
import { decksApi } from 'services/decksApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [decksApi.reducerPath]: decksApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(decksApi.middleware)
      .concat(cardsApi.middleware),
})
