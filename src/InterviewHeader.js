import React, { Component } from 'react'
import {Text} from './api'
import * as firebase from 'firebase';

class InterviewHeader extends Component {
    constructor(){
        super(); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.state = {
            name: "Molly Metcalf",
            jobTitle: "Speech Therapist @ Granite Schools",
            jobExperience: "Tons", 
            linkToPrototype: 'www.invisionapp.com', 
        };
    }
    

    handleSubmit(event) {
        event.preventDefault();
        // Get file
        var file = this.fileInput.current.files[0]; 

        var metadata = {
            contentType: 'audio/mpeg',
        };

        // Put name of file into database
        const referenceToDatabase = firebase.database().ref(   this.state.user + '/project/' + this.props.match.params.id + '/interviews/' + this.props.match.params.interviewName);

        console.log (referenceToDatabase, "Ref to database");

        const item = {
            nameOfAudioFile: this.fileInput.current.files[0]
        }
        referenceToDatabase.push(item);
        this.setState({
            nameOfAudioFile: ''
        });
        
        
        
        
        var uploadLink = "user/" + this.state.user + "/audioRecordings/" +this.fileInput.current.files[0].name;
        
        var uploadLink2 = "user/" + this.state.user;

        // Create storage ref  
        var storageRef = firebase.storage().ref(uploadLink);

        // Upload File
        storageRef.put(file,metadata).then(function(snapshot) {
            firebase.storage().ref(uploadLink2).child("/audioRecordings/" +this.fileInput.current.files[0].name).getDownloadURL().then(function(url){
            console.log(url, "URL");
                
            })
        }.bind(this));
        
        
    }



    componentDidMount(props) { 

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user:user.uid
                }, ()=>{
                    const storage = firebase.storage(); 
                    //ben.mp3 or Win.m4a but .m4a does not work right now. But I need it to work because that is the file type for Voice Memos

                    //This is for uploading new files to the cloud. BLOB stuff
                    var storageRefTwo = firebase.storage().ref('thing/Test.mp3'); 




                    // This code sets the SRC of the audio tab to the URL for 'thing/Test.mp3'. Now I just need to make it work for the thing that I just uploaded. Ehh!
                    storageRefTwo.getDownloadURL().then(function(url) {
                        console.log("URL", url);

                        let audio = document.getElementById('audio');
                        audio.src = url;
                        audio.load(); 

                    }).catch(function(error){
                    });
                })
            }
        })




    }

    render(){
        return (
            <div className="InterviewHeader row"> 
            <h1>{this.state.nameOfAudioFile}</h1>
            <div className="col-sm-2 offset-sm-1">
            <p>Name</p>
            <h4 className="InterviewHeaderh4">
            {this.state.name}
            </h4>
            </div> 
            <div contenteditable="true" className="col-sm-1">
            <p>Job Title</p>
            <h4>{this.state.jobTitle}</h4>
            </div> 

            <div className="col-sm-4"> 
            <audio id="audio" controls>
            <source type="audio/mpeg" src="https://firebasestorage.googleapis.com/v0/b/takeaways-a50ef.appspot.com/o/user%2FOWLb9vB57bYODTC7ajj637FDhu72%2FaudioRecordings%2FTest.mp3?alt=media&token=71b5e2be-a89f-4d69-aaf0-ad0e63bef248"/>
            </audio>
            </div>

            <div className="col-sm-4">
            <form onSubmit={this.handleSubmit}>
            <label>
            Upload file:
            <input type="file" ref={this.fileInput} />
            </label>
            <br />
            <button type="submit">Submit</button>
            </form>
            </div>

            </div>
        );
    }
}

export default InterviewHeader