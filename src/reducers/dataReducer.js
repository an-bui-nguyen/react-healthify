import { createSlice } from '@reduxjs/toolkit'
import { getTopicsByUserInfo, getTopicsByCategories } from '../services/healthInfo'

const dataSlice = createSlice({
  name: 'data',
  initialState: { user: null, categories: null, dataToDisplay: null },
  reducers: {
    setData(state, action) {
      return { ...state, user: action.payload }
    },
    setSubCategories(state, action) {
      console.log({ ...state, categories: action.payload })
      return { ...state, categories: action.payload }
    },
    filterData(state, action) {
      const categories = action.payload
      const filteredTopics = state.user.filter((topic) => topic.Categories.some(r => categories.includes(r)))
      console.log(filteredTopics)
      return { ...state, dataToDisplay: filteredTopics }
    },
    setDataToDisplay(state, action) {
      return { ...state, dataToDisplay: action.payload }
    }
  }
})

export default dataSlice.reducer
export const { setData, setSubCategories, setDataToDisplay, filterData } = dataSlice.actions

/**
 * Redux action creator function to handle API request and set result data into redux store.
 * @param {*} request user inputed age sex smoke sexually active and pregnancy
 * @returns action creator
 */
export const getDataWithUserInfo = (request) => {
  return async (dispatch) => {
    const { result, subCategories } = await getTopicsByUserInfo(request)
    console.log(result)
    dispatch(setData(result))
    dispatch(setSubCategories(subCategories))
    dispatch(setDataToDisplay(result))
  }
}

export const getDataWithCategories = (categoryString) => {
  return async (dispatch) => {
    const { result, subCategories } = await getTopicsByCategories(categoryString)
    dispatch(setData(result))
    dispatch(setSubCategories(subCategories))
    dispatch(setDataToDisplay(result))
  }
}