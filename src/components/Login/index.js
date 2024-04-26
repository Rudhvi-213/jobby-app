import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorText: false, errorMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onFailureSubmit = errorMsg => {
    this.setState({username: '', password: '', showErrorText: true, errorMsg})
  }

  onSuccessSubmit = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessSubmit(data.jwt_token)
    } else {
      this.onFailureSubmit(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="input_label" htmlFor="username">
          Username
        </label>
        <input
          className="username-input-field"
          onChange={this.changeUsername}
          placeholder="Username"
          value={username}
          id="username"
          type="text"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="input_label" htmlFor="password">
          Password
        </label>
        <input
          className="username-input-field"
          onChange={this.changePassword}
          placeholder="Password"
          value={password}
          id="password"
          type="password"
        />
      </>
    )
  }

  render() {
    const {showErrorText, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_container">
        <div className="form_container">
          <div className="form_inside_container">
            <form onSubmit={this.onSubmitForm} className="form_style">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
              <div className="input_label_container">
                {this.renderUsername()}
              </div>
              <div className="input_label_container">
                {this.renderPassword()}
              </div>
              <button className="login_button" type="submit">
                Login
              </button>
              {showErrorText && <p className="error_msg">{errorMsg}</p>}
              <p className="test_para">
                For Testing <br />
                Username: rahul <br />
                Password: rahul@2021
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
