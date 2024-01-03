import { useSelector, useDispatch } from 'react-redux'
import '../assets/UserInfoPage.css'
import { addUserInfoToLocalStorage } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { setData } from '../reducers/dataReducer'

const UserInfoPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  if (!user) {
    return null
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { age, sex, tobaccoUse, pregnant, sexuallyActive } = e.target
    const userInfo = { age: age.value, sex: sex.value, tobaccoUse: tobaccoUse.checked, pregnant: pregnant.checked, sexuallyActive: sexuallyActive.checked }
    dispatch(addUserInfoToLocalStorage(userInfo))
    dispatch(setData(null))
    navigate('/result')
  }

  return (
    <div>
      <img className="d-block mx-auto mb-2" src='src/assets/health-health.png' alt="" width="100" height="100"></img>
      <h2 className='mb-3'>Hello, {user.name}!</h2>
      <p className='col-lg-6 col-md-8 col-sm-8 mx-auto'>To customize your health bulletin, tell me a bit more about yourself.</p>
      <form onSubmit={handleSubmit}>
        <div className="d-block mx-auto mb-3 col-lg-4 col-md-6 col-sm-6">
          <input type="number" min="0" className="form-control col-2" id="age" name="age" size="50" required placeholder="Enter your age."/>
          <select className="form-select mb-3 col-2 text-center" id="sex" name="sex" aria-label="Default select example" aria-required="true" style={{ paddingRight:'0.75rem' }}>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <div className="form-check">
            <label className="form-check-label">
                        Do you smoke?
            </label>
            <input className="form-check-input-reverse" type="checkbox" value='1' name="tobaccoUse"></input>
          </div>
          <div className="form-check">
            <label className="form-check-label">
                        Are you sexually active?
            </label>
            <input className="form-check-input-reverse" type="checkbox" value='1' name="sexuallyActive"></input>
          </div>
          <div className="form-check">
            <label className="form-check-label">
                        Is there any chance you or your partner is pregnant?
            </label>
            <input className="form-check-input-reverse mb-3" type="checkbox" value='1' name="pregnant"></input>
          </div>
          <input className="btn btn-outline-success col-1.5 mb-3" type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  )
}

export default UserInfoPage