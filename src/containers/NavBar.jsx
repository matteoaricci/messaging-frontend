import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class NavBar extends Component {
    render() {
        return (
            <AppBar position='static' title='Howdy!'>
                <Tabs>
                    <Tab>
                    </Tab>
                </Tabs>
            </AppBar>
        );
    }
}

export default NavBar;
