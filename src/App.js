import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props)  {
    super(props);
  }


  componentDidMount(){
    const decoder = new TextDecoder('utf-8');
    fetch("http://localhost:4000").then(function(response) {
      var reader = response.body.getReader();
      
      function search() {
        reader.read().then(function(result) {

          // console.log(decoder.decode(result.value));
          if (result.done) {
            console.log("completed reading");
            return ;
          }

            console.log("**********function execution***********************")
            JSONParser(decoder.decode(result.value))
            // console.log(result)

           search();
        })
      }
      search();
    });

    var parser={
      objstarti:0,
      objendi:0,
      position:0,
      openObjectCount: 0,
      openArrayCount: 0,
      remString : '',
      callbacks: {
        'onObjectCreated': []
      }
  };

  var test = Object.create({});


  var z =0;
  const obj = {};
  
  function JSONParser(data){
  
  
      // for(let x =0; x < data.length; x++){
          // if(t===1){
          //     console.log("restring",parser.remString);
          // }
          
          data = parser.remString + data;
  
          parser.openObjectCount=0;
          parser.objstarti=0;
          parser.objendi=0;
          let c,x =0;
          c = data[0]
  
          while(c){
          c = data.charAt(x++);
          parser.position++;
  
          if(c==='['){
              parser.openArrayCount++;
          }
          if(c==='{'){
             
              if(parser.openObjectCount===0){
                  parser.objstarti=x-1;
              }
              parser.openObjectCount++;
          }
          if(c==='}'){
              parser.openObjectCount--;
              if(parser.openObjectCount===0){
                  // console.log("ojendi assign",parser.objstarti,  x);
                  parser.objendi = x-1;
  
              let extObj = data.substring(parser.objstarti, parser.objendi+1);
  
              console.log("object extracted-----", extObj );
              console.log("**************************************",z,"*****************************************************************"    );
              z++;
              // break;
              }
          }
  
          if(c===']'){
              parser.openArrayCount--;
              if(parser.openArrayCount===0){
                  console.log("end of array of objects");
              }
          }
  
      }
  
      parser.remString = data.substring(parser.objendi+1, data.length);
      // console.log("remstring",parser.remString);
      // console.log("**************************************","*****************************************************************"    );
      // console.log("----",parser.remString)
  }
  
  
  
    
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
