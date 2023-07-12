import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isReqFailed: false}

  fetchTheResponse = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const data = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const jsonData = await response.json()
      console.log(jsonData)
      const jwtToken = jsonData.jwt_token
      console.log(jwtToken)
      Cookies.set('jwt_token', jwtToken, {expires: 1})
      const {history} = this.props
      history.replace('/')
    } else {
      const jsonData = await response.json()
      console.log(jsonData)
      this.setState({
        errorMsg: jsonData.error_msg,
        isReqFailed: true,
      })
    }
  }

  changeTheUsername = event => {
    const {value} = event.target
    this.setState({
      username: value,
    })
  }

  changeThePassword = event => {
    const {value} = event.target
    this.setState({
      password: value,
    })
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginOuterDiv">
        <form onSubmit={this.fetchTheResponse} className="loginForm">
          <div className="firstDivForm">
            <div className="logoContainer">
              <img
                className="logoImage"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              />
            </div>
          </div>
          <label htmlFor="username">USERNAME</label>
          <input
            className="specialInput"
            id="username"
            type="text"
            placeholder="Username"
            onChange={this.changeTheUsername}
          />
          <label htmlFor="password">Password</label>
          <input
            className="specialInput"
            id="password"
            type="text"
            placeholder="Password"
            onChange={this.changeThePassword}
          />
          <div className="">
            <input className="specialInput" id="check" type="checkbox" />
            <label htmlFor="check">Show Password</label>
          </div>
          <button className="submitBtn" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
