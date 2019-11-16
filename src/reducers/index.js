import { combineReducers } from 'redux'

import { generateId } from '../utils'
import {
    EDITOR_ADD_LINE,
    EDITOR_REMOVE_LINE,
} from '../constants'

const initialStates = {
    userProfile: {
        isMobile: false,
    },
    editor: {
        lineMap: {'a': 0},
        lines: [{ id: 'a'}],
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
        case EDITOR_ADD_LINE: {
            const id = generateId()
            const lineIndex = state.lines.length
            const newState = { ...state }
            newState.lines.push({ id })
            newState.lineMap[id] = lineIndex
            return newState
        }
        case EDITOR_REMOVE_LINE: {
            const { id } = action.payload
            const lineIndex = state.lineMap[id]
            const newState = { ...state }
            newState.lines.splice(lineIndex, 1)
            delete newState.lineMap[id]
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
