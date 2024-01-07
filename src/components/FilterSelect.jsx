import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { useState } from 'react'
import { filterData } from '../reducers/dataReducer'
import '../assets/FilterSelect.css'

const FilterSelect = () => {
  const subCategories = useSelector(state => state.data.categories)
  const dispatch = useDispatch()
  const [userChoice, setUserChoice] = useState(null)

  if (!subCategories) {
    return null
  }

  const handleChange = (choice) => {
    console.log(choice)
    if (choice.length === 0) {
      dispatch(filterData(subCategories.map(choice => choice.label)))
    } else {
      console.log(choice.map(choice => choice.label))
      setUserChoice(choice)
      dispatch(filterData(choice.map(choice => choice.label)))
    }
    setUserChoice(choice)
  }

  const handleSubmit = () => {
    console.log(userChoice)
    if (userChoice.length === 0){
      dispatch(filterData(subCategories.map(choice => choice.label)))
    } else {
      dispatch(filterData(userChoice.map(choice => choice.label)))
    }
  }

  return (
    <Select
      isMulti
      name='categories'
      options={subCategories}
      className='basic-multi-select'
      classNamePrefix='select'
      closeMenuOnSelect={false}
      blurInputOnSelect={false}
      onChange={handleChange}
      // onMenuClose={handleSubmit}
      placeholder='filter by categories'
    />
  )
}

export default FilterSelect