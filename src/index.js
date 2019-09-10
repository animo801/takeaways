import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import * as firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyAPNBQZ42GXNdqj34B1Qo7dNVO7mp6Nl1g",
    authDomain: "takeaways-a50ef.firebaseapp.com",
    databaseURL: "https://takeaways-a50ef.firebaseio.com",
    projectId: "takeaways-a50ef",
    storageBucket: "takeaways-a50ef.appspot.com",
    messagingSenderId: "225761571590"
  };
  firebase.initializeApp(config);


ReactDOM.render((
    <BrowserRouter>
        <App /> 
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
