import React, { Component } from 'react'
import * as firebase from 'firebase'
import InterviewList from './InterviewList'


class charlieBrown extends Component {
    constructor(){
        super();         
        this.state = {
            description: '',
            goal: '',
            interviewName: '',
            items: [], 
            name: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.saveChangetoFirebase = this.saveChangetoFirebase.bind(this);
    }
    
    componentDidMount(props) {
        const climbing = this.props.match.params.id;
        
        
        
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
                this.setState({
                    user: user.uid
                
                });
                    console.log("Climbing" , climbing);
                
                    const projectRef = firebase.database().ref(this.state.user + '/project/' + climbing);
                    
                    projectRef.on('value', (snapshot) => {
                        let project = snapshot.val();
                        
                        console.log("Snapshot", project);
                        if (project === null){
                            return;
                        }
                        
                        let description = project.description;
                        let goal = project.goal;
                        let name = project.projectName
                        
                        this.setState({
                            description, 
                            goal, 
                            name
                        })
                    }); 
                    
                    const itemsRef = firebase.database().ref(this.state.user + '/project/' + climbing + '/interviews');
                    
                    itemsRef.on('value', (snapshot) => {
                        let items = snapshot.val();
                        
                        // This tells me that something is up. This value is null, meaning that there is nothing coming through for snapshot. Not because there is nothing there, because there should be. But since there is not a new person. What if I logged in as a new person? 
                        
                        console.log('Snapshot', snapshot.val());
                        let newState = [];
                        for (let item in items){
                            newState.push({
                                id: item,
                                interviewName: items[item].interviewName,
                            });
                        } 
                    })   
                };
            });
        
        
        if(this.state.user) {
            console.log("User Logged in");
        }
    } 
    
  
    
    updateProject(e) {
       this.handleChange(e); 
       this.saveChangetoFirebase(e.target);
    }
    
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    saveChangetoFirebase(objectToSave) {
        const climbing = this.props.match.params.id;
        const itemRef = firebase.database().ref(this.state.user + '/project/' + climbing); 
        const item = {
            [objectToSave.name]: objectToSave.value
        }
        itemRef.update(item);
    }
    
    
    
    render(){
    return(
        <div>
            <h1 className="projectNameInProjectOverview">{this.state.name}</h1>
            <div className ="row descriptionAndGoalofProject">
                <div className="offset-sm-1 col-sm-5">
                    <h5>Questions</h5>
                    <input type ="text" name="description" placeholder="Type your description" onChange={this.updateProject} value={this.state.description} />
                    <p>{this.state.description}</p>
                </div>
                <div className="col-sm-5">
                    <h5>Takeaways</h5>
                    <input type ="text" name="goal" placeholder="Type your goal" onChange={this.updateProject} value={this.state.goal} />
                    <p>{this.state.goal}</p>
                </div>
            </div>
        
        
        <button data-toggle="modal" data-target="#deleteModal5">Test plan</button>
        
        <div class="modal" id="deleteModal5">
            <div class="modal-dialog"> 
                <div class="modal-content">

                                        <div class="modal-header">
                                            <h4 class="modal-title">Modal Heading</h4>
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        </div>

                                        <div class="modal-body">

                                            <h4>Question 1</h4>
                                            <textarea></textarea>
                                        

                                        </div>

                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-dismiss="modal">
                                                No
                                            </button>
                                            <button>
                                                Your mom!
                                            </button>
                                        </div>

                                    </div>
            </div> 
        
        </div> 
        
      
        <InterviewList id={this.props.match.params.id}/>
        
        </div>  
)}
}
export default charlieBrown
