import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import ResultCard from './ResultCard'
import { CircularProgress } from '@mui/material'
import { getDataWithUserInfo } from '../reducers/dataReducer'
import { getUserFromLocalStorage } from '../reducers/userReducer'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'

const ResultPage = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.user)
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

  useEffect(() => {
    if (userInfo) {
      if (JSON.parse(userInfo).hasOwnProperty('age')) {
        dispatch(getDataWithUserInfo(JSON.parse(userInfo)))
      }
    }
  }, [])

  if (!data) {
    return (
      <div>
        <CircularProgress></CircularProgress>
        <p style={{ textAlign:'center', color: '#747474' }}>Fetching your results...</p>
      </div>
    )
  }

  return (
    <div>
      <img className="d-block mx-auto" style={{ marginTop: '3rem' }} src='src/assets/health-health.png' alt="" width="100" height="100"></img>
      <div style={{ textAlign: 'end', marginTop:'2rem' }}>
        {
          expandAll
            ? <button className='btn' style={{ borderColor:'rgba(0,0,0,0.175)' }} onClick={handleCollapse}><UnfoldLessIcon/> collapse all</button>
            : <button className='btn' style={{ borderColor:'rgba(0,0,0,0.175)' }} onClick={handleExpand}><UnfoldMoreIcon /> expand all</button>
        }
      </div>
      <div style={{ marginTop: '1rem' }}>
        {data.map((topic, index) => <ResultCard key={index} topic={topic} ref={el => collapseRef.current[index] = el}/>)}
      </div>
    </div>
  )
}

export default ResultPage