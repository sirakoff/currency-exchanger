import { configureStore } from '@reduxjs/toolkit'
import exchangeSlice from './reducers/exchangeSlice'

const store = configureStore({
  reducer: {
    exchange: exchangeSlice
  },
})


export type RootState = ReturnType<typeof store.getState>
export type ExchangeDispatch = typeof store.dispatch

export {store}