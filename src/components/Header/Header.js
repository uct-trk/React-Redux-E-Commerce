import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './header.scss'
import logo from '../../asserts/LOGO.svg'
import { Link } from 'react-router-dom'
import { signOutUserStart } from '../../redux/actions/userActions'
import { selectCartItemsCount } from '../../redux/Cart/cartSelector'


const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state) //reselect
})

const Header = (props) => {

    const { currentUser, totalNumCartItems } = useSelector(mapState);

    const dispatch = useDispatch()
    const signOut = () => {
        dispatch(signOutUserStart())
    }

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </div>

                <nav>
                    <ul style={{marginRight:"90px"}}>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                Search
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="callToActions">
                    <ul>
                        <li className="cart">
                            <Link>
                            {totalNumCartItems === 0 ? null : (<span>Your Cart({totalNumCartItems})</span>)}
                                
                            </Link>
                        </li>

                        {/* login oldugumuz durumda logout yazısı görülecek conditional rendering */}

                        {
                            currentUser && (
                                
                                <ul>
                                    <li>
                                        <Link to="/dashboard">
                                            My Account
                                        </Link>
                                    </li>
                                    <li>
                                        <Link style={{ cursor: "pointer" }} onClick={() => signOut()}>
                                            Log Out
                                        </Link>
                                    </li>
                                </ul>
                               
                            )
                        }
                        {
                            !currentUser && (
                                <ul>

                                    <li>
                                        <Link to="/registration">
                                            Register
                                    </Link>
                                    </li>
                                    <li>
                                        <Link to="/login">
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            )
                        }
                    </ul>




                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
}



export default Header