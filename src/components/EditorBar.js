import React from 'react'
import { connect } from 'react-redux'

import './EditorBar.css'

export function EditorBar(props) {
    return (
        <div className="editor-bar">
            Editor Bar!
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        editor: state.editor,
        ...ownProps,
    }
}

export default connect(mapStateToProps)(EditorBar)
