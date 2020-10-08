import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Monitoreo from './components/monitoreo/Monitoreo';
import Recoleccion from './components/recoleccion/Recoleccion';

function App() {

  const [data, setData] = React.useState(null)

  const update = (newData) => {
    setData(newData)
  }

  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/monitoreo" exact render={props => <Monitoreo {...props} data={data} dataUpdater={update} />} />
          <Route path="/recoleccion" exact render={props => <Recoleccion {...props} data={data} dataUpdater={update} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
