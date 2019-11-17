import React from 'react'
import { connect } from 'react-redux'

import TextareaAutosize from 'react-textarea-autosize'

import { changeActiveLine } from '../actions/editor'


// export class Line extends React.Component {
//     constructor(props) {
//         super(props)
//         this.inputFocus = utilizeFocus()
//     }

//     componentDidMount() {
//         console.log('line mounted!')
//         if (this.props.isFocused) {
//             console.log(this.inputFocus)
//             this.inputFocus.setFocus()
//         }
//     }
//     render() {
//         const {
//             id,
//             actionChangeLine,
//         } = this.props
    
//         console.log('rendering line!')
//         // actionSetFocusCallback(id, setInputFocus)
    
//         return (
//             <div className="input-group mb-2">
//                 <TextareaAutosize
//                     onClick={() => { actionChangeLine(id) }}
//                     ref={this.inputFocus.ref}
//                     className="form-control"
//                     defaultValue="dsadsadsa"
//                 />
//             </div>
//         )
//     }
// }

export function Line(props) {
    const {
        id,
        isFocused,
        actionChangeLine,
    } = props

    if (isFocused) {
        console.log(`I AM ${id}, and I AM FOCUESED!`)
    }

    return (
        <div className="input-group mb-2">
            <TextareaAutosize
                autoFocus={isFocused}
                onClick={() => { actionChangeLine(id) }}
                className="form-control"
                defaultValue={JSON.stringify({ id, isFocused })}
            />
        </div>
    )
}

// const mapStateToProps = (state, ownProps) => {
//     const { id } = ownProps

//     let lineIndex = -1

//     for (let i = 0; i < state.editor.lines.length; i += 1) {
//         if (state.editor.lines[i].id === id) {
//             lineIndex = i
//             break
//         }
//     }

//     console.log(`mapping state to props!, line id: ${id}, index is: ${lineIndex}`)

//     if (lineIndex === -1) {
//         // this should never happen...
//         return ownProps
//     }

//     const newState = { ...state.editor.lines[lineIndex], numLines: state.editor.lines.length }

//     return newState
// }

const mapActionsToProps = {
    actionChangeLine: changeActiveLine,
}

export default connect(undefined, mapActionsToProps)(Line)
