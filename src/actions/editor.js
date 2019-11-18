import {
    EDITOR_ADD_LINE,
    EDITOR_REMOVE_LINE,
    EDITOR_LINE_CHANGE,
    EDITOR_PREVIEW,
    EDITOR_PUBLISH,
    LINE_CHANGE,
    LINE_TRANSITION_UPDATE,
    LINE_DELAY_UPDATE,
    LINE_PROP_UPDATE,
    POPOVER_TOGGLE,
    EDITOR_TITLE_CHANGE,
} from '../constants'

import {
    makeLine,
} from '../utils/lines'

import {
    store
} from '../index'


export function addLine() {
    const lineObj = makeLine()
    return {
        type: EDITOR_ADD_LINE,
        payload: {
            lineObj,
        }
    }
}

export function removeLine(id) {
    return {
        type: EDITOR_REMOVE_LINE,
        payload: {
            id
        }
    }
}

export function changeActiveLine(id) {
    return {
        type: EDITOR_LINE_CHANGE,
        payload: {
            id,
        },
    }
}

export function preview(on) {
    const {
        lines
    } = store.getState()
    return {
        type: EDITOR_PREVIEW,
        payload: {
            on,
            lines,
        }
    }
}

export function lineChange(id, value) {
    return {
        type: LINE_CHANGE,
        payload: {
            id,
            value,
        }
    }
}

export function changeTransition(id, transitionDuration) {
    return {
        type: LINE_TRANSITION_UPDATE,
        payload: {
            id,
            transitionDuration,
        }
    }
}

export function changeLineProp(id, propName, newValue) {
    return {
        type: LINE_PROP_UPDATE,
        payload: {
            id,
            propName,
            newValue,
        }
    }
}

export function changeDelay(id, delayDuration) {
    return {
        type: LINE_DELAY_UPDATE,
        payload: {
            id,
            delayDuration,
        }
    }
}

export function togglePopover(on) {
    return {
        type: POPOVER_TOGGLE,
        payload: {
            on,
        }
    }
}

export function editorPublish() {
    const {
        lines,
        editor
    } = store.getState()

    const newState = { ...editor }
    for (let i = 0; i < newState.lines.length; i += 1) {
        const { id } = newState.lines[i]
        const value = lines[id]
        newState.lines[i].value = value
        delete newState.lines[i].isFocused
    }

    console.log(JSON.stringify({ lines: newState.lines, title: newState.title }))

    return {
        type: EDITOR_PUBLISH,
        payload: {
            lines: newState.lines,
            title: newState.title,
        }
    }
}

export function editorTitleChange(newTitle) {
    return {
        type: EDITOR_TITLE_CHANGE,
        payload: {
            newTitle,
        }
    }
}
