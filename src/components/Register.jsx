import axios from 'axios'
import { useRef } from 'react'
import './register.css'
import { useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants'
import { Link } from 'react-router-dom'

export default function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post(BASE_URL + 'auth/register', user)
        // history.push('/login')
        navigate('/login')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="login  bg-gradient-to-r from-purple-500 to-indigo-600 h-screen ">
      <div className="loginWrapper">
        <div className="loginLeft">
          <header className="text-center mb-10">
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '60px',
                fontWeight: '700',
                color: 'white',
              }}
            >
              REQAPOD
            </h1>
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '15px',
                fontWeight: '300',
                color: '#d1d1d1',
                marginTop: '0',
              }}
            >
              REQuest A PODcast
            </p>
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '22px',
                fontWeight: '400',
                color: 'white',
                marginTop: '8px',
              }}
            >
              Create an AI Generated Podcast in One-Click
            </p>
          </header>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="3"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
              minLength="3"
            />
            {/* <button className="loginButton" type="submit"> */}
            <button
              className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Sign Up
            </button>
            <Link to="/login">
              <button className="bg-green-500 w-full text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Log into Account
              </button>
            </Link>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  )
}
