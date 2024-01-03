import { createSlice } from '@reduxjs/toolkit'

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: '/',
  reducers: {
    setNavigation(state, action) {
      return action.payload
    }
  }
})

export default navigationSlice.reducer
export const { setNavigation } = navigationSlice.actions

export const setNavigationInLocalStorage = (currentUrl) => {
  return async (dispatch) => {
    window.localStorage.setItem('loggedHealthifyAppCurrentUrl', JSON.stringify({ currentUrl }))
    dispatch(setNavigation(currentUrl))
  }
}

export const getNavigationFromLocalStorage = () => {
  return async (dispatch) => {
    const loggedCurrentUrl = window.localStorage.getItem('loggedHealthifyAppCurrentUrl')
    if (loggedCurrentUrl) {
      const currentUrl = JSON.parse(loggedCurrentUrl)
      dispatch(setNavigation(currentUrl.currentUrl))
    }
  }
}