import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import parser from './parser';

class App extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      objArr: []
    }
  }


  componentDidMount(){

    const handler = (myvalue) => {
      console.log("*********************************", myvalue);
      
    }

    parser.addListener('onObjectCreated', handler);
    const url = "http://localhost:4000"
    parser.write(url);

}

  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
