import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '../assets/Navigation.css'
import { useNavigate } from 'react-router-dom'
import { setNavigationInLocalStorage } from '../reducers/navigationReducer'
import CategorySelect from './CategorySelect'

const NavigationBar = () => {
  const currentUrl = useSelector(state => state.navigation)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const style = {
    textDecoration: 'none'
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedHealthifyAppUser')
    dispatch(setNavigationInLocalStorage('/'))
    navigate('/')
  }

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><Link to={currentUrl} style={style}>Home</Link></button>
        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><Link to='/about' style={style}>About</Link></button>
        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><Link to='/contact' style={style}>Contact</Link></button>
      </ul>

      <CategorySelect />

      <button onClick={handleLogOut} className="nav-link text-end" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" style={{ ...style, color: '#db1307' }}>Log out</button>

    </div>
  )
}

export default NavigationBar
