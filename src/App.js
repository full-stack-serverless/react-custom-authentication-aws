import React, { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify'
import './App.css';

import UserContext from './UserContext'

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoaded, setIsLoaded] = useState({});
  useEffect(() => {
    updateCurrentUser();
    listen();
  }, [])
  function listen() {
    Hub.listen('auth', (data) => {
      if (data.payload.event === 'signIn') {
        updateCurrentUser();
      }
      if (data.payload.event === 'signOut') {
        updateCurrentUser();
      }
    });
  }
  async function updateCurrentUser(user = null) {
    if (user) {
      setCurrentUser(user);
      return
    }
    try {
      const user = await Auth.currentAuthenticatedUser()
      setCurrentUser(user);
      setIsLoaded(true);
    } catch (err) {
      setCurrentUser(null);
      setIsLoaded(true);
    }
  }
  return (
    <UserContext.Provider value={{
      user: currentUser,
      updateCurrentUser: updateCurrentUser,
      isLoaded: isLoaded
    }}>
      <div className="App">
        <Router />
      </div>
    </UserContext.Provider>
  );
}

export default App;
