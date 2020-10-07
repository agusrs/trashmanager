import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Monitoreo from './components/monitoreo/Monitoreo';
import Recoleccion from './components/recoleccion/Recoleccion';
import {StoreProvider} from './context/Store';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/monitoreo" exact component={Monitoreo} />
            <Route path="/recoleccion" exact component={Recoleccion} />
          </Switch>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
