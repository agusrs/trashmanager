import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Monitoreo from './components/monitoreo/Monitoreo';
import SecondPage from './components/secondpage/SecondPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/monitoreo" exact component={Monitoreo} />
          <Route path="/secondPage" exact component={SecondPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
