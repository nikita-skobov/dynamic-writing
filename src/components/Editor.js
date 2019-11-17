import React from 'react'
import { connect } from 'react-redux'

import Line from './Line'
import LineEdit from './LineEdit'
import EditorBar from './EditorBar'

import './Editor.css'

export function Editor(props) {
    const {
        lines,
        isPreviewing,
    } = props.editor

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
    console.log(state)
    return {
        editor: state.editor,
        ...ownProps,
    }
}

export default connect(mapStateToProps)(Editor)
