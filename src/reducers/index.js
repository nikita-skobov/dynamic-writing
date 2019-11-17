import { combineReducers } from 'redux'

import {
    generateId,
} from '../utils'

import {
    EDITOR_ADD_LINE,
    EDITOR_REMOVE_LINE,
    EDITOR_LINE_CHANGE,
} from '../constants'

const initialStates = {
    userProfile: {
        isMobile: false,
    },
    editor: {
        currentLine: 0,
        lines: [{ id: 'a', isFocused: true }],
    },
}

export function userProfile(
    state = initialStates.userProfile,
    action,
) {
    switch (action.type) {
        default:
            return state
    }
}

export function editor(
    state = initialStates.editor,
    action,
) {
    switch (action.type) {
        case EDITOR_LINE_CHANGE: {
            const newState = { ...state }
            const { id } = action.payload
            let lineIndex = -1

            for (let i = 0; i < state.lines.length; i += 1) {
                if (state.lines[i].id === id) {
                    lineIndex = i
                    break
                }
            }

            if (lineIndex === -1) {
                return state
            }

            newState.lines[state.currentLine].isFocused = false
            // set the previous selected line
            // to not be focused

            newState.currentLine = lineIndex
            newState.lines[lineIndex].isFocused = true
            return newState
        }
        case EDITOR_ADD_LINE: {
            const id = generateId()
            const { currentLine } = state
            const newState = { ...state }
            newState.lines[currentLine].isFocused = false
            const lineObj = {
                id,
                isFocused: true,
            }

            newState.lines.splice(currentLine + 1, 0, lineObj)
            newState.currentLine = currentLine + 1
            return newState
        }
        case EDITOR_REMOVE_LINE: {
            if (state.lines.length === 1) {
                // cannot remove a line if theres only one line
                return state
            }

            const lineIndex = state.currentLine
            const newState = { ...state }
            newState.lines.splice(lineIndex, 1)
            newState.currentLine = lineIndex > 0 ? lineIndex - 1 : 0
            newState.lines[newState.currentLine].isFocused = true
            return newState
        }
        default:
            return state
    }
}

export default combineReducers({
    userProfile,
    editor,
})
