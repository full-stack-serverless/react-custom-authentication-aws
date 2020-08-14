import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import theme from './theme';
import { Auth } from 'aws-amplify';

const intitialFormState = {
  username: '',
  email: '',
  password: '',
  authCode: '',
  formType: 'signUp'
}

const { primaryColor } = theme;

export default function Profile() {
  const [formState, setFormState] = useState(intitialFormState);
  const [loading, setLoading] = useState(true);
  const { username, email, password, authCode, formType } = formState;
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
      setFormState(() => ({ ...formState, formType: 'signedIn' }));
      setLoading(false);
    } catch (err) {
      setUser(null);
      setLoading(false);
    }
  }

  function onChange(e) {
    e.persist();
    setFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  function toggleFormType(formType) {
    setFormState(state => ({ ...state, formType }));
  }

  async function signUp() {
    if (!username || !email || !password) return;
    try {
      await Auth.signUp({
        username, password, attributes: { email }
      });
      setFormState(() => ({ ...formState, formType: 'confirmSignUp' }));
    } catch (err) {
      console.log('error signing up: ', err);
    }
  }
  async function signIn() {
    if (!username || !password) return;
    try {
      const user = await Auth.signIn(username, password);
      setUser(user);
      setFormState(() => ({ ...formState, formType: 'signedIn' }));
    } catch (err) {
      console.log('error signing in: ', err);
    }
  }
  async function confirmSignUp() {
    if (!authCode) return;
    try {
      await Auth.confirmSignUp(username, authCode);
      await signIn();
    } catch (err) {
      console.log('error confirming signing up: ', err);
    }
  }
  async function signOut() {
    await Auth.signOut();
    setFormState(() => ({ ...formState, formType: 'signUp' }));
    setUser(null);
  }
  if (loading) return null
  return (
    <div>
      {
        formType === 'signUp' && (
          <div className={formContainerStyle}>
            <input
              name="username"
              value={username}
              className={inputStyle}
              placeholder="Username"
              onChange={onChange}
            />
            <input
              name="password"
              value={password}
              className={inputStyle}
              type="password"
              placeholder="Password"
              onChange={onChange}
            />
            <input
              name="email"
              value={email}
              className={inputStyle}
              placeholder="Email"
              onChange={onChange}
            />
            <button onClick={signUp} className={buttonStyle}>
              Sign Up
            </button>
            <p onClick={() => toggleFormType('signIn')} className={stateToggleStyle}>
              Already signed up? Sign in.
            </p>
          </div>
        )
      }
      {
        formType === 'confirmSignUp' && (
          <div className={formContainerStyle}>
            <input
              name="authCode"
              value={authCode}
              className={inputStyle}
              placeholder="Authentication code"
              onChange={onChange}
            />
            <button onClick={confirmSignUp} className={buttonStyle}>
              Confirm Sign Up
            </button>
          </div>
        )
      }
      {
        formType === 'signIn' && (
          <div className={formContainerStyle}>
            <input
              name="username"
              value={username}
              className={inputStyle}
              placeholder="Username"
              onChange={onChange}
            />
            <input
              name="password"
              value={password}
              className={inputStyle}
              type="password"
              placeholder="Password"
              onChange={onChange}
            />
            <button onClick={signIn} className={buttonStyle}>
              Sign In
            </button>
            <p onClick={() => toggleFormType('signUp')} className={stateToggleStyle}>
              Need an account? Sign up.
            </p>
          </div>
        )
      }
      {
        formType === 'signedIn' && (
          <div className={profileContainerStyle}>
            <h1>Hello, {user.username}</h1>
            <button onClick={signOut} className={buttonStyle}>
              Sign Out
            </button>
          </div>
        )
      }
    </div>
  )
}

const profileContainerStyle = css`
  display: flex;
  flex-direction: column;
`

const stateToggleStyle = css`
  color: ${primaryColor};
  cursor: pointer;
  text-align: center;
  margin-top: 25px;
  &:hover {
    opacity: .8;
  }
`

const formContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
`

const inputStyle = css`
  outline: none;
  border: none;
  border-bottom: 2px solid ${primaryColor};
  margin: 4px 0px 0px;
  height: 40px;
  font-size: 20px;
`

const buttonStyle = css`
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  background-color: ${primaryColor};
  color: white;
  height: 50px;
  text-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .2);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .2);
  &:hover {
    opacity: .85;
  }
`