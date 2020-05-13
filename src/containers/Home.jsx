import React, { Component } from 'react';
import RoomContainer from './RoomContainer'

class Home extends Component {
    render() {
        return (
            <div>
                <RoomContainer user={this.props.user}/>
            </div>
        );
    }
}

export default Home;
