import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import theme from './theme';

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
  const [user, setUser] = useState(null);

  const { username, email, password, authCode, formType } = formState;

  function toggleFormType(formType) {
    setFormState(state => ({ ...state, formType }));
  }

  async function signUp() {}
  async function signIn() {}
  async function confirmSignUp() {}
  return (
    <div>
      {
        formType === 'signUp' && (
          <div className={formContainerStyle}>
            <input
              name="usernamne"
              value={username}
              className={inputStyle}
              placeholder="Username"
            />
            <input
              name="password"
              value={password}
              className={inputStyle}
              type="password"
              placeholder="Password"
            />
            <input
              name="email"
              value={email}
              className={inputStyle}
              placeholder="Email"
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
              name="usernamne"
              value={username}
              className={inputStyle}
              placeholder="Username"
            />
            <input
              name="password"
              value={password}
              className={inputStyle}
              type="password"
              placeholder="Password"
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
          <div className={formContainerStyle}>
            <h1>Hello, {user.username}</h1>
          </div>
        )
      }
    </div>
  )
}

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