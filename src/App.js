import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';

import WelcomePage from './containers/WelcomePage'
import NavBar from './containers/NavBar'
import Home from './containers/Home'


function App() {

  const [user, setUser] = useState({})

  const handleLogin = (user) => {
    console.log(localStorage)
  }

  useEffect(() => {
    // console.log(localStorage.getItem('user'))
    setUser(localStorage.getItem('token'), [])
  });

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
        <Route exact path='/' render={(props) => (<WelcomePage handleLogin={handleLogin}/>)}/>
        <Route exact path='/home' render={(props) => (<Home user={user}/>)}/> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
