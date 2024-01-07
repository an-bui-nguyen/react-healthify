import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUser } from '../reducers/userReducer'
import { setNavigationInLocalStorage } from '../reducers/navigationReducer'
import { useNavigate } from 'react-router-dom'
import '../assets/Welcome.css'

const Welcome = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    if (name !== '') {
      e.preventDefault()
      dispatch(initializeUser(name))
      dispatch(setNavigationInLocalStorage('/getting-started'))
      navigate('/getting-started')
    }
  }

  return (
    <section id='welcome' className='body-center mt-3'>
      <div>
        <img className="d-block mx-auto mb-2" src='./assets/health-health.png' alt="" width="100" height="100"></img>
        <div className="col-lg-6 col-md-8 col-sm-8 mx-auto mb-4">
          <h1>Hello, my name is Healthify, and your name is...?</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-block mx-auto mb-3 col-lg-4 col-md-6 col-sm-6">
            <input
              className="form-control mb-4"
              type="text" name="userName"
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name here">
            </input>
          </div>
          <input className="btn btn-outline-success" type="submit" value="Submit"></input>
        </form>
      </div>
    </section>
  )
}

export default Welcome
