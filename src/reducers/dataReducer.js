import { createSlice } from '@reduxjs/toolkit'
import { getTopicsByUserInfo, getCategoryData, getTopicsByCategories } from '../services/healthInfo'

const dataSlice = createSlice({
  name: 'data',
  initialState: { user: null, categories: null, topics: null },
  reducers: {
    setData(state, action) {
      return { ...state, user: action.payload }
    },
    setCategories(state, action) {
      console.log({ ...state, categories: action.payload })
      return { ...state, categories: action.payload }
    },
    setTopics(state, action) {
      return { ...state, topics: action.payload }
    }
  }
})

export default dataSlice.reducer
export const { setData, setCategories, setTopics } = dataSlice.actions

export const getDataWithUserInfo = (request) => {
  return async (dispatch) => {
    const result = await getTopicsByUserInfo(request)
    dispatch(setData(result))
  }
}

export const getDataWithCategories = (categoryString) => {
  return async (dispatch) => {
    const result = await getTopicsByCategories(categoryString)
    console.log(result)
    dispatch(setData(result))
  }
}

export const setCategoryData = () => {
  return async (dispatch) => {
    const categoryArray = await getCategoryData()
    dispatch(setCategories(categoryArray))
  }
}