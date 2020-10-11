import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../containers/Home/index';
import PlayersPage from '../containers/Players/index';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/players" component={PlayersPage}/>
      </Switch>
    </Router>
  );
}