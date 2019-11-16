import React from 'react'
import { connect } from 'react-redux'

import './EditorBar.css'

import {
    addLine,
    removeLine
} from '../actions/editor'

export function EditorBar(props) {
    const {
        actionAddLine,
        actionRemoveLine,
    } = props

    return (
        <div className="editor-bar">
            Editor Bar!
            <button onClick={actionAddLine}>Add line</button>
            <button onClick={actionRemoveLine}>Remove line</button>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        editor: state.editor,
        ...ownProps,
    }
}

const mapActionsToProps = {
    actionAddLine: addLine,
    actionRemoveLine: removeLine,
}

export default connect(mapStateToProps, mapActionsToProps)(EditorBar)
