import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Search } from './'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const NavBar = () => {
  const { user } = useContext(AuthContext)
  const cart = useSelector((state) => state.cart.productsNumber)
  return (
    <header className="min-w-[1000px]">
      <div className="flex bg-amazonclone text-white h-[60px]">
        {/* Left */}
        <div className="flex items-center m-4">
          <Link to={'/'}>
            <img
              className="h-[35px]  m-2"
              src={'../images/LOGO_indigo.png'}
              alt="Amazon logo"
            />
          </Link>

          <Link to="/createstart">
            <div className="pr-4 pl-4">
              <div className="text-xs xl:text-sm">Get your </div>
              <div className="text-sm xl:text-base font-bold">own agent!</div>
            </div>
          </Link>
        </div>
        {/* Middle */}
        <div className="flex grow relative items-center">
          <Search />
        </div>
        {/* Right */}

        <div className="flex items-center m-4">
          <Link to={'/browse'}>
            <div className="pr-4 pl-4">
              {/* <div className="text-xs xl:text-sm">Hello, sign in</div> */}
              <div className="text-sm xl:text-base font-bold">
                {/* BuildMyIdea */}
                Browse
              </div>
            </div>
          </Link>
          <Link to={'/forum'}>
            <div className="pr-4 pl-4">
              {/* <div className="text-xs xl:text-sm">Hello, sign in</div> */}
              <div className="text-sm xl:text-base font-bold">
                {/* BuildMyIdea */}
                Forum
              </div>
            </div>
          </Link>

          <Link to={'/console'}>
            <div className="pr-4 pl-4">
              {/* <div className="text-xs xl:text-sm">Returns</div> */}
              <div className="text-sm xl:text-base font-bold">Console</div>
            </div>
          </Link>
          <Link to={'/checkout'}>
            <div className="flex pr-4 pl-4">
              {/* <ShoppingCartIcon className="h-[48px]" /> */}
              {/* <div className="relative">
                <div className="absolute right-[9px] font-bold m-2 text-orange-400">
                  {cart}
                </div>
              </div> */}
              {/* <div className="mt-7 text-xs xl:text-sm font-bold">Sign In</div> */}
              <div className="text-sm xl:text-base font-bold">
                {user ? <p>{user.username}</p> : <p> Sign In</p>}
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* <div className="flex bg-amazonclone-light_blue text-white space-x-3 text-xs xl:text-sm p-2 pl-6">
        <div>Today's Deals</div>
        <div>Customer Service</div>
        <div>Registry</div>
        <div>Gift Cards</div>
        <div>Sell</div>
      </div> */}
    </header>
  )
}

export default NavBar
