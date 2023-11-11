import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  HomePage,
  NavBar,
  Checkout,
  SearchResults,
  ProductPage,
  Forum,
  Browse,
  Login,
  Register,
} from './components'

import { Post } from './components/forums/Post'
import CreateStart from './components/CreateStart'
import RequestAgent from './components/RequestAgent'
import CreateAgent from './components/CreateAgent'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { Navigate } from 'react-router-dom'

const App = () => {
  const { user } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={user ? <HomePage /> : <Register />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route exact path="/browse" element={<Browse />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/post/:post_id" element={<Post />} />
        <Route path="/createstart" element={<CreateStart />} />
        <Route path="/createrequest" element={<RequestAgent />} />
        <Route path="/createagent" element={<CreateAgent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
