import React, { Component } from 'react'
import * as firebase from 'firebase'

class InterviewQandA extends Component {
   


    componentDidMount(props) {
        
    }




    


// The goal: display quesitons and give a space to write out answers to those questions
    
    render(){
        return(
           <div class="interviewQandA"> 
                <h2>Why is the world so great?</h2>
                <textarea class="customTextbox" placeholder="Type answer here"></textarea>
            </div> 
    )

    }
}   

export default InterviewQandA