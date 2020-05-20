import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import '../css/room-container.css'

class SelectedRoom extends Component {

    constructor() {
        super();
        this.state = {
            data: '',
            newMessage: '',
            currentChat: []
        }
    }

    componentDidMount() {
        
        // const consumer = ActionCable.createConsumer('ws://localhost:3000/cable')
        // this.subscription =  consumer.subscriptions.create({channel: "ForumChannel", room: this.props.room},
        // {received: (message) => this.setState({chatHistory: [...this.state.chatHistory, message]})}
        // )
    }

    handleOnChange = (event) => {
        this.setState({
            newMessage: event.target.value
        })
    }

    
    render() {
        return (
            <div>
                 <form onSubmit={event => this.props.sendMessageToServer(this.state.newMessage, event)}>
                        <Input onChange={event =>this.handleOnChange(event)} value={this.state.newMessage} fullWidth='true' placeholder='Message' name="newMessage" type="text"/><br></br>
                        <Button type='submit'>Send</Button>
                    </form>
            </div>
        );
    }
}

export default SelectedRoom;
