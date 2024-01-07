import { useDispatch } from 'react-redux'
import Select from 'react-select'
import { useState } from 'react'
import { getDataWithCategories, setData } from '../reducers/dataReducer'
import { useNavigate } from 'react-router-dom'
import * as data from '../assets/data.json'

const CategorySelect = () => {
  const categories = data.default
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userChoice, setUserChoice] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.key ==='Enter' && userChoice) {
      if (userChoice.length !== 0) {
        const categories = []
        userChoice.forEach(element => {
          categories.push(...element.value)
        })
        dispatch(getDataWithCategories(categories.join(',')))
        window.localStorage.setItem('loggedCategories', categories.join(','))
        dispatch(setData(null))
        navigate('/result')
      }
    }
  }

  const handleClickSubmit = () => {
    if (userChoice) {
      if (userChoice.length !== 0) {
        const categories = []
        userChoice.forEach(element => {
          categories.push(...element.value)
        })
        dispatch(getDataWithCategories(categories.join(',')))
        window.localStorage.setItem('loggedCategories', categories.join(','))
        dispatch(setData(null))
        navigate('/result')
      }
    }
  }

  return (
    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
      <Select
        isMulti
        name='categories'
        options={categories}
        className='basic-multi-select'
        classNamePrefix='select'
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        onChange={(choice) => {console.log(choice); setUserChoice(choice)}}
        onKeyDown={handleSubmit}
        onMenuClose={handleClickSubmit}
        placeholder='search health topics'
      />
    </form>
  )
}

export default CategorySelect