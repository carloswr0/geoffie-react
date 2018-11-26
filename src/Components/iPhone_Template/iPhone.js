import React, { Component } from 'react';
import Geoffie from '../Geoffie/Geoffie';
import './iPhone.css';

class Iphone extends Component {
  render() {
    //This is only for creative, view, desing to mobile porpouses only.
    //if you dont want this iphone template, just grab "Geoffie" component and paste it in App.js
    return (
        <div className="wrapper">
            <div className="iphone">
                <div className="power"></div>
                <div className="lock"></div>
                <div className="volume up"></div>
                <div className="volume down"></div>
                <div className="camera"></div>
                <div className="speaker"></div>
                <div className="screen">
                <Geoffie>
                </Geoffie>
                </div>
                <div className="button">
                    <div className="square"></div>
                </div>
            </div>
        </div>
    );
  }
}

export default Iphone;
