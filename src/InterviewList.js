import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import deleteIcon from './images/bin-paper-2.svg'

class InterviewList extends Component {
    constructor(){
        super(); 
        this.state= {
            interviewName: '',
            items:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChange = this.handleChange.bind(this);
    }




    componentDidMount(props) {
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
                this.setState({
                    user:user.uid
                },()=>{
                    const itemsRef = firebase.database().ref(this.state.user + '/project/' + this.props.id + '/interviews');

                    itemsRef.on('value', (snapshot) => {
                        let items = snapshot.val();
                        let newState = [];
                        for (let item in items) {
                            newState.push({
                                id: item,
                                interviewName: items[item].interviewName
                            });
                        }

                        this.setState({
                            items: newState
                        });
                    });   
                });
            } else {

            }
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref(this.state.user + '/project/'+ this.props.id + "/interviews");

        const item = {
            interviewName: this.state.interviewName
        };

        itemsRef.push(item);
        this.setState({
            interviewName: '',
        });
    }   


    // What does this do? I don't have the slightest clue.
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    deleteStuff(itemId) {
        const itemRef = firebase.database().ref(this.state.user + '/project/' + this.props.id + '/interviews/' + itemId); 
        itemRef.remove();
    }

    // In the Link on this page, we need to make it so it will link to the charlieBrownID/InterviewListID. Not sure how to do this, but that is the next step. 

    render(){
        return(
            <div>
                {this.state.items.map( item => {
                    return(
                        <div className="rad col-sm-2"> 
                            <Link to={this.props.id + '/' + item.id}>
                                <h3 class="tryingToWin">{item.interviewName}</h3>
                            </Link>
                            <img src={deleteIcon} class="deleteIcon" alt="winning" data-toggle="modal" data-target="#deleteModal2"/>


                            <div class="modal" id="deleteModal2">
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
                    <button class="addButtonHomePage" type="button" data-toggle="modal" data-target="#newProjectModal2">+</button>
                    <h4>Add Project</h4>
                </div>


                <div class="modal" id="newProjectModal2">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h4 class="modal-title">Modal Heading</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body">
                                <input input type ="text" name="interviewName" placeholder="New interview name" onChange={this.handleChange} value={this.state.interviewName}/>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-success" data-dismiss="modal" onClick={this.handleSubmit}>Create project</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>       
        )
    }
}   

export default InterviewList


