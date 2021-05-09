import './default.scss'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// sayfalar (pages)
import HomePage from './components/pages/HomePage/HomePage';
import Registration from './components/pages/Registration/Registration';

// layouts
import MainLayout from './Layout/MainLayout';
import HomePageLayout from './Layout/HomePageLayout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <HomePageLayout>
            <HomePage/>
          </HomePageLayout>
        )} />
        <Route path="/registration" render={() => (
          <MainLayout>
            <Registration/>
          </MainLayout>
        )} />
      </Switch>
    </div>
  );
}

export default App;
