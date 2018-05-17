import React, { Component } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Home } from './containers/Home/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
