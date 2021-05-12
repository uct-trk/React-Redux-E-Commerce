import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import VerticalNav from '../components/VerticalNav/VerticalNav';
import { signOutUserStart } from '../redux/actions/userActions';

const DashboardLayout = (props) => {

    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutUserStart());
    }

    return (
        <div className="dashboardLayout">
            <Header {...props}/>
            <div className="controlPanel">  
                <div className="sidebar">
                    <VerticalNav>
                        <ul>
                            <li>
                                <Link to="/dashboard">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <span className="signOut" onClick={() => signOut()}>
                                    Sign Out
                                </span>
                            </li>
                        </ul>
                    </VerticalNav>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default DashboardLayout
