import React from 'react';
import {
  BrowserRouter, Route, Link, Switch
} from 'react-router-dom';
import { css } from 'emotion';

import Home from './Home';
import Profile from './Profile';
import Protected from './Protected';
import ProtectedRoute from './ProtectedRoute';

import theme from './theme';

const { primaryColor } = theme;

export default function Router() {
  return (
    <BrowserRouter>
      <nav>
        <div className={headingStyle}>
          <Link to="/" className={linkTitleStyle}>
            <h1 className={titleStyle}>Custom Auth</h1>
          </Link>
          <Link to="/" className={linkStyle}>
            Home
          </Link>
          <Link to="/profile" className={linkStyle}>
            Profile
          </Link>
          <Link to="/app" className={linkStyle}>
            App
          </Link>
        </div>
      </nav>
      <div className={containerStyle}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          { /* For a protected route, use the ProtectedRoute component */ }
          <ProtectedRoute
            exact
            path="/app"
            component={Protected}
          />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

const linkTitleStyle = css`
  text-decoration: none;
`

const containerStyle = css`
  padding: 0px 30px;
`

const linkStyle = css`
  color: white;
  text-decoration: none;
  margin-left: 10px;
  font-size: 18px;
  &:hover {
    color: #ddd;
  }
`

const headingStyle = css`
  background-color: ${primaryColor};
  padding: 30px;
  display: flex;
  align-items: center;
`

const titleStyle = css`
  color: white;
  margin: 0;
  font-size: 32px;
  margin-right: 50px;
`