/**
 * ***********************************
 *
 * @module Dashboard
 * @author Austin Ruby and Michael Evans
 * @date 10/12/2019
 * @description stateful component that renders
 * nav bar, home page, and pet profile
 *
 * ***********************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

import Home from '../components/Home.jsx';
import Nav from '../components/Nav.jsx';
import Profile from '../components/Profile.jsx';
import AddPet from '../components/AddPet.jsx';
import UpdatePet from '../components/UpdatePet.jsx';

const mapStateToProps = state => ({
  userProfile: state.app.userProfile,
  dashboardPage: state.app.dashboardPage,
  activePet: state.app.activePet,
  appPage: state.app.appPage
});

const mapDispatchToProps = dispatch => ({
  changeDBPage: (pageName, activePet) => dispatch(actions.changeDBPage(pageName, activePet)),
  savePet: petProfile => dispatch(actions.savePet(petProfile)),
  deletePet: petProfile => dispatch(actions.deletePet(petProfile)),
  updatePet: petProfile => dispatch(actions.updatePet(petProfile)),
  logout: newPage => dispatch(actions.logout(newPage))
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // bind activatePet method
    this.activatePet = this.activatePet.bind(this);
    // parse out relevant pet details from state to pass down to Nav component
    // this.petNavDetails = props.userProfile.pets.reduce((acc, el) => {
    //   acc.push({
    //     id: el.id,
    //     name: el.name,
    //   });
    //   return acc;
    // }, []);
    // // parse out relevant pet details from state to pass down to Home component
    // this.petHomeDetails = props.userProfile.pets.reduce((acc, el) => {
    //   acc.push({
    //     id: el.id,
    //     name: el.name,
    //     profilePic: el.profilePic,
    //   });
    //   return acc;
    // }, []);
  }

  activatePet(event) {
    // shorten typing of pets array
    const petsArray = this.props.userProfile.pets;
    // grab pet to activate's id from click event
    const activePetId = Number(event.target.id);
    // iterate through pets array to find clicked pet's details object
    for (let i = 0; i < petsArray.length; i += 1) {
      if (petsArray[i].id === activePetId) {
        // once pet is found, dispatch changeDBPage action with pet's info
        return this.props.changeDBPage('profile', petsArray[i]);
      }
    }
    console.log('pet not found');
    return 'pet not found';
  }

  render() {
    // console.log('Dashboard petNavDetails: ', this.petNavDetails);
    // set default childPage to Home component
    const homeComponent = (
      <Home
        changeDBPage={this.props.changeDBPage}
        pets={this.props.userProfile.pets}
        activatePet={this.activatePet}
        owner={this.props.userProfile.owner.firstName}
      />
    );
    let childPage = homeComponent;
    // check if state dashboardPage is home or profile and render corresponding component
    switch (this.props.dashboardPage) {
      case 'home':
        // MOVE AND COMBINE LINES 78 & 79 TO REPLACE THE LINE BELOW
        childPage = homeComponent;
        break;
      case 'profile':
        childPage = (
          <Profile
            changeDBPage={this.props.changeDBPage}
            activePet={this.props.activePet}
            savePet={this.props.savePet}
            deletePet={this.props.deletePet}
            ownerID={this.props.userProfile.owner.id}
            id="Profile"
          />
        );
        break;
      case 'add':
        childPage = (
          <AddPet
            changeDBPage={this.props.changeDBPage}
            activePet={this.props.activePet}
            savePet={this.props.savePet}
            ownerID={this.props.userProfile.owner.id}
          />
        );
        break;
      case 'update':
        childPage = (
          <UpdatePet
            changeDBPage={this.props.changeDBPage}
            activePet={this.props.activePet}
            savePet={this.props.savePet}
            ownerID={this.props.userProfile.owner.id}
            updatePet={this.props.updatePet}
          />
        );
        break;
      default:
        break;
    }
    return (
      // always render Nav component and whatever childPage is set to
      <div id="dashboardWrapper">
        <Nav
          logout={this.props.logout}
          changeDBPage={this.props.changeDBPage}
          activatePet={this.activatePet}
          owner={this.props.userProfile.owner.firstName}
          pets={this.props.userProfile.pets}
        />
        {childPage}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
