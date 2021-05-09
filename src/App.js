import './default.scss'
import React from 'react'
import Header from './components/Header/Header'
import HomePage from './components/pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
        <Header />
      <div className="main">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
