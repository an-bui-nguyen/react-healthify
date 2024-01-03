import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addInfo(state, action) {
      return { ...state, ...action.payload }
    },
    setUser(state, action) {
      return { ...action.payload }
    }
  }
})

export default userSlice.reducer
export const { addInfo, setUser } = userSlice.actions

export const initializeUser = (name) => {
  return async (dispatch) => {
    dispatch(setUser({ name }))
    window.localStorage.setItem(
      'loggedHealthifyAppUser', JSON.stringify({ name })
    )
  }
}

export const addUserInfoToLocalStorage = (userInfo) => {
  return async (dispatch) => {
    dispatch(addInfo(userInfo))
    const loggedUserJSON = window.localStorage.getItem('loggedHealthifyAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const userToSave = { ...user, ...userInfo }
      window.localStorage.setItem(
        'loggedHealthifyAppUser', JSON.stringify(userToSave)
      )
    }
  }
}

export const getUserFromLocalStorage = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedHealthifyAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}