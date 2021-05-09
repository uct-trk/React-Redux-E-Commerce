import React from 'react'
import './header.scss'
import logo from '../../asserts/LOGO.svg'

const Header = () => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                   <img src={logo}/>
                </div>
            </div>
        </header>
    )
}
export default Header