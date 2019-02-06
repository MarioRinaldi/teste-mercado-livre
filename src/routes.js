import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ItemsList from './pages/ItemsList';
import ItemPage from './pages/ItemPage';
import Page404 from './pages/Page404';


export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/items/:id" component={ItemPage} />
        <Route path="/items" component={ItemsList} />
        <Route component={Page404} />
      </Switch>
    );
  }
}
