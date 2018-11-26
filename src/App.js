import React, { Component } from 'react';
import './App.css';
import Iphone from './Components/iPhone_Template/iPhone';
import Geoffie from './Components/Geoffie/Geoffie';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        mobile: false,
      };
    }

  componentDidMount() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.setState({mobile: true});
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.mobile ? <div className="mobile-container"><Geoffie></Geoffie></div> :  <Iphone></Iphone>
        }
      </React.Fragment>
 
    );
  }
}

export default App;
