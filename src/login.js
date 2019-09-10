import React, { Component } from 'react'
import * as firebase from 'firebase';

class login extends Component {
    componentDidMount(){
        var firebase = require('firebase');
        var firebaseui = require('firebaseui');
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        
        var uiConfig = {
          callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
              // User successfully signed in.
              // Return type determines whether we continue the redirect automatically
              // or whether we leave that to developer to handle.
              return true;
            },
            uiShown: function() {
              // The widget is rendered.
              // Hide the loader.
              document.getElementById('loader').style.display = 'none';
            }
          },
          // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
          signInFlow: 'popup',
          signInSuccessUrl: '/',
          signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
          // Terms of service url.
          tosUrl: '<your-tos-url>',
          // Privacy policy url.
          privacyPolicyUrl: '<your-privacy-policy-url>'
        };
        
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }
    
    
    render(){
        return(
            <div>
                <h1>Welcome to My Awesome App</h1>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div>
            </div>
        )
    }
}
export default login
