import React from 'react';
import {
  BrowserRouter, Router, Link, Switch
} from 'aws-amplify';

import Home from './Home';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">
          Home
        </Link>
        <Link to="/auth">
          Profile
        </Link>
        <Link to="/app">
          App
        </Link>
      </nav>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <ProtectedRoute
          path="/protected"
          component={Protected}
        />
      </Switch>
    </BrowserRouter>
  )
}