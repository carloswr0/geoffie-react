import React, { Component } from 'react';
import logo from '../../../Assets/worldwide.svg';
import './LandingPage.css';

class LandingPage extends Component {
    render() {
    return (
        <div className="landing-page">
            <img src={logo} className="geoffie-landing-logo" alt="Geoffie"/> 
            <p className="geoffie-landing-loading-text">LOADING</p>   
        </div>
    );
  }
}

export default LandingPage;
