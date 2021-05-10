import './default.scss'
import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'
import { setCurrentUser } from './redux/actions/userActions'
import { connect } from 'react-redux';

// hoc
import WithAuth from './hoc/WithAuth'

// sayfalar (pages)
import HomePage from './components/pages/HomePage/HomePage';
import Registration from './components/pages/Registration/Registration';
import Login from './components/pages/LoginPage/Login';
import Recovery from './components/pages/Recovery/Recovery';
import Dashboard from './components/pages/Dashboard/Dashboard'


// layouts
import MainLayout from './Layout/MainLayout';
import HomePageLayout from './Layout/HomePageLayout';




const App = (props) => {

  const { setCurrentUser, currentUser } = props

  useEffect(() => {

    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth);
    })
    return () => {
      authListener();
    }
  }, [])


  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <HomePageLayout>
            <HomePage />
          </HomePageLayout>
        )} />
        <Route path="/registration" render={() => (
          <MainLayout currentUser={currentUser}>
            <Registration />
          </MainLayout>
        )} />
        
        <Route path="/login" render={() =>  (
          <MainLayout>
            <Login />
          </MainLayout>
        )} />
        <Route path="/recovery" render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
        <Route path="/dashboard" render={() => (
          <WithAuth>
          <MainLayout>
            <Dashboard />
          </MainLayout>
          </WithAuth>
        )}/>
      </Switch>
    </div>
  );
}



const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
