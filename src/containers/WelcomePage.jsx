import React, { Component } from 'react';
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class WelcomePage extends Component {
    render() {
        return (
            <div>
                <Paper>
                    <Tabs centered value={0}>
                        <Tab label="Sign In"/>
                        <Tab label="Create New User"/>
                    </Tabs>
                </Paper>
                <Login handleLogin={this.props.handleLogin}/>
                <SignUp handleLogin={this.props.handleLogin}/>
            </div>
        );
    }
}

export default WelcomePage;
