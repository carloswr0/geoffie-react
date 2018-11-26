import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GameOver.css';

  class GameOver extends Component {
    render() {
    return (
        <div className="game-over-modal-container">
            <div className="game-over-modal">
                <h1>GAME OVER</h1>
                <h2>SCORE: {this.props.props.points} OF {this.props.props.round+1}</h2>
                <Link className="settings-exit" to={`/`}>
                    BACK
                </Link>
            </div>
        </div>

    );
  }
}

export default GameOver;
