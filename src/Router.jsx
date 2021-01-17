import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Navbar from './pages/Navbar'

import { Landing } from './pages/Landing'

export class ApplicationRouter extends React.Component {

    render() {
        return <Router>
            <Navbar></Navbar>
            <Switch>

                <Route
                    path="/"
                    render={props => <Landing {...props} />}
                />

                <Redirect to="" />
            </Switch>
        </Router>
    }
}