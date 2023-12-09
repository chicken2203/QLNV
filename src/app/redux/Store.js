// ** Redux Imports
import RootReducer from './RootReducer'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

const Store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    }).concat(logger)
  }
})

export { Store }
