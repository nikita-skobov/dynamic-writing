import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Preview from './Preview'


export function HomePage(props) {
    return (
        <div>
            <NavLink to="/new">Make your own</NavLink>
            <div className="m-auto w-90">
                <Preview stateField="homePage" />
            </div>
        </div>
    )
}

export default connect()(HomePage)
