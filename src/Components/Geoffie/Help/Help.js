import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Help.css';

  class GameOver extends Component {
    render() {
    return (
        <div className="game-lobby credits">
            <h1 className="help-title">HELP</h1>
            <p className="help-p">THIS GAME WAS MADE BY CARLOS WILTHEW</p>
            <Link className="settings-exit" to={`/`}>
                BACK
            </Link>
        </div>
    );
  }
}

export default GameOver;
