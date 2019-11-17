import React from 'react'
import { connect } from 'react-redux'

import TextareaAutosize from 'react-textarea-autosize'

import { changeActiveLine } from '../actions/editor'


const backgroundString = 'linear-gradient(to right, rgba(31, 226, 58, 0.15), rgba(31, 226, 58, 0), #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000)'

export class Line extends React.Component {
    constructor(props) {
        super(props)

        this.inputRef = React.createRef()

        this.setFocus = this.setFocus.bind(this)

        this.state = {
            hasFocus: this.props.hasFocus
        }
    }

    setFocus() {
        if (this.props.hasFocus) {
            this.inputRef.current && this.inputRef.current.focus()
        }

        if (this.state.hasFocus !== this.props.hasFocus) {
            // if previous state hasFocus does not match the
            // new props hasFocus, update state:
            this.setState((prevState) => ({ hasFocus: !prevState.hasFocus }))
        }
    }

    componentDidMount() {
        this.setFocus()
    }
    componentDidUpdate() {
        this.setFocus()
    }

    render() {
        const {
            id,
            actionChangeLine,
        } = this.props
        const {
            hasFocus,
        } = this.state

        const backgroundImage = hasFocus ? backgroundString : ''

        return (
            <div className="input-group mb-2">
                <TextareaAutosize
                    inputRef={this.inputRef}
                    style={{ backgroundImage }}
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

    const hasFocus = state.editor.lines[lineIndex].isFocused

    return {
        hasFocus,
        ...ownProps,
    }
}


const mapActionsToProps = {
    actionChangeLine: changeActiveLine,
}

export default connect(mapStateToProps, mapActionsToProps)(Line)
