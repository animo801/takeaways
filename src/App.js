import React, { Component } from 'react'
import Header from './Header'
import Main from './Main' 

class App extends Component {
  constructor(){
      super(); 
      this.state = {
      };
  }
    
    
  render(){
    return (
        <div> 
        <Header />
        <Main />
    </div>
  );
        }
}
export default App

// This is a trial run at making the compnoent have props
// class App extends Component {
//     constructor() {
//         super();
//         this.state = {

//         }
//     }
//     renter() {
//     <div> 
//         <Header />
//         <Main />
//     </div>
//     }
// }

