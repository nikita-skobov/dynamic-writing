import React from 'react'
import { connect } from 'react-redux'

import TextareaAutosize from 'react-textarea-autosize'

export function Line(props) {
    return (
        <div className="input-group">
            <TextareaAutosize
                disabled
                className="form-control line-padding"
                defaultValue={props.value}
            />
        </div>
    )
}

export default connect()(Line)

