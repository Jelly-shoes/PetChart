/**
 * ***********************************
 *
 * @module MainContainer
 * @author Austin Ruby and Michael Evans
 * @date 10/12/2019
 * @description stateful component that renders
 * login, dashboard, or signup
 *
 * ***********************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { type } from 'os';
import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';
import Dashboard from './Dashboard.jsx';
import * as actions from '../actions/actions';
import emptyPet from '../constants/emptyPetObj';

const mapStateToProps = (state) => ({
  appPage: state.app.appPage,
});

const mapDispatchToProps = (dispatch) => ({
  publicPage: (newPage) => dispatch(actions.changePublicPage(newPage)),
  createUserProfile: (profile) => dispatch(actions.saveProfile(profile)),
});

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.verifyUser = this.verifyUser.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
  }


  // verify user is called from the Login.jsx component
  // verify user will:
  //  (1) Submit the username and password
  //  (2) on successfull login, dispatch the reponse big ass object
  //      to the reducer
  verifyUser(event) {
    console.log('verify user');
    event.preventDefault();
    const form = document.getElementById('loginForm');
    const email = form[0].value;
    const password = form[1].value;
    const credentials = { email, password };

    // console.log(credentials)

    const method = 'POST';

    fetch('accounts/login', {
      method,
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((userProfile) => {
        console.log('userProfile', userProfile);
        const newUserProfile = userProfile;
        console.log('newUserProfile');
        const newPetsArray = newUserProfile.pets.map((el) => ({
          ...emptyPet,
          ...el,
        }));
        console.log('newPetsArray', newPetsArray);
        newUserProfile.pets = newPetsArray;
        this.props.createUserProfile(newUserProfile);
      })
      .catch((err) => console.log('getProfile: ERROR: ', err));
  }

  addNewUser(event) {
    // addNewUser user will:
    //  (1) Submit an object containing first name, last name,
    //      email, password to the server to create a new user
    //  (2) redirect the user back to the login page to login
    event.preventDefault();
    const form = document.getElementById('signupForm');
    const firstName = form[0].value;
    const lastName = form[1].value;
    const email = form[2].value;
    const password = form[3].value;
    const createUser = {
      firstName, lastName, email, password,
    };
    const method = 'POST';

    // console.log(createUser)

    fetch('accounts/register', {
      method,
      body: JSON.stringify(createUser),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.text())
      .then((helloUser) => {
        console.log(helloUser);
        this.props.publicPage('login');
      })
      .catch((err) => console.log('getProfile: ERROR: ', err));
  }

  render() {
    // render different components depending on app state

    switch (this.props.appPage) {
      case 'login':
        return (
          <Login publicPage={this.props.publicPage} saveProfile={this.verifyUser} />
        );
      case 'dashboard':
        return (
          <Dashboard id='Dashboard'/>
        );
      case 'signup':
        return (
          <Signup publicPage={this.props.publicPage} newUser={this.addNewUser} />
        );
      default:
        console.log('the props.appPage is undefined');
        break;
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
