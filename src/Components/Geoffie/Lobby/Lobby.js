import React, { Component } from 'react';
import logo from '../../../Assets/worldwide.svg';
import { Link } from 'react-router-dom';
import './Lobby.css';

class Lobby extends Component {
    render() {
       
    return (
        <div className="game-lobby">
            <div className="upper-menu">
                <img src={logo} className="geoffie-landing-logo" alt="Geoffie"/> 
                <h1 className="geoffie-landing-header">GEOFFIE</h1>
            </div>
            <div className="menu">
                <Link className="menu-option-container option" to={`/capitals`}>Start</Link>
                <Link className="menu-option-container option" to={`/settings`}>Settings</Link>
                <Link className="menu-option-container option" to={`/help`}>Help</Link>
            </div>
            <div className="bottom-menu">
                <span>Developed by Carlos Wilthew</span>
            </div>
        </div>
    );
  }
}

export default Lobby;
