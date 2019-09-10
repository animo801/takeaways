import React, { Component } from 'react'
import InterviewHeader from'./InterviewHeader'
import InterviewTakeaways from './InterviewTakeaways'

class interview extends Component {
    constructor(){
        super(); 
    }
    
    render(){
        return(
            <div>
                <InterviewHeader {...this.props}/>
                <InterviewTakeaways {...this.props}/>
            </div>
        )
    }
}
export default interview
