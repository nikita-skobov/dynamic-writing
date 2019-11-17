import { combineReducers } from 'redux'

import {
    getIndexFromProperty,
    generateId,
} from '../utils'
import {
    makeLine,
} from '../utils/lines'

import {
    EDITOR_ADD_LINE,
    EDITOR_REMOVE_LINE,
    EDITOR_LINE_CHANGE,
    EDITOR_PREVIEW,
    LINE_CHANGE,
    LINE_TRANSITION_UPDATE,
    POPOVER_TOGGLE,
    LINE_PROP_UPDATE
} from '../constants'

const initialLine = makeLine()

const initialStates = {
    userProfile: {
        isMobile: false,
    },
    editor: {
        popoverIsOpen: false,
        isPreviewing: false,
        currentLine: 0,
        lines: [initialLine],
    },
    lines: { [initialLine.id]: '' },
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

export function lines(
    state = initialStates.lines,
    action
) {
    switch (action.type) {
        case LINE_CHANGE: {
            const {
                id,
                value
            } = action.payload
            const newState = { ...state }
            newState[id] = value
            return newState
        }
        case EDITOR_REMOVE_LINE: {
            const {
                id
            } = action.payload
            const newState = { ...state }
            delete newState[id]
            return newState
        }
        case EDITOR_ADD_LINE: {
            const {
                id,
            } = action.payload.lineObj
            const newState = { ...state }
            newState[id] = ''
            return newState
        }
        default:
            return state
    }
}

export function editor(
    state = initialStates.editor,
    action,
) {
    switch (action.type) {
        case LINE_PROP_UPDATE: {
            const {
                id,
                propName,
                newValue,
            } = action.payload

            const lineIndex = getIndexFromProperty(state.lines, 'id', id)
            if (lineIndex === -1) {
                return state
            }
            
            const newState = { ...state }
            newState.lines[lineIndex][propName] = newValue
            return newState
        }
        case POPOVER_TOGGLE: {
            const {
                on,
            } = action.payload

            const newState = { ...state }
            newState.popoverIsOpen = on
            return newState
        }
        case EDITOR_PREVIEW: {
            const { on, lines } = action.payload
            if (on === state.isPreviewing) {
                // if set preview to on, but preview
                // is already on do nothing. (and vice versa)
                return state
            }

            const newState = { ...state }
            newState.isPreviewing = on

            if (!on) {
                // if turning off preview mode,
                // set the values of the lines into the editor.lines
                // list
                for (let i = 0; i < newState.lines.length; i += 1) {
                    const { id } = newState.lines[i]
                    const value = lines[id]
                    newState.lines[i].value = value
                }
            }

            return newState
        }
        case EDITOR_LINE_CHANGE: {
            const newState = { ...state }
            const { id } = action.payload

            const lineIndex = getIndexFromProperty(state.lines, 'id', id)

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
            const {
                lineObj
            } = action.payload

            const { currentLine } = state
            const newState = { ...state }
            newState.lines[currentLine].isFocused = false

            newState.lines.splice(currentLine + 1, 0, lineObj)
            newState.currentLine = currentLine + 1
            return newState
        }
        case EDITOR_REMOVE_LINE: {
            if (state.lines.length === 1) {
                // cannot remove a line if theres only one line
                return state
            }
            const { id } = action.payload
            const lineIndex = getIndexFromProperty(state.lines, 'id', id)
            if (lineIndex === -1) {
                return state
            }

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
    lines,
})
