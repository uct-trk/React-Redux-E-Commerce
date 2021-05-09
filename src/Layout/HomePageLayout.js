import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

const HomePageLayout = (props) => {
    return (
        <div className="fullHeight">
            <Header />
            <div className="main">
                {props.children}
                <Footer/>
            </div>
        </div>
    )
}

export default HomePageLayout
