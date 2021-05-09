import React from 'react'
import './header.scss'
import logo from '../../asserts/LOGO.svg'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                   <img src={logo}/>
                   </Link>
                </div>
                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/registration">
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
export default Header