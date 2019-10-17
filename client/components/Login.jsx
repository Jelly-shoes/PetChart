/**
 * ***********************************
 *
 * @module Login
 * @author Austin Ruby and Michael Evans
 * @date 10/12/2019
 * @description functional component that sends
 * login info to database
 *
 * ***********************************
 */

import React, { Component } from 'react';

// return content to render for the login page
const Login = props => (
  <div id="loginWrapper">
    {/* login form: */}
    <form id="loginForm" onSubmit={event => props.saveProfile(event)}>
      <div id="loginLine1">
        <label> Email: </label>
        <input placeholder="email" type="input" id="email" />
      </div>
      <div id="loginLine2">
        <label> password: </label>
        <input placeholder="password" type="password" id="password" />
      </div>

      <div className="loginFormButtons">
        <input id="loginButton" className="loginButton" type="submit" value="Login" />
        <input
          id="signupButton"
          className="loginButton"
          type="button"
          value="Sign up"
          onClick={() => props.publicPage('signup')}
        />
      </div>
    </form>
  </div>
);

export default Login;
