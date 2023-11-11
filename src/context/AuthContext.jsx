import { createContext, useEffect, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
  //   user: JSON.parse(localStorage.getItem('user')) || null,
  user: {
    _id: '654ab114a3ae8d94a20870c4',
    username: 'ronjo',
    email: 'ron@ron.com',
    password: '$2b$10$l2NcD0HD0lohGRTK/JVwBOO54fuD1PBtLUx5NBucd0ap0VsnhPIpC',
    profilePicture: '',
    coverPicture: '',
    followers: [],
    followings: [],
    isAdmin: false,
    requests: [],
    fleet: [],
    requests_volunteered_to_build: [],
    createdAt: '2023-11-07T21:50:12.042Z',
    updatedAt: '2023-11-07T21:50:12.042Z',
    __v: 0,
  },
  isFetching: false,
  error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
