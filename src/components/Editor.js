import React from 'react'
import { connect } from 'react-redux'

import Line from './Line'
import EditorBar from './EditorBar'

export function Editor(props) {
    const {
        lines,
    } = props.editor
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <EditorBar />
                </div>
                <div className="col">
                    <h1>Tessst</h1>
                    {lines.map(obj => <Line {...obj} />)}
                </div>
            </div>
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
