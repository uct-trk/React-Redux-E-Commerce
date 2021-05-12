import './default.scss'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import { checkUserSession } from './redux/actions/userActions'
import { useDispatch } from 'react-redux';

// components
import AdminToolbar from './components/AdminToolbar/AdminToolbar';

// hoc
import WithAuth from './hoc/WithAuth'
import WithAdminAuth from './hoc/WithAdminAuth'

// sayfalar (pages)
import HomePage from './components/pages/HomePage/HomePage';
import Registration from './components/pages/Registration/Registration';
import Login from './components/pages/LoginPage/Login';
import Recovery from './components/pages/Recovery/Recovery';
import Dashboard from './components/pages/Dashboard/Dashboard'
import Admin from './components/pages/Admin.js/Admin';

// layouts
import MainLayout from './Layout/MainLayout';
import HomePageLayout from './Layout/HomePageLayout';




const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  
  }, [])


  return (
    <div className="App">
      <AdminToolbar/>
      <Switch>
        <Route exact path="/" render={() => (
          <HomePageLayout>
            <HomePage />
          </HomePageLayout>
        )} />
        <Route path="/registration" render={() => (
          <MainLayout>
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
        <Route path="/admin" render={() => (
          <WithAdminAuth>
          <MainLayout>
            <Admin />
          </MainLayout>
          </WithAdminAuth>
        )} />
      </Switch>
    </div>
  );
}

export default App;
