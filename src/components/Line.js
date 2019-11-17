import React from 'react'
import { connect } from 'react-redux'

import TextareaAutosize from 'react-textarea-autosize'

export function Line(props) {
    return (
        <div className="input-group mb-2">
            <TextareaAutosize
                disabled
                className="form-control"
                defaultValue={props.value}
            />
        </div>
    )
}

export default connect()(Line)

