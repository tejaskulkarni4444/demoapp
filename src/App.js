import React from 'react';
import './Components/Home'
import './App.css';
import Home from './Components/Home'
import About from './About'
import Navbar from './Components/Navbar'
import Services from './Components/Services'
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
            <Services path='/services/:id' exact Component={Services}></Services>
            {/* <Service path='/service/:id' exact Component={Service}></Service> */}
          </Switch>
          <Footer/>
      </div>
    </Router>
  );
}

export default App;
