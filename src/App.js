import './default.scss'
import React from 'react'
import Header from './components/Header/Header'
import HomePage from './components/pages/HomePage/HomePage';
import Registration from './components/pages/Registration/Registration';
import {Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Header />
      <div className="main">
        <Route exact path="/" component={HomePage}/>
        <Route path="/registration" component={Registration}/>
      </div>
    </div>
  );
}

export default App;
