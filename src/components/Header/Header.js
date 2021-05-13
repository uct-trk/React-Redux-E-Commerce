import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './header.scss'
import logo from '../../asserts/LOGO.svg'
import { Link } from 'react-router-dom'
import { signOutUserStart } from '../../redux/actions/userActions'

const mapState = ({user}) => ({
    currentUser: user.currentUser
})

const Header = (props) => {

    const { currentUser } = useSelector(mapState);

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
                    <ul>
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
                                    <a style={{cursor:"pointer"}} onClick={() => signOut()}>
                                        Log Out
                                    </a>
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

                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
}



export default Header