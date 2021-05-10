import './default.scss'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'
import { Component } from 'react';
import {setCurrentUser} from './redux/actions/userActions'
import { connect } from 'react-redux';

// sayfalar (pages)
import HomePage from './components/pages/HomePage/HomePage';
import Registration from './components/pages/Registration/Registration';
import Login from './components/pages/LoginPage/Login';
import Recovery from './components/pages/Recovery/Recovery';

// layouts
import MainLayout from './Layout/MainLayout';
import HomePageLayout from './Layout/HomePageLayout';




class App extends Component {


  authListener = null;

  componentDidMount(){

    const {setCurrentUser} = this.props

    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
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
  }

  componentWillUnmount(){
    this.authListener();
  }

  render() {

    // destructuring
    const {currentUser} = this.props

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <HomePageLayout>
              <HomePage />
            </HomePageLayout>
          )} />
          <Route path="/registration" render={() => currentUser ? <Redirect to="/"/> : (
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )} />
          {/* login olduğumuz zaman bizi Redirect anasayfaya yönlendirecek */}
          <Route path="/login" render={() => currentUser ? <Redirect to="/"/> : (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
          <Route path="/recovery" render={() => (
            <MainLayout>
              <Recovery/>
            </MainLayout>
          )}/>
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
