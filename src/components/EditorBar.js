import React from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import {
    addLine,
    removeLine,
    preview,
    togglePopover,
    editorPublish,
} from '../actions/editor'

import Popover from './Popover'
import LineSettings from './LineSettings'

export function EditorBar(props) {
    const {
        actionAddLine,
        actionRemoveLine,
        actionPopoverIsOn,
        actionPreview,
        actionPublish,
        currentId,
        isPreviewing,
    } = props

    return (
        <div>
            <NavLink to="/">To Home</NavLink>
            <input
                className="w-100"
                type="button"
                onClick={() => { actionPreview(!isPreviewing) }}
                value={isPreviewing ? 'Cancel' : 'Preview'}
            />
            <input
                className="w-100"
                type="button"
                onClick={() => { actionPublish() }}
                value="Publish"
            />
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
            <Popover 
                buttonClass="w-100"
                buttonText="Line Settings"
                disabled={isPreviewing}
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
    actionPublish: editorPublish,
}

export default connect(mapStateToProps, mapActionsToProps)(EditorBar)
