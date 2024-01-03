import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import dataReducer from './dataReducer'
import navigationReducer from './navigationReducer'

const store = configureStore({
  reducer: {
    'user': userReducer,
    'data': dataReducer,
    'navigation': navigationReducer
  }
})

export default store