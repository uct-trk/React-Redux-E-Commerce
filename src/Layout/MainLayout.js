import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'


const MainLayout = (props) => {
    return (
        <div className="fullHeight">
            <Header {...props}/>
            <div className="main">
                {props.children}
                <Footer/>
            </div>
        </div>
    )
}

export default MainLayout
