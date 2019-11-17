import React from 'react'
import { connect } from 'react-redux'

import {
    addLine,
    removeLine,
    preview,
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

    console.log('rendering editorbar')

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
                <LineSettings id={currentId} transitionDuration={2000} />
            </Popover>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log('mapping editorbar')
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
    actionPopoverIsOn: (on) => {
        return {
            type: 'popover',
            payload: {
                on,
            }
        }
    },
}

export default connect(mapStateToProps, mapActionsToProps)(EditorBar)
