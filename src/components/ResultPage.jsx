import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ResultCard from './ResultCard'
import { CircularProgress } from '@mui/material'
import { getDataWithCategories, getDataWithUserInfo } from '../reducers/dataReducer'
import { getUserFromLocalStorage } from '../reducers/userReducer'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import FilterSelect from './FilterSelect'

const ResultPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector(state => state.data.user)
  const dataToDisplay = useSelector(state => state.data.dataToDisplay)
  const [expandAll, setExpandAll] = useState(false)

  const collapseRef = useRef([])

  useEffect(() => {
    if (data) {
      collapseRef.current = collapseRef.current.slice(0, data.length)
    }
  }, [data])


  const handleCollapse = () => {
    collapseRef.current.forEach(item => {
      item.setToHide()
    })
    setExpandAll(false)
  }

  const handleExpand = () => {
    collapseRef.current.forEach(item => {
      item.setToVisible()
    })
    setExpandAll(true)
  }

  useEffect(() => {
    dispatch(getUserFromLocalStorage())
  }, [])

  const userInfo = window.localStorage.getItem('loggedHealthifyAppUser')
  const categoryInfo = window.localStorage.getItem('loggedCategories')

  useEffect(() => {
    if (userInfo) {
      if (JSON.parse(userInfo).hasOwnProperty('age')) {
        dispatch(getDataWithUserInfo(JSON.parse(userInfo)))
      } else if (categoryInfo) {
        dispatch(getDataWithCategories(categoryInfo))
      } else {
        navigate('/getting-started')
      }
    } else if (categoryInfo) {
      dispatch(getDataWithCategories(categoryInfo))
    } else {
      navigate('/')
    }
  }, [])

  if (!data || !dataToDisplay) {
    return (
      <div className='body-center'>
        <CircularProgress></CircularProgress>
        <p style={{ textAlign:'center', color: '#747474', marginTop: '1rem'  }}>Fetching your results...</p>
      </div>
    )
  }

  return (
    <div className='body-top'>
      <img className="d-block mx-auto" style={{ marginTop: '2rem' }} src='./assets/health-health.png' alt="" width="100" height="100"></img>
      <div className='d-flex flex-row justify-content-end' style={{ textAlign: 'end', marginTop:'2rem' }}>
        <div style={{ textAlign: 'start' }}>
          <FilterSelect />
        </div>
        {
          expandAll
            ? <button className='btn' style={{ borderColor:'rgba(0,0,0,0.175)', marginLeft: '1rem' }} onClick={handleCollapse}><UnfoldLessIcon/> collapse all</button>
            : <button className='btn' style={{ borderColor:'rgba(0,0,0,0.175)', marginLeft: '1rem' }} onClick={handleExpand}><UnfoldMoreIcon /> expand all</button>
        }
      </div>
      <div style={{ marginTop: '1rem' }}>
        {dataToDisplay.map((topic, index) => <ResultCard key={index} topic={topic} ref={el => collapseRef.current[index] = el}/>)}
      </div>
    </div>
  )
}

export default ResultPage