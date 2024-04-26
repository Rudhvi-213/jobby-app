import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

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
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
        </Link>
        <ul className="nav_menu">
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
      <div className="mobile_nav_view_container">
        <Link to="/">
          <img
            className="mobile_image_nav_size"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
        </Link>
        <ul className="mobile_nav_menu">
          <li className="mobile_nav_menu_item">
            <Link to="/" className="">
              <AiFillHome className="mobile_icon_size" />
            </Link>
          </li>
          <li className="mobile_nav_menu_item">
            <Link to="/jobs" className="">
              <MdWork className="mobile_icon_size" />
            </Link>
          </li>
          <li className="mobile_nav_menu_item">
            <button
              aria-label="button"
              type="button"
              onClick={logout}
              className="mobile_logout_button"
            >
              <FiLogOut onClick={logout} className="mobile_icon_size" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
