import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Editor from './Editor'

export function App(props) {
    console.log(props)
    return (
        <div className="h-100">
            <Switch>
                <Route exact path="/" component={() => <br />} />
                <Route exact path="/new" component={Editor} />
            </Switch> 
        </div>
    )
}

export default connect()(App)
