/**
 * ***********************************
 *
 * @module Profile
 * @author Austin Ruby and Michael Evans
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
import JSPDF from 'jspdf';
import html2canvas from 'html2canvas';

class Profile extends Component {
  constructor(props) {
    super(props);
    // this.updatePetDetails = this.updatePetDetails.bind(this);
    this.addVisit = this.addVisit.bind(this);
    this.addVaccine = this.addVaccine.bind(this);
    this.addSurgery = this.addSurgery.bind(this);
    this.savePet = this.props.savePet.bind(this);
    this.deletePet = this.deletePet.bind(this);
    this.changeDBPage = this.props.changeDBPage.bind(this);
    // this.adjustPet = this.adjustPet.bind(this);
    this.createPDF = this.createPDF.bind(this);
  }

  // NOTE: WE THINK THIS IS USED TO *ADD* PETS, NOT UPDATE THEM!
  // grab updated/newly added pet details
  // POST/PATCH to server
  // dispatch savePet action with response
  // updatePetDetails(event) {
  //   event.preventDefault();
  //   const form = document.querySelector('.pet-profile-details-form');
  //   const name = form.name.value;
  //   const type = form.type.value;
  //   const birthYear = form.birthyear.value;
  //   const gender = form.gender.value;
  //   const spayed = form.spayed.value;
  //   const { ownerID } = this.props;
  //   const petProfile = {
  //     name,
  //     type,
  //     birthYear,
  //     gender,
  //     spayed,
  //     ownerID,
  //   };

  //   fetch('/pets/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ pet: petProfile }),
  //   })
  //     .then((response) => response.json())
  //     .then((petObject) => {
  //       console.log(petObject);
  //       this.savePet(petObject);
  //     })
  //     .catch((err) => console.log(err));
  // }

  createPDF(e) {
    const input = document.querySelector('#pet-profile');
    const pdf = new JSPDF();
    if (pdf) {
      html2canvas(input, {
        useCORS: true
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        console.log(imgData); //Maybe blank, maybe full image, maybe half of image
        pdf.addImage(imgData, 'PNG', 5, 5);
        pdf.save('download.pdf');
      });
    }
    // const doc = new JSPDF();
    // let myText = `pet: ${this.props.activePet.name}\nname: ${this.props.activePet.type}\nbirth year: ${this.props.activePet.birthYear}\ngender: ${this.props.activePet.gender}\nspayed/neutered? ${this.props.activePet.spayed}`;
    // doc.text(myText, 10, 10);
    // doc.save(`${this.props.activePet.name}-petchart.pdf`);
  }

  // html2canvas(document.body).then(function(canvas) {
  //   document.body.appendChild(canvas);
  // });

  // grab visit details from form
  // PATCH to server
  // dispatch savePet action with response
  addVisit(event) {
    event.preventDefault();
    const form = document.querySelector('.visit-form');
    const date = form.date.value;
    const notes = form.notes.value;
    const vet = form.vet.value;
    const file = form.file.value;
    const petProfile = {
      id: this.props.activePet.id,
      date,
      notes,
      vet,
      file
    };
    return this.props.savePet(petProfile);
  }

  // grab vaccine details from form
  // PATCH to server
  // dispatch savePet action with response
  addVaccine(event) {
    event.preventDefault();
    const form = document.querySelector('.vaccine-form');
    const date = form.date.value;
    const name = form.name.value;
    const petProfile = {
      id: this.props.activePet.id,
      date,
      name
    };
    return this.props.savePet(petProfile);
  }

  // grab surgery details from form
  // PATCH to server
  // dispatch savePet action with them
  addSurgery(event) {
    event.preventDefault();
    const form = document.querySelector('.surgery-form');
    const date = form.date.value;
    const name = form.name.value;
    const petProfile = {
      id: this.props.activePet.id,
      date,
      name
    };
    return this.props.savePet(petProfile);
  }

  deletePet(id) {
    // event.preventDefault();
    console.log('id in deletepetreact is', id);

    // console.log('deletePetDetails activated');
    fetch('/pets/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(petObject => {
        console.log('petobj in react is', petObject);
        // add petObject number to redux for state update
        this.props.deletePet(petObject);
        this.changeDBPage('home');
      })
      .catch(err => console.log(err));
  }

  // adjustPet() {
  //   console.log('adjust pet fired in react component');

  //   const { ownerID } = this.props;
  //   const petProfile = {
  //     name: 'rover', // name,
  //     type: 'lab', // type,
  //     birthYear: '1993', // birthYear,
  //     gender: 'm', // gender,
  //     spayed: 'y', // spayed,
  //     ownerID, // ownerID,
  //   };

  //   fetch('/pets/', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ pet: petProfile }),
  //   })
  //   .then((response) => response.json())
  //   .then((petObj) => {
  //     console.log('pet obj in react PUT fetch request was', petObj);
  //   })
  // }

  render() {
    console.log(this.props);
    const { activePet } = this.props;
    // console.log(activePet.name);

    const visitsListItems = [];
    const vaccinesListItems = [];
    const surgeriesListItems = [];

    // if activePet exists, generate arrays of Visit, Vaccine, and Surgery components
    if (activePet.id) {
      for (let i = 0; i < 5; i += 1) {
        if (activePet.visits[i]) {
          visitsListItems.push(<Visit visit={activePet.visits[i]} key={`visit-${i}`} />);
        }
        if (activePet.vaccines[i]) {
          vaccinesListItems.push(<Vaccine vaccine={activePet.vaccines[i]} key={`vaccine-${i}`} />);
        }
        if (activePet.surgeries[i]) {
          surgeriesListItems.push(
            <Surgery surgery={activePet.surgeries[i]} key={`surgery-${i}`} />
          );
        }
      }
    }

    return (
      <div className="profile-container" id="pet-profile">
        <section className="profile-header">
          <div className="profile-header-content">
            <div className="img-name">
              <img src="/build/images/dog.png" alt="pet profile pic" />
              <h1>{activePet.name}</h1>
            </div>
            {/* // redirects to update page */}
            <input
              type="submit"
              value="Update Pet Details"
              onClick={() => {
                this.changeDBPage('update', activePet);
              }}
            />
            {/* // use to submit update info */}
            {/* <input 
              type="submit" 
              value="Adjust Pet Details" 
              onClick={() => {
                this.adjustPet();
              }}
              /> */}
            <input
              type="submit"
              value="Remove Pet Data"
              onClick={() => {
                this.deletePet(activePet.id);
              }}
            />
            <input type="submit" value="Download PDF" onClick={this.createPDF} />
          </div>

          <div className="pet-profile-details-container">
            <form className="pet-profile-details-view">
              <label>
                <strong>Name:</strong> {activePet.name};
              </label>
              <label>
                <strong>Type:</strong> {activePet.type};
              </label>
              <label>
                <strong>Birth Year:</strong> {activePet.birthYear};
              </label>
              <label>
                <strong>Gender:</strong> {activePet.gender}
              </label>
              <label>
                <strong>Spayed/Neutered?</strong> {activePet.spayed};
              </label>
            </form>
          </div>
        </section>
        <section className="profile-body">
          <div className="visits-container">
            <h3>Past Visits</h3>
            <form className="visit-form">
              {/* <label>
                <strong>Notes:</strong>
              </label>
              <label>
                <strong>Vet:</strong>
              </label> */}
            </form>
            <ul className="visits">{visitsListItems}</ul>
            <div className="vaccines-surgeries">
              <div className="vaccines-container">
                <h3>Vaccines</h3>
                <ul className="vaccines-list">{vaccinesListItems}</ul>
              </div>
              <div className="surgeries-container">
                <h3>Surgeries</h3>
                <form className="surgery-form" />
                <ul className="surgeries-list">{surgeriesListItems}</ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Profile;
