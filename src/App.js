import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import FirstPage from './components/firstpage/FirstPage';
import SecondPage from './components/secondpage/SecondPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/firstPage" exact component={FirstPage} />
          <Route path="/secondPage" exact component={SecondPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
