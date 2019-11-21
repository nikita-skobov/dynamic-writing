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
    LINE_PROP_UPDATE,
    EDITOR_PUBLISH,
    EDITOR_TITLE_CHANGE
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
        title: { value: 'Your Title' },
        publishCount: 0,
    },
    lines: { [initialLine.id]: '' },
    homePage: {
        "lines":[{"id":"dknolbid","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"Whose woods these are I think I know."},{"id":"btjohgvo","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"His house is in the village, though;"},{"id":"orizpoeu","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"He will not see me stopping here"},{"id":"gbbcvqxr","transitionDuration":400,"transitionType":"fade","delayDuration":1000,"value":"To watch his woods fill up with snow.\n"},{"id":"sfxioeku","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"My little horse must think it's queer"},{"id":"gnbxzcwp","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"To stop without a farmhouse near"},{"id":"bcfoafww","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"Between the woods and frozen lake"},{"id":"rgueteox","transitionDuration":400,"transitionType":"fade","delayDuration":1000,"value":"The darkest evening of the year.\n"},{"id":"sbvrenxu","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"He gives his harness bells a shake"},{"id":"frpbpjrx","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"To ask if there's some mistake."},{"id":"rmeuejgu","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"The only other sound's the sweep"},{"id":"pxvbbzfh","transitionDuration":400,"transitionType":"fade","delayDuration":1000,"value":"Of easy wind and downy flake.\n"},{"id":"evxdcwvm","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"The woods are lovely, dark, and deep,"},{"id":"gvbdgkra","transitionDuration":400,"transitionType":"fade","delayDuration":600,"value":"But I have promises to keep,"},{"id":"dizsvcdc","transitionDuration":1000,"transitionType":"fade","delayDuration":600,"value":"And miles to go before I sleep,"},{"id":"tkqdsykf","transitionDuration":1000,"transitionType":"fade","delayDuration":600,"value":"And miles to go before I sleep.\n"}],
        "title":{"value":"Stopping By Woods On A Snowy Evening"},
    },
}

export function homePage(
    state = initialStates.homePage,
    action,
) {
    switch (action.type) {
        case EDITOR_PUBLISH: {
            // return state
            const { lines, title } = action.payload
            const newState = { ...state }
            newState.lines = lines
            newState.title = title
            return newState
        }
        default:
            return state
    }
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
        case EDITOR_PUBLISH: {
            const newState = { ...state }
            newState.publishCount += 1
            return newState
        }
        case EDITOR_TITLE_CHANGE: {
            const {
                newTitle
            } = action.payload
            const newState = { ...state }
            newState.title.value = newTitle
            return newState
        }
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
    homePage,
    editor,
    lines,
})
