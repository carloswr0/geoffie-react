import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

class Settings extends Component {
  render() { 
    const regionDisplay = this.props.props.regionsToPlay;
    const questionsDisplay = this.props.props.questionsToPlay;
    const timeDisplay = this.props.props.timePerQuestion;
    return (
      <div className="settings-page">
        <div className="settings-title">
          <h1>SETTINGS</h1>
        </div>
        <div className="settings-category">
          <h2 className="category-title">Questions</h2>
          <div className="settings-option-grid horizontal">
            <div 
              onClick={(e) => this.props.changeSettings("questions", 10)} 
              className={`settings-option ${questionsDisplay === 10? 'activated':''}`}
            >
              10q
            </div>
            <div 
              onClick={(e) => this.props.changeSettings("questions", 20)} 
              className={`settings-option ${questionsDisplay === 20? 'activated':''}`}
            >
              20q
            </div>
            <div 
              onClick={(e) => this.props.changeSettings("questions", 50)} 
              className={`settings-option ${questionsDisplay === 50? 'activated':''}`}
            >
              50q
            </div>
          </div>
        </div>
        <div className="settings-category">
          <h2 className="category-title">Time</h2>
          <div className="settings-option-grid horizontal">
            <div 
              onClick={(e) => this.props.changeSettings("time", 10000)} 
              className={`settings-option ${timeDisplay === 10000? 'activated':''}`}>
              10s
            </div>
            <div 
              onClick={(e) => this.props.changeSettings("time", 20000)} 
              className={`settings-option ${timeDisplay === 20000? 'activated':''}`}>
              20s
            </div>
            <div 
              onClick={(e) => this.props.changeSettings("time", 60000)} 
              className={`settings-option ${timeDisplay === 60000? 'activated':''}`}>
              60s
            </div>
          </div>
        </div>
        <div className="settings-category">
          <h2 className="category-title">Continents</h2>
          <div className="settings-option-grid vertical">
            <div className="settings-option-row">
              <span>Africa</span>
              <div 
                onClick={(e) => this.props.changeSettings("continents", "Africa")} 
                className={`settings-option continent ${regionDisplay[0].enabled ? 'activated':''}`}>
              </div>
            </div>
            <div className="settings-option-row">
              <span>America</span>
              <div 
                onClick={(e) => this.props.changeSettings("continents", "Americas")} 
                className={`settings-option continent ${regionDisplay[1].enabled ? 'activated':''}`}>
              </div>
            </div>
            <div className="settings-option-row">
              <span>Asia</span>
              <div 
                onClick={(e) => this.props.changeSettings("continents", "Asia")} 
                className={`settings-option continent ${regionDisplay[2].enabled ? 'activated':''}`}>
              </div>
            </div>
            <div className="settings-option-row">
              <span>Europe</span>
              <div 
                onClick={(e) => this.props.changeSettings("continents", "Europe")} 
                className={`settings-option continent ${regionDisplay[3].enabled ? 'activated':''}`}>
              </div>
            </div>
            <div className="settings-option-row">
              <span>Oceania</span>
              <div 
                onClick={(e) => this.props.changeSettings("continents", "Oceania")} 
                className={`settings-option continent ${regionDisplay[4].enabled ? 'activated':''}`}>
              </div>
            </div>
          </div>
        </div>
        <div className="settings-category">
          <Link className="settings-exit" to={`/`}>
            BACK
          </Link>
        </div>
      </div>
    );
  }
}

export default Settings;
