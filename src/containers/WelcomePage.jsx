import React, { Component } from 'react';
import Login from '../components/Login'
import SignUp from '../components/SignUp'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class WelcomePage extends Component {
    constructor() {
        super();
        this.state = {
            selected: 'Login',
            value: 0
        }
    }

    handleOnChange = (event, value) => {
        this.setState({value: value})
    }
    render() {
       const { selected } = this.state;
       const { value } = this.state;
        return (
            <div>
                <Paper>
                    <Tabs centered value={value}
                          onChange={this.handleOnChange}
                    >
                        <Tab label="Sign In"/>
                        <Tab label="Create New User"/>
                    </Tabs>
                </Paper>
                {value === 0 ? 
                <Login handleLogin={this.props.handleLogin}/> :
                <SignUp handleLogin={this.props.handleLogin}/>
                }
            </div>
        );
    }
}

export default WelcomePage;
