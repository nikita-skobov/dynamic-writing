import React from 'react'
import { connect } from 'react-redux'

import {
    addLine,
    removeLine
} from '../actions/editor'

export function EditorBar(props) {
    const {
        actionAddLine,
        actionRemoveLine,
        currentId,
    } = props

    return (
        <div>
            Editor Bar!<br />
            Currently selected: {currentId}<br />
            <input className="w-100" type="button" onClick={actionAddLine} value="Add line" />
            <input className="w-100" type="button" onClick={actionRemoveLine} value="Remove Line" />
            <input className="w-100" type="button" onClick={() => {}} value="Preview" />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {
        currentLine
    } = state.editor

    return {
        currentId: state.editor.lines[currentLine].id,
        editor: state.editor,
        ...ownProps,
    }
}

const mapActionsToProps = {
    actionAddLine: addLine,
    actionRemoveLine: removeLine,
}

export default connect(mapStateToProps, mapActionsToProps)(EditorBar)
