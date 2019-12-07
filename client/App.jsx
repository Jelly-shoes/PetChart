/**
 * ************************************
 *
 * @module  App.jsx
 * @author Austin Ruby and Michael Evans
 * @date 10/12/2019
 * @description renders MainContainer
 *
 * ************************************
 */

import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="mainContainerWrapper">
        <MainContainer />
      </div>
    );
  }
}


export default App;
