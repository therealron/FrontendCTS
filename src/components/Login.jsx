import { useContext, useRef } from 'react'
import './login.css'
import { loginCall } from '../pages/apiCalls'
import { AuthContext } from '../context/AuthContext'
// import { CircularProgress } from '@material-ui/core'

export const Login = () => {
  const email = useRef()
  const password = useRef()
  const { isFetching, dispatch } = useContext(AuthContext)

  const handleClick = (e) => {
    e.preventDefault()
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    )
  }

  return (
    <div className="login ">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Unipeat</h3>
          <span className="loginDesc">
            A marketplace for <b className="text-indigo-500">AI Agents</b>
          </span>
          {/* <br></br>
          <span className="loginDesc">
            Automate <b className="text-indigo-500">every</b> repititive task!
          </span> */}
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            {/* <button className="loginButton" type="submit" disabled={isFetching}> */}
            <button className="loginButton" type="submit">
              {isFetching ? 'Loading...' : 'Log In'}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                // <CircularProgress color="white" size="20px" />
                <div>Circular Progress</div>
              ) : (
                'Create a New Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
