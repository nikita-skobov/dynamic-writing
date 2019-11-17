import React from 'react'
import { connect } from 'react-redux'

import TextareaAutosize from 'react-textarea-autosize'

import { changeActiveLine } from '../actions/editor'
import {
    getIndexFromProperty
} from '../utils'

import {
    lineChange,
} from '../actions/editor'


const backgroundString = 'linear-gradient(to right, rgba(31, 226, 58, 0.15), rgba(31, 226, 58, 0), #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000, #0000)'

export class LineEdit extends React.Component {
    constructor(props) {
        super(props)

        this.inputRef = React.createRef()

        this.setFocus = this.setFocus.bind(this)

        this.state = {
            hasFocus: this.props.hasFocus
        }
        console.log('constructing lineedit')
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

    shouldComponentUpdate(newprops) {
        console.log('should line update?')
        console.log(newprops)
        return newprops.shouldUpdate
    }

    componentDidUpdate() {
        console.log('line updating')
        this.setFocus()
    }

    render() {
        console.log('redenring line')
        const {
            id,
            actionChangeLine,
            actionLineUpdated,
            value,
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
                    onChange={({ target }) => { actionLineUpdated(id, target.value) }}
                    className="form-control"
                    defaultValue={value || JSON.stringify({ id, hasFocus })}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps
    
    const lineIndex = getIndexFromProperty(state.editor.lines, 'id', id)
    if (lineIndex === -1) {
        // this should never happen...
        return ownProps
    }

    const hasFocus = state.editor.lines[lineIndex].isFocused
    console.log('mapping line edit')
    console.log({ hasFocus, id: ownProps.id, value: ownProps.value })

    return {
        shouldUpdate: !state.editor.popoverIsOpen,
        hasFocus,
        id: ownProps.id,
        value: ownProps.value,
    }
}


const mapActionsToProps = {
    actionChangeLine: changeActiveLine,
    actionLineUpdated: lineChange,
}

export default connect(mapStateToProps, mapActionsToProps)(LineEdit)
