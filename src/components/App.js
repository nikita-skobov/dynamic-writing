import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Editor from './Editor'
import HomePage from './HomePage'

export function App(props) {
    return (
        <div className="h-100">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/new" component={Editor} />
            </Switch> 
        </div>
    )
}

export default connect()(App)
