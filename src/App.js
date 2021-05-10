import './default.scss'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'
import { Component } from 'react';


// sayfalar (pages)
import HomePage from './components/pages/HomePage/HomePage';
import Registration from './components/pages/Registration/Registration';
import Login from './components/pages/LoginPage/Login';

// layouts
import MainLayout from './Layout/MainLayout';
import HomePageLayout from './Layout/HomePageLayout';

const initialState = {
  currentUser: null
}
class App extends Component {

  state = {
    ...initialState
  }

  authListener = null;

  componentDidMount(){
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      })

    })
  }

  componentWillUnmount(){
    this.authListener();
  }

  render() {

    // destructuring
    const {currentUser} = this.state

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <HomePageLayout currentUser={currentUser}>
              <HomePage />
            </HomePageLayout>
          )} />
          <Route path="/registration" render={() => (
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )} />
          {/* login olduğumuz zaman bizi redirect anasayfaya yönlendirecek */}
          <Route path="/login" render={() => currentUser ? <Redirect to="/"/> : (
            <MainLayout currentUser={currentUser}>
              <Login />
            </MainLayout>
          )} />
        </Switch>
      </div>
    );
  }



}

export default App;
