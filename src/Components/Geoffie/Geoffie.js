import React, { Component } from 'react';
import LandingPage from './LandingPage/LandingPage';
import Capitals from './Capitals/Capitals';
import Lobby from './Lobby/Lobby';
import Help from './Help/Help';
import { BrowserRouter as Router, Route} from 'react-router-dom' ;
import Settings from './Settings/Settings';

class Geoffie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      questionsToPlay: 10,
      timePerQuestion: 20000,
      regionsToPlay: 
        [
          {name: "Africa", enabled: false},
          {name: "Americas", enabled: true},
          {name: "Asia", enabled: false},
          {name: "Europe", enabled: false},
          {name: "Oceania", enabled: false},
        ],
    };
    this.changeSettings = this.changeSettings.bind(this);
  }
      
  componentDidMount() {
    this.fetchingInitData();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  fetchingInitData() {
    fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;region;')
    .then(results => { return results.json()})
    .then(response => {
      this.setState({
        data: response,
        loading: false,
      });
    },(error) => {
      if (error) {
        console.log("Error in request.");
      }
    });
  }

  changeSettings(settings, value) {
    switch (settings) {
      case "questions":
        this.setState({
          questionsToPlay: value
        });
      break;

      case "time":
        this.setState({
          timePerQuestion: value
        });
      break;

      case "continents":
        const continentsSettings = this.state.regionsToPlay;
        const position = continentsSettings.findIndex(e => e.name === value)
        continentsSettings[position].enabled = !this.state.regionsToPlay[position].enabled;
        if(continentsSettings.filter(e=>e.enabled) < 1) {
          console.log("Cant Start a Game withound continents selected");
        } else {
          this.setState({
            regionsToPlay: continentsSettings,
          });
        }
      break;

      default:
      console.log("Error in change settings switch.");
      break;
    }
  }

  render() {
    const loading = this.state.loading;
    return (
      <React.Fragment>
        {
          loading ? <LandingPage/> : 
          <Router>
            <React.Fragment>
              <Route path="/"         render={(props) => <Lobby     {...props} props={this.state}/>} exact={true} />
              <Route path="/capitals" render={(props) => <Capitals  {...props} props={this.state} />}/>
              <Route path="/settings" render={(props) => <Settings  {...props} props={this.state}  changeSettings={this.changeSettings} />}/>
              <Route path="/help"     render={(props) => <Help      {...props} props={this.state} />}/>
            </React.Fragment>
          </Router>
        }
      </React.Fragment>
    );
  }
}

export default Geoffie;
