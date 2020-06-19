import React from 'react';
import './Components/Home'
import './App.css';
import Home from './Components/Home'
import About from './About'
import Navbar from './Components/Navbar'
import Jobs from './Components/Jobs'
import Job from './Components/Job'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Footer from './Components/Footer'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
          <Switch>
            <Home path='/' exact Component={Home} name='We build and Fix'/>
            <About path='/about' Component={About}></About>
            <Jobs path='/jobs/:id' exact Component={Jobs}></Jobs>
            <Job path='/job/:id' exact Component={Job}></Job>
          </Switch>
          <Footer/>
      </div>
    </Router>
  );
}

export default App;
