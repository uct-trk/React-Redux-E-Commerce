import React from 'react'
import {connect} from 'react-redux'
import './header.scss'
import logo from '../../asserts/LOGO.svg'
import { Link } from 'react-router-dom'
import {auth} from './../../firebase/utils'

const Header = (props) => {
    // destructuring
    const { currentUser } = props;
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </div>

                <div className="callToActions">
                    {/* login oldugumuz durumda logout yazısı görülecek conditional rendering */}

                    {
                        currentUser && (
                            <ul>
                                <li>
                                    <a style={{cursor:"pointer"}} onClick={() => auth.signOut()}>
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

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Header)