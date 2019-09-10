import React, { Component } from 'react'
import * as firebase from 'firebase'
import InterviewQandA from './interviewQ&A'


class InterviewTakeaways extends Component {
    constructor(){
        super(); 
        this.state = {
            interviewName: "",
            currentItem: "",
            items: [], 
            user: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickTheButtonForMeBecauseIDoNotWantTo = this.clickTheButtonForMeBecauseIDoNotWantTo.bind(this);
    }


    componentDidMount(props) {
        this.clickTheButtonForMeBecauseIDoNotWantTo(); 

        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
                // User is signed in.
                this.setState({
                    user: user.uid
                },()=>{
                    const itemsRef = firebase.database().ref(this.state.user + '/project/' + this.props.match.params.id + '/interviews/' + this.props.match.params.interviewName + "/takeaways");
                    itemsRef.on('value', (snapshot) => {
                        let items = snapshot.val();
                        let newState = [];
                        for (let item in items) {
                            newState.push({
                                id: item,
                                title: items[item].title
                            });
                        }
                        this.setState({
                            items: newState
                        });
                    });
                });
            }
        });
    }




    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const itemsRef = firebase.database().ref(this.state.user + '/project/' + this.props.match.params.id + '/interviews/' + this.props.match.params.interviewName + "/takeaways");
        
        
        console.log(this.state.user, 'user from InterviewTakeaways');
        const item = {
            title: this.state.currentItem,
            interviewName: this.state.interviewName
        };

        itemsRef.push(item);
        this.setState({
            currentItem: '',
            interviewName: ''
        });
    }

    deleteStuff(itemId) {
        const itemRef = firebase.database().ref(this.state.user + '/project/' + this.props.match.params.id + '/interviews/' + this.props.match.params.interviewName + "/takeaways/" + itemId); 
        itemRef.remove();

    }


    clickTheButtonForMeBecauseIDoNotWantTo() {
        const currentItem = document.getElementById('currentItem');
        currentItem.addEventListener('keyup', function(event){
            event.preventDefault(); 
            if (event.keyCode === 13) {
                document.getElementById('winning').click();
            }
        });
    }


    render(){
        return(
            <div className="InterviewTakeaways container">
            <InterviewQandA></InterviewQandA>
                <h4>Takeaways</h4> 
                <form onSubmit={this.handleSubmit}>

                    <textarea className="paragraphText" type="text" name="currentItem" id="currentItem" placeholder="What are you bringing ?" onChange={this.handleChange} value={this.state.currentItem} />

                    <button id="winning">
                        Add Item
                    </button>
                </form>

                <ul>
                    {this.state.items.map( item => {
                        return (
                            <li key={item.id}>
                                <h3>{item.title}</h3>
                                <button onClick={() => this.deleteStuff(item.id)}>
                                    Delete
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        ); 
    }

}

export default InterviewTakeaways