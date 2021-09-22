import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginPage } />
    </Switch>
  );
}

export default App;
