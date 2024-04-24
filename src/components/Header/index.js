import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav_container">
      <div className="header_container">
        <ul className="nav_menu">
          <li>
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
                alt="website logo"
              />
            </Link>
          </li>
          <li className="nav_menu_item">
            <Link to="/" className="nav_link">
              Home
            </Link>
          </li>
          <li className="nav_menu_item">
            <Link to="/jobs" className="nav_link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" onClick={logout} className="logout_button">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
