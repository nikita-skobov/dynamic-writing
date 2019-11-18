import React from 'react'
import { connect } from 'react-redux'

import Line from './Line'
import Preview from './Preview'
import LineEdit from './LineEdit'
import EditorBar from './EditorBar'

import './Editor.css'
import { editorTitleChange } from '../actions/editor'

export function Editor(props) {
    const {
        lines,
        isPreviewing,
        title,
    } = props.editor
    const {
        actionTitleChange
    } = props

    console.log('rendering editor')

    if (isPreviewing) {
        return (
            <div>
                <div className="editor-bar">
                    <EditorBar />
                </div>
                <div className="editor-main">
                    <Preview isPreview={true} />
                    {/* {lines.map(obj => <Line key={obj.id} />)} */}
                </div>
            </div>
        )        
    }

    return (
        <div>
            <div className="editor-bar">
                <EditorBar />
            </div>
            <div className="editor-main">
                <input
                    type="text"
                    className="h1 titleform"
                    defaultValue={title.value}
                    onChange={({ target }) => { actionTitleChange(target.value) }}
                />
                {lines.map(obj => <LineEdit key={obj.id} {...obj} />)}
            </div>
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
    actionTitleChange: editorTitleChange,
}

export default connect(mapStateToProps, mapActionsToProps)(Editor)
