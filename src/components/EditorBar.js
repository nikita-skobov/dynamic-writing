import React from 'react'
import { connect } from 'react-redux'

import {
    addLine,
    removeLine,
    preview,
} from '../actions/editor'

export function EditorBar(props) {
    const {
        actionAddLine,
        actionRemoveLine,
        actionPreview,
        currentId,
        isPreviewing,
    } = props

    return (
        <div>
            Editor Bar!<br />
            Currently selected: {currentId}<br />
            <input
                className="w-100"
                type="button"
                disabled={isPreviewing}
                onClick={() => { !isPreviewing && actionAddLine() }}
                value="Add line"
            />
            <input
                className="w-100"
                type="button"
                disabled={isPreviewing}
                onClick={() => { !isPreviewing && actionRemoveLine(currentId) }}
                value="Remove Line"
            />
            <input
                className="w-100"
                type="button"
                onClick={() => { actionPreview(!isPreviewing) }}
                value={isPreviewing ? 'Cancel' : 'Preview'}
            />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {
        currentLine,
        isPreviewing,
    } = state.editor

    return {
        currentId: state.editor.lines[currentLine].id,
        editor: state.editor,
        isPreviewing,
        ...ownProps,
    }
}

const mapActionsToProps = {
    actionAddLine: addLine,
    actionRemoveLine: removeLine,
    actionPreview: preview,
}

export default connect(mapStateToProps, mapActionsToProps)(EditorBar)
