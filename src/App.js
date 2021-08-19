import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import EventPage from './pages/event';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/event" exact />
          <Route path="/event" component={EventPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
