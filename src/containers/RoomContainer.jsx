import React, { Component } from 'react';
import SelectedRoom from '../components/SelectedRoom'
import ActionCable from 'actioncable'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
// import {animateScroll} from 'react-scroll'

import '../css/room-container.css'

class RoomContainer extends Component {
    constructor() {
        super();
        this.state = {
            consumer: 'undefined',
            rooms: [],
            selectedRoom: '',
            chatHistory: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:3000/rooms')
        .then(resp => resp.json())
        .then(room => this.setState({rooms: room}))
    }
    
    handleSubmit = event => {
        event.preventDefault();
        fetch('http://localhost:3000/rooms', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                topic: this.state.topic,
                room_number: Date.now() / 10000
            })
        })
        .then(resp => resp.json())
        .then(room => this.setState({rooms: [...this.state.rooms, room]}))
    }
    
    handleOnChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    sendMessageToServer = (mess, event) => {
        event.preventDefault();
        this.subscription.send({
            text: mess,
            userId: this.props.user,
            roomId: this.state.selectedRoom
        })
    }
    
    handleOnClick = (event) => {
        const idCall = event.currentTarget.id
        this.setState({selectedRoom: event.target.id})
        fetch(`http://localhost:3000/room_messages/${event.currentTarget.id}`)
        .then(resp => resp.json())
        .then(messages => {
            this.setState({chatHistory: messages}, () => this.updateSocket(idCall) )
            this.updateSocket(idCall)
        })
    }

    updateSocket = call => {
            if ( this.state.consumer !== 'undefined' ) {
                    this.subscription.unsubscribe()
                }
    
            this.setState({selectedRoom: call})
            const consumer = ActionCable.createConsumer('ws://localhost:3000/cable')
            this.subscription =  consumer.subscriptions.create({channel: "ForumChannel", room: call},
            {received: (data) => 
                this.setState({chatHistory: [...this.state.chatHistory, data]})
        }
               
            )
            this.setState({consumer: 'exists'})
    }

    // scrollToBottom(){
    //     animateScroll.scrollToBottom({
    //         containerId: 'chat-history'
    //     })
    // }
        

        
        render() {
            return (
            <div className="room-container">
                <div className="form-listing">
                    <div className="existing-rooms">
                        <h3 className="existing-rooms-header">Existing Rooms!</h3>
                        <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start">
                        {this.state.rooms.length === 0 ?<h1 className="no-room-header">No Rooms Yet...</h1>: null}
                        {this.state.rooms.map(room => <Button onClick={this.handleOnClick} key={room.id} id={room.id} className="room-btn">{room.room_number}: {room.topic}</Button>)}
                        </Grid>
                    </div>

                    <div className="new-room-form">
                        <h3 className="new-room-form-header">Don't See a Topic You Like?</h3>
                        <form onSubmit={this.handleSubmit}>
                            <Input onChange={event=> this.handleOnChange(event)} value={this.state.topic} placeholder='Pick a Topic!' name='topic' type="text"/><br></br>
                            <Button lableStyle={{'text-align': 'left'}} type='submit'>Make New Room</Button>
                        </form>
                    </div>
                </div>


                <div className="message-container">
                    <h3 className="selected-room-header">Room Title</h3>
                    <Grid
                    id='chat-history'
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start">
                        {this.state.chatHistory.map(chat => 
                        <Grid container>
                            <Grid item>
                                <Paper>{chat.author}</Paper>
                            </Grid>
                            <Grid item>
                                <Paper>{chat.message.content}</Paper>
                            </Grid>
                        </Grid>
                        )}
                    </Grid>
                

               
                    {this.state.selectedRoom === '' ? <h4 className='no-room-header'>Select a Room!</h4> :
                    <SelectedRoom user={this.props.user}  sendMessageToServer={this.sendMessageToServer} room={this.state.selectedRoom}/>
                    }
                </div>
            </div>
        );
    }
}

export default RoomContainer;
