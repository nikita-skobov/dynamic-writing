import React from 'react'
import { connect } from 'react-redux'

import Line from './Line'

export function Editor(props) {

    const {
        lines
    } = props.editor
    
    return (
        <div>
            <h1>Tessst</h1>
            {lines.map(obj => <Line {...obj} />)}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        editor: state.editor,
        ...ownProps,
    }
}

export default connect(mapStateToProps)(Editor)
