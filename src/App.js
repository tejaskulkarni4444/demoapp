import React from 'react';
import './Components/Home'
import './App.css';
import Home from './Components/Home'
import About from './About'
import Navbar from './Components/Navbar'
import Services from './Components/Services'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <header className="App-header">
          <Switch>
            <Home path='/' exact Component={Home} name='We build and Fix'/>
            <About path='/about' Component={About}></About>
            <Services path='/services' exact Component={Services}></Services>
            <Services path='/services/:name' Component={Services}></Services>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
