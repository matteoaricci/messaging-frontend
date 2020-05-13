import React, { Component } from 'react';
import SelectedRoom from '../components/SelectedRoom'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';

class RoomContainer extends Component {
    constructor() {
        super();
        this.state = {
            rooms: [],
            // roomNumber: '',
            // topic: '',
            selectedRoom: ''
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
                room_number: this.state.roomNumber
            })
        })
        .then(resp => resp.json())
        .then(room => this.setState({rooms: [...this.state.rooms, room]}))
    }

    handleOnChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleOnClick = (event) => {
        this.setState({selectedRoom: event.currentTarget.id})
    }

    render() {
        return (
            <div className="room-container">
                <div className="existing-rooms">
                    <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start">
                    <h5 className="existing-rooms-header">Existing Rooms!</h5>
                    {this.state.rooms.length === 0 ?<h1 className="no-room-header">No Rooms Yet...</h1>: null}
                    {this.state.rooms.map(room => <Button onClick={this.handleOnClick} key={room.id} id={room.id} className="room-btn">{room.room_number}{room.topic}</Button>)}
                    </Grid>
                </div>

                <div className="new-room-form">
                    <h5 className="new-room-form-header">Don't See a Topic You Like?</h5>
                    <form onSubmit={this.handleSubmit}>
                        <Input onChange={event =>this.handleOnChange(event)} value={this.state.roomNumber} placeholder='Room Number' name="roomNumber" type="number"/><br></br>
                        <Input onChange={event=> this.handleOnChange(event)} value={this.state.topic} placeholder='Pick a Topic!' name='topic' type="text"/><br></br>
                        <Button type='submit'>Make New Room</Button>
                    </form>
                </div>

                <div className="selected-room">
                    {this.state.selectedRoom === '' ? <h5 className='no-room-header'>Select a Room!</h5> :
                    <SelectedRoom user={this.props.user} room={this.state.selectedRoom}/>
                    }
                </div>
            </div>
        );
    }
}

export default RoomContainer;
