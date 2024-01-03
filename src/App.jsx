import './assets/App.css'
import Welcome from './components/Welcome'
import UserInfoPage from './components/UserInfoPage'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import ResultPage from './components/ResultPage'
import About from './components/About'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { getUserFromLocalStorage } from './reducers/userReducer'
import { getNavigationFromLocalStorage } from './reducers/navigationReducer'
import { setCategoryData } from './reducers/dataReducer'

function App() {
  const dispatch = useDispatch()
  const currentUrl = useSelector(state => state.navigation)
  useEffect(() => {
    dispatch(getUserFromLocalStorage())
  }, [])

  useEffect(() => {
    dispatch(getNavigationFromLocalStorage())
    dispatch(setCategoryData())
  }, [])

  console.log(currentUrl)

  return (
    <div className='d-flex mx-auto col-lg-9 col-md-10 col-sm-10'>
      <NavigationBar />
      <Routes>
        <Route path='/' element={currentUrl === '/' ? <Welcome /> : <Navigate replace to={currentUrl} />}/>
        <Route path='/getting-started' element={<UserInfoPage />}/>
        <Route path='/result' element={<ResultPage />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
