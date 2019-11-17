import React from 'react'
import { connect } from 'react-redux'

import {
    addLine,
    removeLine,
    preview,
    togglePopover,
} from '../actions/editor'

import Popover from './Popover'
import LineSettings from './LineSettings'

export function EditorBar(props) {
    const {
        actionAddLine,
        actionRemoveLine,
        actionPopoverIsOn,
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
            <Popover 
                buttonClass="w-100"
                buttonText="Line Settings"
                onOpen={() => { actionPopoverIsOn(true) }}
                onClose={() => { actionPopoverIsOn(false) }}
            >
                <LineSettings id={currentId} />
            </Popover>
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
        isPreviewing,
        ...ownProps,
    }
}

const mapActionsToProps = {
    actionAddLine: addLine,
    actionRemoveLine: removeLine,
    actionPreview: preview,
    actionPopoverIsOn: togglePopover,
}

export default connect(mapStateToProps, mapActionsToProps)(EditorBar)
