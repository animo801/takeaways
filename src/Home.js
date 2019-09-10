import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'
import deleteIcon from './images/bin-paper-2.svg'
import Modal from './Modal'

class Home extends Component {
    constructor(){
        super(); 
        this.state = {
            projectName: '',
            items: [], 
            user: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChange = this.handleChange.bind(this);
    }
    
     componentDidMount(props) {
         firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
            // User is signed in.
                this.setState({
                    user: user.uid
                },()=>{
                     const itemsRef = firebase.database().ref(this.state.user + '/project');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    projectName: items[item].projectName
                });
            }
            this.setState({
                items: newState
            });
        });
                });
            } else {
            // No user is signed in.
                this.props.history.push('/login');
            }
        });
         
        
       
//        
//        firebase.auth().onAuthStateChanged(function(user) {
//            if (user) {
//            // User is signed in.
//                this.setState({
//                    user: user.uid,
//                });
//            } else {
//            // No user is signed in.
//            }
//        }.bind(this));
        

    }
    
    
    handleSubmit(e) {
        e.preventDefault();

        const itemsRef = firebase.database().ref(this.state.user + '/project');
        const item = {
            projectName: this.state.projectName
        }
        itemsRef.push(item);

    }   
    
    
    // What does this do? I don't have the slightest clue.
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    deleteStuff(itemId) {
        const itemRef = firebase.database().ref(this.state.user + `/project/${itemId}`); 
        itemRef.remove();
        
    }
    
    render(){
        return(
    <div>
        <h4 class="projectLabelHomePage">Projects</h4>        
    {this.state.items.map( (item, key) => {
                    return (
                            <div className="rad col-sm-3 offset-sm-1">
                                <Link to={item.id}>
                                    <h3 class="textOnCardsOnHomePage">{item.projectName}</h3>
                                </Link>
                                <img src={deleteIcon} class="deleteIcon" alt="winning" data-toggle="modal" data-target="#deleteModal"/>
                            
                            <div class="modal" id="deleteModal">
                                <div class="modal-dialog">
                                <div class="modal-content">

                                  <div class="modal-header">
                                    <h4 class="modal-title">Modal Heading</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                  </div>

                                  <div class="modal-body">

                                      <h4>Are you sure you want to delete? I promise you can't get this back.</h4>

                                  </div>

                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">
                                        No
                                    </button>
                                    <button type="submit" class="btn btn-success" data-dismiss="modal" onClick={() => this.deleteStuff(item.id)}>
                                        Yes
                                    </button>
                                  </div>

                                </div>
                              </div>
                            </div>
                            </div>
                    )
                })}            
                
                <div class="col-sm-3 offset-sm-1 addAProjectButton"> 
                    <button class="addButtonHomePage" type="button" data-toggle="modal" data-target="#newProjectModal">+</button>
                    <h4>Add Project</h4>
                </div>
            <div>
            <div class="modal" id="newProjectModal">
              <div class="modal-dialog">
                <div class="modal-content">

                  <div class="modal-header">
                    <h4 class="modal-title">Modal Heading</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                
                  <div class="modal-body">
                        <input input type ="text" name="projectName" placeholder="New project name" onChange={this.handleChange} value={this.state.projectName}/>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-success" data-dismiss="modal" onClick={this.handleSubmit}>Create project</button>
                  </div>
                 
                </div>
              </div>
            </div>
      </div>
    
    </div>
)}
}
export default Home
