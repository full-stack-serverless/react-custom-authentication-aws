import React, { useEffect } from 'react';
import {
  useLocation,
  Route,
  Redirect,
} from 'react-router-dom'

export default function PrivateRoute({
  component: Component, ...rest
}, context) {
  let location = useLocation();
  useEffect(() => {
    context.updateCurrentUser()
  }, [location]);

  const isAuthenticated = context.user && context.user.username ? true : false
  const isLoaded = context.isLoaded
  if (!isLoaded) return null

  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
            }}
          />
        )
      }}
    />
  )
}