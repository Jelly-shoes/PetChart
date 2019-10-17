/**
 * ***********************************
 *
 * @module AddPet
 * @author Tom Herrmann and Chris Flannery
 * @date 10/12/2019
 * @description functional component that displays
 * a specific pet's profile info and allows the user
 * to modify that information
 *
 * ***********************************
 */

import React, { Component } from 'react';

import Visit from './Visit.jsx';
import Vaccine from './Vaccine.jsx';
import Surgery from './Surgery.jsx';

class UpdatePet extends Component {
  constructor(props) {
    super(props);
    // this.updatePetDetails = this.updatePetDetails.bind(this);
    // this.addVisit = this.addVisit.bind(this);
    // this.addVaccine = this.addVaccine.bind(this);
    // this.addSurgery = this.addSurgery.bind(this);
    this.updatePet = this.updatePet.bind(this);
  }

  // grab updated/newly added pet details
  // POST/PATCH to server
  // dispatch savePet action with response
  updatePet(event) {
    console.log('state in updatepet react is', this.state);
    console.log('props in updatepetreact is', this.props);
    event.preventDefault();
    const form = document.querySelector('.pet-profile-details-form');
    const name = form.name.value;
    const type = form.type.value;
    const birthYear = form.birthyear.value;
    const gender = form.gender.value;
    const spayed = form.spayed.value;
    const { ownerID } = this.props;
    const petId =  this.props.activePet.id;
    const petProfile = {
      name,
      type,
      birthYear,
      gender,
      spayed,
      ownerID,
      petId,
    };

    fetch('/pets/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pet: petProfile })
    })
      .then(response => response.json())
      .then(petObj => {
        console.log('pet obj in react PUT fetch request was', petObj);
      })
      .catch(err => console.log(err));
  }

  // // grab visit details from form
  // // PATCH to server
  // // dispatch savePet action with response
  // addVisit(event) {
  //   event.preventDefault();
  //   const form = document.querySelector('.visit-form');
  //   const date = form.date.value;
  //   const notes = form.notes.value;
  //   const vet = form.vet.value;
  //   const file = form.file.value;
  //   const petProfile = {
  //     id: this.props.activePet.id,
  //     date,
  //     notes,
  //     vet,
  //     file
  //   };
  //   return this.props.savePet(petProfile);
  // }

  // // grab vaccine details from form
  // // PATCH to server
  // // dispatch savePet action with response
  // addVaccine(event) {
  //   event.preventDefault();
  //   const form = document.querySelector('.vaccine-form');
  //   const date = form.date.value;
  //   const name = form.name.value;
  //   const petProfile = {
  //     id: this.props.activePet.id,
  //     date,
  //     name
  //   };
  //   return this.props.savePet(petProfile);
  // }

  // // grab surgery details from form
  // // PATCH to server
  // // dispatch savePet action with them
  // addSurgery(event) {
  //   event.preventDefault();
  //   const form = document.querySelector('.surgery-form');
  //   const date = form.date.value;
  //   const name = form.name.value;
  //   const petProfile = {
  //     id: this.props.activePet.id,
  //     date,
  //     name
  //   };
  //   return this.props.savePet(petProfile);
  // }

  render() {
    console.log(this.props);
    const { activePet } = this.props;
    console.log('THIS IS THE PROPS on UPDATE', this.props);
    // console.log(activePet.name);

    // const visitsListItems = [];
    // const vaccinesListItems = [];
    // const surgeriesListItems = [];

    // if activePet exists, generate arrays of Visit, Vaccine, and Surgery components
    // if (activePet.id) {
    //   for (let i = 0; i < 5; i += 1) {
    //     if (activePet.visits[i]) {
    //       visitsListItems.push(<Visit visit={activePet.visits[i]} key={`visit-${i}`} />);
    //     }
    //     if (activePet.vaccines[i]) {
    //       vaccinesListItems.push(<Vaccine vaccine={activePet.vaccines[i]} key={`vaccine-${i}`} />);
    //     }
    //     if (activePet.surgeries[i]) {
    //       surgeriesListItems.push(
    //         <Surgery surgery={activePet.surgeries[i]} key={`surgery-${i}`} />
    //       );
    //     }
    //   }
    // }

    return (
      <div className="profile-container">
        <section className="profile-header">
          <div className="img-name">
            {/* <img src={`"${activePet.profilePic}"`} alt="pet profile pic" /> */}
            <h1>{activePet.name}</h1>
          </div>
          <div className="pet-profile-details-container">
            <form className="pet-profile-details-form">
              <p>Add/update pet details:</p> <br />
              <label>
                Name:
                <input type="text" name="name" id="pet-name-input" />
              </label>
              <label>
                Type:
                <input type="text" name="type" id="pet-type-input" />
              </label>
              <label>
                Birth Year:
                <input type="text" name="birthyear" id="pet-birth-year-input" />
              </label>
              <label>
                Gender:
                <input type="text" name="gender" id="pet-gender-input" />
              </label>
              <label>
                Spayed/Neutered?
                <input type="text" name="spayed" id="pet-spayed-input" />
              </label>
              <input 
              type="submit" 
              value="Adjust Pet Details" 
              onClick={this.updatePet}
               />
            </form>
          </div>
        </section>
        {/* <section className="profile-body">
          <div className="visits-container">
            <h3>Visits</h3>
            <form className="visit-form">
              Add a visit <br />
              <label>
                Date:
                <input type="text" name="date" id="visit-date-input" />
              </label>
              <label>
                Notes:
                <input type="text" name="notes" id="visit-notes-input" />
              </label>
              <label>
                Vet:
                <input type="text" name="vet" id="visit-vet-input" />
              </label>
              <label>
                Upload a file:
                <input type="text" name="file" id="visit-file-input" />
              </label>
              <input type="submit" value="Save Visit" onClick={this.addVisit} />
            </form>
            <div className="vaccines-surgeries">
              <div className="vaccines-container">
                <h3>Vaccines</h3>
                <form className="vaccine-form">
                  Add a vaccine <br />
                  <label>
                    Date:
                    <input type="text" name="date" id="vaccine-date-input" />
                  </label>
                  <label>
                    Name:
                    <input type="text" name="name" id="vaccine-name-input" />
                  </label>
                  <input type="submit" value="Save Vaccine" onClick={this.addVaccine} />
                </form>
                <ul className="vaccines-list">{vaccinesListItems}</ul>
              </div>
              <div className="surgeries-container">
                <h3>Surgeries</h3>
                <form className="surgery-form">
                  Add a surgery <br />
                  <label>
                    Date:
                    <input type="text" name="date" id="surgery-date-input" />
                  </label>
                  <label>
                    Name:
                    <input type="text" name="name" id="surgery-name-input" />
                  </label>
                  <input type="submit" value="Save Surgery" onClick={this.addSurgery} />
                </form>
                <ul className="surgeries-list">{surgeriesListItems}</ul>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    );
  }
}

export default UpdatePet;
