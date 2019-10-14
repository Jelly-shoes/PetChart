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

import React, {Component} from 'react';

//return content to render for the login page
const Login = (props) => {
  let email = "";

  
  return (
    <div>
      login form:
      <form id = "loginForm" onSubmit = { (event) => props.saveProfile(event)} >
        <label> Email: </label>
        <input type="input" id = "email"></input>
        <br></br>
        <label> password: </label>
        <input type="input" id = "password"></input>
        <br></br>
        <input type="submit" value="login"></input>
      </form>
      <input type="submit" value="Go to signup" onClick = { () => props.publicPage("signup")} ></input>
    </div>
  )
}

//export default connect(null, mapDispatchToProps)(Login)
export default Login;