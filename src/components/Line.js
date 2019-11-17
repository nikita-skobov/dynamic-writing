import React from 'react'
import { connect } from 'react-redux'

import TextareaAutosize from 'react-textarea-autosize'

import { changeActiveLine } from '../actions/editor'


export class Line extends React.Component {
    constructor(props) {
        super(props)

        this.inputRef = React.createRef()
    }

    componentDidMount() {
        if (this.props.hasFocus) {
            console.log('focusing because mount')
            this.inputRef.current && this.inputRef.current.focus()
        }
    }

    componentDidUpdate() {
        if (this.props.hasFocus) {
            console.log('focusing because update')
            this.inputRef.current && this.inputRef.current.focus()
        }
    }

    render() {
        const {
            id,
            hasFocus,
            actionChangeLine,
        } = this.props
    
        return (
            <div className="input-group mb-2">
                <TextareaAutosize
                    inputRef={this.inputRef}
                    onClick={() => { actionChangeLine(id) }}
                    className="form-control"
                    defaultValue={JSON.stringify({ id, hasFocus })}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps

    let lineIndex = -1

    for (let i = 0; i < state.editor.lines.length; i += 1) {
        if (state.editor.lines[i].id === id) {
            lineIndex = i
            break
        }
    }

    if (lineIndex === -1) {
        // this should never happen...
        return ownProps
    }

    return {
        hasFocus: state.editor.lines[lineIndex].isFocused,
        ...ownProps,
    }
}


const mapActionsToProps = {
    actionChangeLine: changeActiveLine,
}

export default connect(mapStateToProps, mapActionsToProps)(Line)
