import React from 'react'
import { connect } from 'react-redux'

import Line from './Line'
import Preview from './Preview'
import LineEdit from './LineEdit'
import EditorBar from './EditorBar'

import './Editor.css'

export function Editor(props) {
    const {
        lines,
        isPreviewing,
    } = props.editor

    if (isPreviewing) {
        return (
            <div>
                <div className="editor-bar">
                    <EditorBar />
                </div>
                <div className="editor-main">
                    <h1>Tessst</h1>
                    <Preview />
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
                <h1>Tessst</h1>
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

export default connect(mapStateToProps)(Editor)
