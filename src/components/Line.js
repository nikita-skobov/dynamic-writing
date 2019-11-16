import React from 'react'
import { connect } from 'react-redux'

import TextareaAutosize from 'react-textarea-autosize'

export function Line(props) {
    const {
        id,
    } = props

    return (
        <div className="input-group mb-2">
            <TextareaAutosize
                className="form-control"
                defaultValue="dsadsadsa"
            />
        </div>
    )
}

export default connect()(Line)
